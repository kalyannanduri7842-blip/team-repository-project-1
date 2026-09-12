import { Deal } from '../../types';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from './db';
import { mockDeals } from '../../data/mock';

const STAGE_DEFAULT_PROBABILITIES: Record<Deal['stage'], number> = {
  new: 10,
  qualified: 30,
  proposal: 60,
  negotiation: 80,
  won: 100,
  lost: 0,
};

export const dealRepository = {
  getAll(): Deal[] {
    return storage.getItem<Deal[]>(STORAGE_KEYS.DEALS, mockDeals);
  },

  getById(id: string): Deal | null {
    const deals = this.getAll();
    return deals.find((d) => d.id === id) || null;
  },

  getByStage(stage: Deal['stage']): Deal[] {
    const deals = this.getAll();
    return deals.filter((d) => d.stage === stage);
  },

  create(dealData: Omit<Deal, 'id' | 'createdAt' | 'updatedAt' | 'weightedValue'> & { weightedValue?: number }): Deal {
    const deals = this.getAll();
    const probability = dealData.probability ?? STAGE_DEFAULT_PROBABILITIES[dealData.stage] ?? 10;
    const weightedValue = dealData.weightedValue ?? Math.round((dealData.amount * probability) / 100);
    const newDeal: Deal = {
      ...dealData,
      probability,
      weightedValue,
      id: `deal_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    deals.unshift(newDeal);
    storage.setItem(STORAGE_KEYS.DEALS, deals);
    return newDeal;
  },

  update(id: string, updates: Partial<Deal>): Deal | null {
    const deals = this.getAll();
    const index = deals.findIndex((d) => d.id === id);
    if (index === -1) return null;

    const current = deals[index];
    const amount = updates.amount !== undefined ? updates.amount : current.amount;
    const probability = updates.probability !== undefined ? updates.probability : current.probability;
    const weightedValue = updates.weightedValue !== undefined ? updates.weightedValue : Math.round((amount * probability) / 100);

    const updatedDeal: Deal = {
      ...current,
      ...updates,
      weightedValue,
      updatedAt: new Date().toISOString(),
    };

    deals[index] = updatedDeal;
    storage.setItem(STORAGE_KEYS.DEALS, deals);
    return updatedDeal;
  },

  updateStage(id: string, stage: Deal['stage'], customProbability?: number): Deal | null {
    const probability = customProbability !== undefined ? customProbability : STAGE_DEFAULT_PROBABILITIES[stage];
    return this.update(id, { stage, probability });
  },

  delete(id: string): boolean {
    const deals = this.getAll();
    const filtered = deals.filter((d) => d.id !== id);
    if (filtered.length === deals.length) return false;
    storage.setItem(STORAGE_KEYS.DEALS, filtered);
    return true;
  },

  bulkDelete(ids: string[]): number {
    const deals = this.getAll();
    const idSet = new Set(ids);
    const filtered = deals.filter((d) => !idSet.has(d.id));
    const count = deals.length - filtered.length;
    storage.setItem(STORAGE_KEYS.DEALS, filtered);
    return count;
  },

  bulkInsert(newDeals: (Omit<Deal, 'id' | 'createdAt' | 'updatedAt' | 'weightedValue'> & { weightedValue?: number })[]): Deal[] {
    const deals = this.getAll();
    const createdItems: Deal[] = newDeals.map((data, idx) => {
      const probability = data.probability ?? STAGE_DEFAULT_PROBABILITIES[data.stage] ?? 10;
      const weightedValue = data.weightedValue ?? Math.round((data.amount * probability) / 100);
      return {
        ...data,
        probability,
        weightedValue,
        id: `deal_${Date.now()}_${idx}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    });
    const combined = [...createdItems, ...deals];
    storage.setItem(STORAGE_KEYS.DEALS, combined);
    return createdItems;
  },

  getPipelineMetrics() {
    const deals = this.getAll();
    const totalPipelineValue = deals.reduce((acc, d) => acc + (d.stage !== 'lost' ? d.amount : 0), 0);
    const weightedPipelineValue = deals.reduce(
      (acc, d) => acc + (d.stage !== 'lost' ? (d.amount * d.probability) / 100 : 0),
      0
    );
    const wonDeals = deals.filter((d) => d.stage === 'won');
    const wonDealsCount = wonDeals.length;
    const wonRevenue = wonDeals.reduce((acc, d) => acc + d.amount, 0);
    const avgDealSize = deals.length > 0 ? Math.round(totalPipelineValue / deals.length) : 0;

    return {
      totalPipelineValue,
      weightedPipelineValue,
      wonDealsCount,
      wonRevenue,
      avgDealSize,
      totalDeals: deals.length,
    };
  },
};
