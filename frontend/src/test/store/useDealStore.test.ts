import { describe, it, expect, beforeEach } from 'vitest';
import { useDealStore } from '../../store/useDealStore';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../services/local/db';

describe('useDealStore', () => {
  beforeEach(() => {
    storage.setItem(STORAGE_KEYS.DEALS, []);
    useDealStore.setState({
      deals: [],
      selectedDealId: null,
      selectedDealIds: [],
      filters: {
        search: '',
        stage: 'all',
        priority: 'all',
        ownerId: 'all',
        minAmount: 0,
      },
    });
  });

  it('creates deals, updates pipeline stage, and deletes deals', () => {
    const deal = useDealStore.getState().addDeal({
      title: 'Enterprise Security Suite',
      customerId: 'cust_1',
      customerName: 'Fintech Corp',
      customerCompany: 'Fintech Corp',
      amount: 100000,
      currency: 'USD',
      stage: 'proposal',
      probability: 60,
      expectedCloseDate: '2026-06-01',
      ownerId: 'user_1',
      ownerName: 'Sarah Jenkins',
      products: [],
      priority: 'high',
      tags: ['Security'],
    });

    expect(deal.id).toBeDefined();
    expect(useDealStore.getState().deals.length).toBe(1);

    useDealStore.getState().updateDealStage(deal.id, 'won');
    const updated = useDealStore.getState().deals.find((d) => d.id === deal.id);
    expect(updated?.stage).toBe('won');
    expect(updated?.probability).toBe(100);

    useDealStore.getState().deleteDeal(deal.id);
    expect(useDealStore.getState().deals.length).toBe(0);
  });
});
