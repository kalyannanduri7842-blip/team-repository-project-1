import { describe, it, expect, beforeEach } from 'vitest';
import { dealRepository } from '../../services/local/dealRepository';
import { STORAGE_KEYS } from '../../services/local/db';
import { storage } from '../../utils/storage';

describe('dealRepository', () => {
  beforeEach(() => {
    storage.setItem(STORAGE_KEYS.DEALS, []);
  });

  it('creates, updates stage, and deletes deals', () => {
    const newDeal: any = {
      title: 'Global Cloud Migration Package',
      customerId: 'cust_1',
      customerName: 'FintechScale Inc',
      customerCompany: 'FintechScale Inc',
      amount: 150000,
      stage: 'proposal',
      probability: 60,
      expectedCloseDate: '2026-06-30',
      ownerId: 'user_1',
      ownerName: 'Sarah Jenkins',
      currency: 'USD',
      weightedValue: 90000,
      tags: ['Cloud'],
      products: [
        { id: 'p1', name: 'Enterprise Cloud Platform', quantity: 1, unitPrice: 120000, totalPrice: 120000 },
        { id: 'p2', name: 'Dedicated Support SLA', quantity: 1, unitPrice: 30000, totalPrice: 30000 },
      ],
      notes: 'Final contract terms in legal review.',
      priority: 'high',
    };

    const created = dealRepository.create(newDeal);
    expect(created.id).toBeDefined();
    expect(created.amount).toBe(150000);
    expect(created.stage).toBe('proposal');

    // Update stage to won
    const updated = dealRepository.updateStage(created.id, 'won');
    expect(updated?.stage).toBe('won');
    expect(updated?.probability).toBe(100);

    const deleted = dealRepository.delete(created.id);
    expect(deleted).toBe(true);
    expect(dealRepository.getById(created.id)).toBeNull();
  });

  it('calculates weighted revenue accurately by stage', () => {
    dealRepository.create({
      title: 'Deal 1',
      customerId: 'c1',
      customerName: 'Cust 1',
      customerCompany: 'Cust 1',
      amount: 100000,
      stage: 'proposal',
      probability: 50,
      expectedCloseDate: '2026-12-31',
      ownerId: 'u1',
      ownerName: 'Sarah',
      currency: 'USD',
      weightedValue: 50000,
      tags: [],
      products: [],
      priority: 'medium',
    } as any);

    dealRepository.create({
      title: 'Deal 2',
      customerId: 'c2',
      customerName: 'Cust 2',
      customerCompany: 'Cust 2',
      amount: 200000,
      stage: 'won',
      probability: 100,
      expectedCloseDate: '2026-12-31',
      ownerId: 'u1',
      ownerName: 'Sarah',
      currency: 'USD',
      weightedValue: 200000,
      tags: [],
      products: [],
      priority: 'urgent',
    } as any);

    const metrics = dealRepository.getPipelineMetrics();
    expect(metrics.totalPipelineValue).toBe(300000);
    expect(metrics.weightedPipelineValue).toBe(250000);
    expect(metrics.wonDealsCount).toBe(1);
  });
});
