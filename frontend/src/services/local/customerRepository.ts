import { Customer } from '../../types';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from './db';
import { mockCustomers } from '../../data/mock';

export const customerRepository = {
  getAll(): Customer[] {
    return storage.getItem<Customer[]>(STORAGE_KEYS.CUSTOMERS, mockCustomers);
  },

  getById(id: string): Customer | null {
    const customers = this.getAll();
    return customers.find((c) => c.id === id) || null;
  },

  getByTier(tier: Customer['tier']): Customer[] {
    const customers = this.getAll();
    return customers.filter((c) => c.tier === tier);
  },

  search(query: string): Customer[] {
    const customers = this.getAll();
    const q = query.toLowerCase().trim();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q)
    );
  },

  create(customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Customer {
    const customers = this.getAll();
    const newCustomer: Customer = {
      ...customerData,
      id: `cust_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    customers.unshift(newCustomer);
    storage.setItem(STORAGE_KEYS.CUSTOMERS, customers);
    return newCustomer;
  },

  update(id: string, updates: Partial<Customer>): Customer | null {
    const customers = this.getAll();
    const index = customers.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const updatedCustomer: Customer = {
      ...customers[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    customers[index] = updatedCustomer;
    storage.setItem(STORAGE_KEYS.CUSTOMERS, customers);
    return updatedCustomer;
  },

  delete(id: string): boolean {
    const customers = this.getAll();
    const filtered = customers.filter((c) => c.id !== id);
    if (filtered.length === customers.length) return false;
    storage.setItem(STORAGE_KEYS.CUSTOMERS, filtered);
    return true;
  },

  bulkDelete(ids: string[]): number {
    const customers = this.getAll();
    const idSet = new Set(ids);
    const filtered = customers.filter((c) => !idSet.has(c.id));
    const count = customers.length - filtered.length;
    storage.setItem(STORAGE_KEYS.CUSTOMERS, filtered);
    return count;
  },

  bulkInsert(newCustomers: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>[]): Customer[] {
    const customers = this.getAll();
    const createdItems: Customer[] = newCustomers.map((data, idx) => ({
      ...data,
      id: `cust_${Date.now()}_${idx}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    const combined = [...createdItems, ...customers];
    storage.setItem(STORAGE_KEYS.CUSTOMERS, combined);
    return createdItems;
  },
};
