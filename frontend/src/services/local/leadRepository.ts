import { Lead } from '../../types';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from './db';
import { mockLeads } from '../../data/mock';

export const leadRepository = {
  getAll(): Lead[] {
    return storage.getItem<Lead[]>(STORAGE_KEYS.LEADS, mockLeads);
  },

  getById(id: string): Lead | null {
    const leads = this.getAll();
    return leads.find((l) => l.id === id) || null;
  },

  getByStatus(status: Lead['status']): Lead[] {
    const leads = this.getAll();
    return leads.filter((l) => l.status === status);
  },

  search(query: string): Lead[] {
    const leads = this.getAll();
    const q = query.toLowerCase().trim();
    if (!q) return leads;
    return leads.filter(
      (l) =>
        l.fullName.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q)
    );
  },

  create(leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Lead {
    const leads = this.getAll();
    const newLead: Lead = {
      ...leadData,
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    leads.unshift(newLead);
    storage.setItem(STORAGE_KEYS.LEADS, leads);
    return newLead;
  },

  update(id: string, updates: Partial<Lead>): Lead | null {
    const leads = this.getAll();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) return null;

    const updatedLead: Lead = {
      ...leads[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    leads[index] = updatedLead;
    storage.setItem(STORAGE_KEYS.LEADS, leads);
    return updatedLead;
  },

  delete(id: string): boolean {
    const leads = this.getAll();
    const filtered = leads.filter((l) => l.id !== id);
    if (filtered.length === leads.length) return false;
    storage.setItem(STORAGE_KEYS.LEADS, filtered);
    return true;
  },

  bulkDelete(ids: string[]): number {
    const leads = this.getAll();
    const idSet = new Set(ids);
    const filtered = leads.filter((l) => !idSet.has(l.id));
    const deletedCount = leads.length - filtered.length;
    storage.setItem(STORAGE_KEYS.LEADS, filtered);
    return deletedCount;
  },

  bulkUpdateStatus(ids: string[], status: Lead['status']): number {
    const leads = this.getAll();
    const idSet = new Set(ids);
    let count = 0;
    const updated = leads.map((l) => {
      if (idSet.has(l.id)) {
        count++;
        return { ...l, status, updatedAt: new Date().toISOString() };
      }
      return l;
    });
    storage.setItem(STORAGE_KEYS.LEADS, updated);
    return count;
  },

  bulkInsert(newLeads: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>[]): Lead[] {
    const leads = this.getAll();
    const createdItems: Lead[] = newLeads.map((data, idx) => ({
      ...data,
      id: `lead_${Date.now()}_${idx}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    const combined = [...createdItems, ...leads];
    storage.setItem(STORAGE_KEYS.LEADS, combined);
    return createdItems;
  },
};
