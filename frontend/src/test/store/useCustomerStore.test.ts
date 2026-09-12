import { describe, it, expect, beforeEach } from 'vitest';
import { useCustomerStore } from '../../store/useCustomerStore';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../services/local/db';

describe('useCustomerStore', () => {
  beforeEach(() => {
    storage.setItem(STORAGE_KEYS.CUSTOMERS, []);
    useCustomerStore.setState({
      customers: [],
      selectedCustomerId: null,
      selectedCustomerIds: [],
      filters: {
        search: '',
        status: 'all',
        tier: 'all',
        industry: 'all',
        ownerId: 'all',
      },
    });
  });

  it('adds, updates, and deletes customer records', () => {
    const customer = useCustomerStore.getState().addCustomer({
      name: 'Robert Stark',
      email: 'robert@winterfell.io',
      phone: '4155551234',
      company: 'Winterfell Holdings',
      industry: 'Real Estate',
      status: 'active',
      tier: 'Enterprise',
      healthScore: 92,
      relationshipScore: 90,
      ownerId: 'user_1',
      ownerName: 'Sarah Jenkins',
      companySize: '51-200',
      lifetimeValue: 250000,
      openDealsCount: 1,
      totalDealsValue: 120000,
      pendingTasksCount: 0,
      tags: ['Key Account'],
      lastContactedAt: new Date().toISOString(),
    });

    expect(customer.id).toBeDefined();
    expect(useCustomerStore.getState().customers.length).toBe(1);

    useCustomerStore.getState().updateCustomer(customer.id, { healthScore: 98 });
    expect(useCustomerStore.getState().customers[0].healthScore).toBe(98);

    useCustomerStore.getState().deleteCustomer(customer.id);
    expect(useCustomerStore.getState().customers.length).toBe(0);
  });

  it('filters customers by industry and tier', () => {
    useCustomerStore.getState().setFilters({
      industry: 'Software & Technology',
      tier: 'Enterprise',
    });

    expect(useCustomerStore.getState().filters.industry).toBe('Software & Technology');
    expect(useCustomerStore.getState().filters.tier).toBe('Enterprise');
  });
});
