import { describe, it, expect } from 'vitest';
import { calculateWinRate, groupDealsByStage } from '../../utils/pipelineAnalytics';
import { Deal } from '../../types';

describe('pipelineAnalytics utility', () => {
  const sampleDeals: Deal[] = [
    {
      id: 'd1',
      title: 'Deal 1',
      customerId: 'c1',
      customerName: 'Cust 1',
      customerCompany: 'Acme 1',
      amount: 100000,
      currency: 'USD',
      stage: 'won',
      probability: 100,
      weightedValue: 100000,
      expectedCloseDate: '2026-01-01',
      ownerId: 'u1',
      ownerName: 'Sarah Jenkins',
      products: [],
      priority: 'high',
      tags: [],
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    },
    {
      id: 'd2',
      title: 'Deal 2',
      customerId: 'c2',
      customerName: 'Cust 2',
      customerCompany: 'Acme 2',
      amount: 50000,
      currency: 'USD',
      stage: 'lost',
      probability: 0,
      weightedValue: 0,
      expectedCloseDate: '2026-01-01',
      ownerId: 'u1',
      ownerName: 'Sarah Jenkins',
      products: [],
      priority: 'low',
      tags: [],
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    },
    {
      id: 'd3',
      title: 'Deal 3',
      customerId: 'c3',
      customerName: 'Cust 3',
      customerCompany: 'Acme 3',
      amount: 80000,
      currency: 'USD',
      stage: 'proposal',
      probability: 60,
      weightedValue: 48000,
      expectedCloseDate: '2026-01-01',
      ownerId: 'u1',
      ownerName: 'Sarah Jenkins',
      products: [],
      priority: 'medium',
      tags: [],
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    },
  ];

  it('calculates win rate based on closed deals', () => {
    // 1 won out of 2 closed (won/lost) = 50.0%
    expect(calculateWinRate(sampleDeals)).toBe(50);
  });

  it('aggregates deal count, amount, and weighted revenue by stage', () => {
    const stageGroups = groupDealsByStage(sampleDeals);
    expect(stageGroups.won.count).toBe(1);
    expect(stageGroups.won.totalAmount).toBe(100000);
    expect(stageGroups.proposal.count).toBe(1);
    expect(stageGroups.proposal.weightedAmount).toBe(48000); // 80000 * 0.60
  });
});
