import { create } from 'zustand';
import { Customer, CustomerStatus, CustomerTier, IndustryType, SortOption } from '../types';
import { customerRepository, activityRepository } from '../services/local';
import { exportToCSV } from '../utils/csv';

export interface CustomerFilterOptions {
  search: string;
  status: CustomerStatus | 'all';
  tier: CustomerTier | 'all';
  industry: IndustryType | 'all';
  ownerId: string | 'all';
}

interface CustomerState {
  customers: Customer[];
  selectedCustomerId: string | null;
  selectedCustomerIds: string[];
  filters: CustomerFilterOptions;
  sort: SortOption<keyof Customer>;
  page: number;
  pageSize: number;

  // Actions
  fetchCustomers: () => void;
  getCustomerById: (id: string) => Customer | undefined;
  addCustomer: (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => Customer;
  updateCustomer: (id: string, updates: Partial<Customer>) => Customer | null;
  deleteCustomer: (id: string) => boolean;
  bulkDeleteCustomers: (ids: string[]) => void;
  setFilters: (filters: Partial<CustomerFilterOptions>) => void;
  resetFilters: () => void;
  setSort: (field: keyof Customer) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSelectedCustomerIds: (ids: string[]) => void;
  toggleSelectCustomer: (id: string) => void;
  selectAllCustomers: (selected: boolean) => void;
  exportCustomersCSV: () => void;
  importCustomers: (newCustomers: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>[]) => void;
}

const defaultFilters: CustomerFilterOptions = {
  search: '',
  status: 'all',
  tier: 'all',
  industry: 'all',
  ownerId: 'all',
};

export const useCustomerStore = create<CustomerState>((set, get) => ({
  customers: customerRepository.getAll(),
  selectedCustomerId: null,
  selectedCustomerIds: [],
  filters: defaultFilters,
  sort: { field: 'createdAt', direction: 'desc' },
  page: 1,
  pageSize: 10,

  fetchCustomers: () => {
    set({ customers: customerRepository.getAll() });
  },

  getCustomerById: (id) => {
    return get().customers.find((c) => c.id === id);
  },

  addCustomer: (data) => {
    const newCustomer = customerRepository.create(data);

    activityRepository.logActivity({
      type: 'customer_created',
      title: `Created Customer: ${newCustomer.name}`,
      description: `${newCustomer.tier} Account (${newCustomer.industry}). Lifetime Value: $${(newCustomer.lifetimeValue || 0).toLocaleString()}`,
      entityType: 'customer',
      entityId: newCustomer.id,
      entityName: newCustomer.name,
      performedById: newCustomer.ownerId,
      performedByName: newCustomer.ownerName || 'Admin User',
    });

    set((state) => ({ customers: [newCustomer, ...state.customers] }));
    return newCustomer;
  },

  updateCustomer: (id, updates) => {
    const updated = customerRepository.update(id, updates);
    if (updated) {
      set((state) => ({
        customers: state.customers.map((c) => (c.id === id ? updated : c)),
      }));
    }
    return updated;
  },

  deleteCustomer: (id) => {
    const success = customerRepository.delete(id);
    if (success) {
      set((state) => ({
        customers: state.customers.filter((c) => c.id !== id),
        selectedCustomerIds: state.selectedCustomerIds.filter((item) => item !== id),
      }));
    }
    return success;
  },

  bulkDeleteCustomers: (ids) => {
    customerRepository.bulkDelete(ids);
    set((state) => ({
      customers: state.customers.filter((c) => !ids.includes(c.id)),
      selectedCustomerIds: [],
    }));
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

  setSelectedCustomerIds: (ids) => set({ selectedCustomerIds: ids }),

  toggleSelectCustomer: (id) => {
    set((state) => {
      const exists = state.selectedCustomerIds.includes(id);
      return {
        selectedCustomerIds: exists
          ? state.selectedCustomerIds.filter((i) => i !== id)
          : [...state.selectedCustomerIds, id],
      };
    });
  },

  selectAllCustomers: (selected) => {
    set((state) => ({
      selectedCustomerIds: selected ? state.customers.map((c) => c.id) : [],
    }));
  },

  exportCustomersCSV: () => {
    const customers = get().customers;
    exportToCSV(customers, 'nexora_customers_export', [
      { key: 'name', header: 'Account Name' },
      { key: 'company', header: 'Company' },
      { key: 'email', header: 'Email' },
      { key: 'phone', header: 'Phone' },
      { key: 'industry', header: 'Industry' },
      { key: 'tier', header: 'Tier' },
      { key: 'status', header: 'Status' },
      { key: 'healthScore', header: 'Health Score' },
      { key: 'lifetimeValue', header: 'Lifetime Value' },
      { key: 'ownerName', header: 'Account Owner' },
      { key: 'createdAt', header: 'Customer Since' },
    ]);
  },

  importCustomers: (newCustomers) => {
    const inserted = customerRepository.bulkInsert(newCustomers);
    set((state) => ({ customers: [...inserted, ...state.customers] }));
  },
}));
