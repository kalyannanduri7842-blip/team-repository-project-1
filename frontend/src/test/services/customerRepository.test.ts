import { describe, it, expect, beforeEach } from 'vitest';
import { customerRepository } from '../../services/local/customerRepository';
import { STORAGE_KEYS } from '../../services/local/db';
import { storage } from '../../utils/storage';
import { Customer } from '../../types';

describe('customerRepository', () => {
  beforeEach(() => {
    storage.setItem(STORAGE_KEYS.CUSTOMERS, []);
  });

  it('performs full CRUD lifecycle on customers', () => {
    const newCustomer: any = {
      name: 'Elena Rostova',
      email: 'elena@cloudmatrix.com',
      phone: '4155558912',
      company: 'CloudMatrix Technologies',
      industry: 'Technology',
      status: 'active',
      tier: 'Enterprise',
      totalSpent: 185000,
      arr: 120000,
      healthScore: 94,
      accountOwnerId: 'user_1',
      primaryContact: {
        name: 'Elena Rostova',
        title: 'Chief Technology Officer',
        email: 'elena@cloudmatrix.com',
        phone: '4155558912',
      },
      contractStart: '2025-01-01',
      contractEnd: '2027-01-01',
      tags: ['SLA-99.99', 'Key Account'],
    };

    const created = customerRepository.create(newCustomer);
    expect(created.id).toBeDefined();
    expect(created.name).toBe('Elena Rostova');
    expect(created.healthScore).toBe(94);

    const fetched = customerRepository.getById(created.id);
    expect(fetched).toEqual(created);

    const updated = customerRepository.update(created.id, {
      healthScore: 98,
    } as any);
    expect(updated?.healthScore).toBe(98);

    const deleted = customerRepository.delete(created.id);
    expect(deleted).toBe(true);
    expect(customerRepository.getById(created.id)).toBeNull();
  });

  it('filters customers by tier and search query', () => {
    customerRepository.create({
      name: 'Alpha Customer',
      email: 'alpha@test.com',
      company: 'Alpha Inc',
      industry: 'Finance',
      status: 'active',
      tier: 'Enterprise',
      arr: 50000,
      healthScore: 90,
      accountOwnerId: 'user_1',
      primaryContact: { name: 'Alpha', title: 'VP', email: 'a@a.com', phone: '123' },
      contractStart: '2025-01-01',
      contractEnd: '2026-01-01',
      tags: [],
    } as any);

    const searchResults = customerRepository.search('Alpha');
    expect(searchResults.length).toBe(1);
    expect(searchResults[0].company).toBe('Alpha Inc');
  });
});
