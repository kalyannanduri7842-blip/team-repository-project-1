import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DealListPage } from '../../pages/deals/DealListPage';
import { useDealStore } from '../../store/useDealStore';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../services/local/db';

describe('Deal Flow Integration', () => {
  beforeEach(() => {
    storage.setItem(STORAGE_KEYS.DEALS, [
      {
        id: 'deal_test_1',
        title: 'Global Cloud Migration',
        customerId: 'cust_1',
        customerName: 'CloudMatrix Inc',
        amount: 150000,
        stage: 'proposal',
        probability: 60,
        expectedCloseDate: '2026-06-30',
        ownerId: 'user_1',
        products: [],
        priority: 'high',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
    useDealStore.getState().fetchDeals();
  });

  it('renders deal list with values and pipeline stages', () => {
    render(
      <BrowserRouter>
        <DealListPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Global Cloud Migration')).toBeInTheDocument();
    expect(screen.getByText('CloudMatrix Inc')).toBeInTheDocument();
    expect(screen.getByText('$150,000')).toBeInTheDocument();
  });
});
