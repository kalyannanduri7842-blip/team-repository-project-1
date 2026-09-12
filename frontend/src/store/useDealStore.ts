import { create } from 'zustand';
import { Deal, DealStage, DealPriority, SortOption } from '../types';
import { dealRepository, activityRepository } from '../services/local';
import { exportToCSV } from '../utils/csv';

export interface DealFilterOptions {
  search: string;
  stage: DealStage | 'all';
  priority: DealPriority | 'all';
  ownerId: string | 'all';
  minAmount: number;
}

interface DealState {
  deals: Deal[];
  selectedDealId: string | null;
  selectedDealIds: string[];
  filters: DealFilterOptions;
  sort: SortOption<keyof Deal>;
  page: number;
  pageSize: number;

  // Actions
  fetchDeals: () => void;
  getDealById: (id: string) => Deal | undefined;
  addDeal: (data: Omit<Deal, 'id' | 'createdAt' | 'updatedAt' | 'weightedValue'>) => Deal;
  updateDeal: (id: string, updates: Partial<Deal>) => Deal | null;
  updateDealStage: (id: string, stage: DealStage, probability?: number) => void;
  deleteDeal: (id: string) => boolean;
  bulkDeleteDeals: (ids: string[]) => void;
  setFilters: (filters: Partial<DealFilterOptions>) => void;
  resetFilters: () => void;
  setSort: (field: keyof Deal) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSelectedDealIds: (ids: string[]) => void;
  toggleSelectDeal: (id: string) => void;
  selectAllDeals: (selected: boolean) => void;
  exportDealsCSV: () => void;
  importDeals: (newDeals: Omit<Deal, 'id' | 'createdAt' | 'updatedAt' | 'weightedValue'>[]) => void;
}

const defaultFilters: DealFilterOptions = {
  search: '',
  stage: 'all',
  priority: 'all',
  ownerId: 'all',
  minAmount: 0,
};

export const useDealStore = create<DealState>((set, get) => ({
  deals: dealRepository.getAll(),
  selectedDealId: null,
  selectedDealIds: [],
  filters: defaultFilters,
  sort: { field: 'createdAt', direction: 'desc' },
  page: 1,
  pageSize: 10,

  fetchDeals: () => {
    set({ deals: dealRepository.getAll() });
  },

  getDealById: (id) => {
    return get().deals.find((d) => d.id === id);
  },

  addDeal: (data) => {
    const newDeal = dealRepository.create(data);

    activityRepository.logActivity({
      type: 'deal_created',
      title: `Created Deal: ${newDeal.title}`,
      description: `Amount: $${newDeal.amount.toLocaleString()} (${newDeal.stage.toUpperCase()}) for ${newDeal.customerName}`,
      entityType: 'deal',
      entityId: newDeal.id,
      entityName: newDeal.title,
      performedById: newDeal.ownerId,
      performedByName: newDeal.ownerName,
    });

    set((state) => ({ deals: [newDeal, ...state.deals] }));
    return newDeal;
  },

  updateDeal: (id, updates) => {
    const updated = dealRepository.update(id, updates);
    if (updated) {
      set((state) => ({
        deals: state.deals.map((d) => (d.id === id ? updated : d)),
      }));
    }
    return updated;
  },

  updateDealStage: (id, stage, probability) => {
    const deal = get().getDealById(id);
    if (!deal) return;

    const oldStage = deal.stage;
    const updated = dealRepository.updateStage(id, stage, probability);

    if (updated) {
      activityRepository.logActivity({
        type: 'deal_stage_changed',
        title: `Deal Stage Updated to ${stage.toUpperCase()}`,
        description: `Moved "${deal.title}" from ${oldStage.toUpperCase()} to ${stage.toUpperCase()} ($${deal.amount.toLocaleString()})`,
        entityType: 'deal',
        entityId: deal.id,
        entityName: deal.title,
        performedById: deal.ownerId,
        performedByName: deal.ownerName,
      });

      set((state) => ({
        deals: state.deals.map((d) => (d.id === id ? updated : d)),
      }));
    }
  },

  deleteDeal: (id) => {
    const success = dealRepository.delete(id);
    if (success) {
      set((state) => ({
        deals: state.deals.filter((d) => d.id !== id),
        selectedDealIds: state.selectedDealIds.filter((item) => item !== id),
      }));
    }
    return success;
  },

  bulkDeleteDeals: (ids) => {
    dealRepository.bulkDelete(ids);
    set((state) => ({
      deals: state.deals.filter((d) => !ids.includes(d.id)),
      selectedDealIds: [],
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

  setSelectedDealIds: (ids) => set({ selectedDealIds: ids }),

  toggleSelectDeal: (id) => {
    set((state) => {
      const exists = state.selectedDealIds.includes(id);
      return {
        selectedDealIds: exists
          ? state.selectedDealIds.filter((i) => i !== id)
          : [...state.selectedDealIds, id],
      };
    });
  },

  selectAllDeals: (selected) => {
    set((state) => ({
      selectedDealIds: selected ? state.deals.map((d) => d.id) : [],
    }));
  },

  exportDealsCSV: () => {
    const deals = get().deals;
    exportToCSV(deals, 'nexora_deals_export', [
      { key: 'title', header: 'Deal Title' },
      { key: 'customerName', header: 'Customer' },
      { key: 'amount', header: 'Amount' },
      { key: 'stage', header: 'Stage' },
      { key: 'probability', header: 'Probability (%)' },
      { key: 'weightedValue', header: 'Weighted Value' },
      { key: 'expectedCloseDate', header: 'Expected Close' },
      { key: 'priority', header: 'Priority' },
      { key: 'ownerName', header: 'Deal Owner' },
      { key: 'createdAt', header: 'Created Date' },
    ]);
  },

  importDeals: (newDeals) => {
    const inserted = dealRepository.bulkInsert(newDeals);
    set((state) => ({ deals: [...inserted, ...state.deals] }));
  },
}));
