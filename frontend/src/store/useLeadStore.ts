import { create } from 'zustand';
import { Lead, LeadStatus, LeadSource, LeadConversionPayload, SortOption } from '../types';
import { leadRepository, customerRepository, dealRepository, activityRepository } from '../services/local';
import { exportToCSV } from '../utils/csv';

export interface LeadFilterOptions {
  search: string;
  status: LeadStatus | 'all';
  source: LeadSource | 'all';
  ownerId: string | 'all';
  minScore: number;
}

interface LeadState {
  leads: Lead[];
  selectedLeadId: string | null;
  selectedLeadIds: string[];
  filters: LeadFilterOptions;
  sort: SortOption<keyof Lead>;
  page: number;
  pageSize: number;

  // Actions
  fetchLeads: () => void;
  getLeadById: (id: string) => Lead | undefined;
  addLead: (data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => Lead;
  updateLead: (id: string, updates: Partial<Lead>) => Lead | null;
  deleteLead: (id: string) => boolean;
  bulkDeleteLeads: (ids: string[]) => void;
  bulkUpdateStatus: (ids: string[], status: LeadStatus) => void;
  convertLead: (payload: LeadConversionPayload) => { customerId: string; dealId: string };
  setFilters: (filters: Partial<LeadFilterOptions>) => void;
  resetFilters: () => void;
  setSort: (field: keyof Lead) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSelectedLeadIds: (ids: string[]) => void;
  toggleSelectLead: (id: string) => void;
  selectAllLeads: (selected: boolean) => void;
  exportLeadsCSV: () => void;
  importLeads: (newLeads: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>[]) => void;
}

const defaultFilters: LeadFilterOptions = {
  search: '',
  status: 'all',
  source: 'all',
  ownerId: 'all',
  minScore: 0,
};

export const useLeadStore = create<LeadState>((set, get) => ({
  leads: leadRepository.getAll(),
  selectedLeadId: null,
  selectedLeadIds: [],
  filters: defaultFilters,
  sort: { field: 'createdAt', direction: 'desc' },
  page: 1,
  pageSize: 10,

  fetchLeads: () => {
    set({ leads: leadRepository.getAll() });
  },

  getLeadById: (id: string) => {
    return get().leads.find((l) => l.id === id);
  },

  addLead: (data) => {
    const newLead = leadRepository.create(data);
    
    // Log activity
    activityRepository.logActivity({
      type: 'lead_created',
      title: `Created New Lead: ${newLead.fullName}`,
      description: `${newLead.jobTitle} at ${newLead.company}. Estimated value: $${newLead.estimatedValue.toLocaleString()}`,
      entityType: 'lead',
      entityId: newLead.id,
      entityName: newLead.fullName,
      performedById: newLead.ownerId,
      performedByName: newLead.ownerName,
    });

    set((state) => ({ leads: [newLead, ...state.leads] }));
    return newLead;
  },

  updateLead: (id, updates) => {
    const updated = leadRepository.update(id, updates);
    if (updated) {
      set((state) => ({
        leads: state.leads.map((l) => (l.id === id ? updated : l)),
      }));
    }
    return updated;
  },

  deleteLead: (id) => {
    const success = leadRepository.delete(id);
    if (success) {
      set((state) => ({
        leads: state.leads.filter((l) => l.id !== id),
        selectedLeadIds: state.selectedLeadIds.filter((item) => item !== id),
      }));
    }
    return success;
  },

  bulkDeleteLeads: (ids) => {
    leadRepository.bulkDelete(ids);
    set((state) => ({
      leads: state.leads.filter((l) => !ids.includes(l.id)),
      selectedLeadIds: [],
    }));
  },

  bulkUpdateStatus: (ids, status) => {
    leadRepository.bulkUpdateStatus(ids, status);
    set((state) => ({
      leads: state.leads.map((l) => (ids.includes(l.id) ? { ...l, status, updatedAt: new Date().toISOString() } : l)),
      selectedLeadIds: [],
    }));
  },

  convertLead: (payload) => {
    const lead = get().getLeadById(payload.leadId);
    if (!lead) throw new Error('Lead not found for conversion');

    // 1. Create Customer
    const newCustomer = customerRepository.create({
      name: payload.customerName || lead.company,
      company: payload.company || lead.company,
      email: payload.email || lead.email,
      phone: payload.phone || lead.phone,
      industry: payload.industry || lead.industry,
      tier: payload.dealAmount > 100000 ? 'Enterprise' : 'Growth',
      status: 'active',
      healthScore: 85,
      relationshipScore: 80,
      ownerId: lead.ownerId,
      ownerName: lead.ownerName,
      companySize: lead.companySize,
      lifetimeValue: payload.dealAmount,
      openDealsCount: 1,
      totalDealsValue: payload.dealAmount,
      pendingTasksCount: 1,
      tags: ['Converted Lead', ...lead.tags],
      convertedFromLeadId: lead.id,
      lastContactedAt: new Date().toISOString(),
    });

    // 2. Create Deal
    const newDeal = dealRepository.create({
      title: payload.dealName,
      customerId: newCustomer.id,
      customerName: newCustomer.name,
      customerCompany: newCustomer.company,
      amount: payload.dealAmount,
      currency: 'USD',
      stage: (payload.dealStage as any) || 'qualified',
      probability: payload.dealProbability || 35,
      expectedCloseDate: payload.expectedCloseDate,
      ownerId: lead.ownerId,
      ownerName: lead.ownerName,
      priority: payload.dealAmount > 150000 ? 'urgent' : 'high',
      leadSource: lead.source,
      leadId: lead.id,
      products: [
        {
          id: `p_${Date.now()}`,
          name: `${payload.dealName} Core License`,
          quantity: 1,
          unitPrice: payload.dealAmount,
          totalPrice: payload.dealAmount,
        },
      ],
      notes: payload.notes || lead.notesSummary,
      tags: ['Converted From Lead'],
    });

    // 3. Mark Lead as Converted
    leadRepository.update(lead.id, {
      status: 'converted',
      convertedCustomerId: newCustomer.id,
      convertedDealId: newDeal.id,
      convertedAt: new Date().toISOString(),
    });

    // 4. Log conversion activity
    activityRepository.logActivity({
      type: 'lead_converted',
      title: `Converted Lead into Customer & Deal`,
      description: `Converted ${lead.fullName} (${lead.company}) into Customer "${newCustomer.name}" and Deal "${newDeal.title}" ($${newDeal.amount.toLocaleString()})`,
      entityType: 'lead',
      entityId: lead.id,
      entityName: lead.fullName,
      performedById: lead.ownerId,
      performedByName: lead.ownerName,
    });

    // Refresh state
    set((state) => ({
      leads: leadRepository.getAll(),
    }));

    return { customerId: newCustomer.id, dealId: newDeal.id };
  },

  setFilters: (newFilters) => {
    set((state) => ({ filters: { ...state.filters, ...newFilters }, page: 1 }));
  },

  resetFilters: () => {
    set({ filters: defaultFilters, page: 1 });
  },

  setSort: (field) => {
    set((state) => {
      const isCurrent = state.sort.field === field;
      const direction = isCurrent && state.sort.direction === 'asc' ? 'desc' : 'asc';
      return { sort: { field, direction } };
    });
  },

  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),

  setSelectedLeadIds: (ids) => set({ selectedLeadIds: ids }),

  toggleSelectLead: (id) => {
    set((state) => {
      const exists = state.selectedLeadIds.includes(id);
      return {
        selectedLeadIds: exists
          ? state.selectedLeadIds.filter((i) => i !== id)
          : [...state.selectedLeadIds, id],
      };
    });
  },

  selectAllLeads: (selected) => {
    set((state) => ({
      selectedLeadIds: selected ? state.leads.map((l) => l.id) : [],
    }));
  },

  exportLeadsCSV: () => {
    const leads = get().leads;
    exportToCSV(leads, 'nexora_leads_export', [
      { key: 'fullName', header: 'Full Name' },
      { key: 'email', header: 'Email' },
      { key: 'phone', header: 'Phone' },
      { key: 'company', header: 'Company' },
      { key: 'jobTitle', header: 'Job Title' },
      { key: 'source', header: 'Lead Source' },
      { key: 'status', header: 'Status' },
      { key: 'score', header: 'Score' },
      { key: 'ownerName', header: 'Owner' },
      { key: 'industry', header: 'Industry' },
      { key: 'estimatedValue', header: 'Estimated Value' },
      { key: 'createdAt', header: 'Created Date' },
    ]);
  },

  importLeads: (newLeads) => {
    const inserted = leadRepository.bulkInsert(newLeads);
    set((state) => ({ leads: [...inserted, ...state.leads] }));
  },
}));
