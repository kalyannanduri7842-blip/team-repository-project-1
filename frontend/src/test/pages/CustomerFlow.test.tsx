import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CustomerListPage } from '../../pages/customers/CustomerListPage';
import { useCustomerStore } from '../../store/useCustomerStore';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../services/local/db';

describe('Customer Flow Integration', () => {
  beforeEach(() => {
    storage.setItem(STORAGE_KEYS.CUSTOMERS, [
      {
        id: 'cust_test_1',
        name: 'Elena Rostova',
        email: 'elena@cloudmatrix.com',
        phone: '4155558912',
        company: 'CloudMatrix Inc',
        industry: 'cloud_services',
        status: 'active',
        tier: 'enterprise',
        totalSpent: 185000,
        arr: 120000,
        healthScore: 94,
        accountOwnerId: 'user_1',
        primaryContact: {
          name: 'Elena Rostova',
          title: 'CTO',
          email: 'elena@cloudmatrix.com',
          phone: '4155558912',
        },
        contractStart: '2025-01-01',
        contractEnd: '2027-01-01',
        tags: ['Key Account'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
    useCustomerStore.getState().fetchCustomers();
  });

  it('renders customer directory with health telemetry scores', () => {
    render(
      <BrowserRouter>
        <CustomerListPage />
      </BrowserRouter>
    );

    expect(screen.getByText('CloudMatrix Inc')).toBeInTheDocument();
    expect(screen.getByText('Elena Rostova')).toBeInTheDocument();
    expect(screen.getByText('94%')).toBeInTheDocument();
  });
});
