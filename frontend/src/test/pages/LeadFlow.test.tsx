import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LeadListPage } from '../../pages/leads/LeadListPage';
import { useLeadStore } from '../../store/useLeadStore';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../services/local/db';

describe('Lead Flow Integration', () => {
  beforeEach(() => {
    storage.setItem(STORAGE_KEYS.LEADS, [
      {
        id: 'lead_test_1',
        fullName: 'Alexander Wright',
        email: 'alex@wrightholdings.io',
        phone: '4155551900',
        company: 'Wright Holdings',
        jobTitle: 'VP of Tech',
        status: 'new',
        source: 'website',
        score: 88,
        estimatedValue: 60000,
        assignedTo: 'user_1',
        tags: ['Enterprise'],
        notes: 'Interested in enterprise license.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
    useLeadStore.getState().fetchLeads();
  });

  it('renders lead list with existing records and filters', () => {
    render(
      <BrowserRouter>
        <LeadListPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Alexander Wright')).toBeInTheDocument();
    expect(screen.getByText('Wright Holdings')).toBeInTheDocument();
    expect(screen.getByText(/leads management/i)).toBeInTheDocument();
  });
});
