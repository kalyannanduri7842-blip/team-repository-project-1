import { describe, it, expect, beforeEach } from 'vitest';
import { useLeadStore } from '../../store/useLeadStore';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../services/local/db';

describe('useLeadStore', () => {
  beforeEach(() => {
    storage.setItem(STORAGE_KEYS.LEADS, []);
    useLeadStore.setState({
      leads: [],
      selectedLeadId: null,
      selectedLeadIds: [],
      filters: {
        search: '',
        status: 'all',
        source: 'all',
        ownerId: 'all',
        minScore: 0,
      },
    });
  });

  it('adds and fetches leads dynamically', () => {
    const lead = useLeadStore.getState().addLead({
      firstName: 'David',
      lastName: 'Hassel',
      fullName: 'David Hassel',
      email: 'david@baywatch.io',
      phone: '4155557788',
      company: 'Baywatch Tech',
      jobTitle: 'CTO',
      industry: 'Software & Technology',
      companySize: '51-200',
      status: 'new',
      source: 'website',
      score: 80,
      estimatedValue: 45000,
      ownerId: 'user_1',
      ownerName: 'Sarah Jenkins',
      tags: [],
    });

    expect(lead.id).toBeDefined();
    expect(useLeadStore.getState().leads.length).toBe(1);

    useLeadStore.getState().fetchLeads();
    expect(useLeadStore.getState().leads[0].fullName).toBe('David Hassel');
  });

  it('updates lead fields and selects lead by ID', () => {
    const lead = useLeadStore.getState().addLead({
      firstName: 'Jane',
      lastName: 'Miller',
      fullName: 'Jane Miller',
      email: 'jane@miller.io',
      phone: '4155553322',
      company: 'Miller Co',
      jobTitle: 'VP Sales',
      industry: 'Financial Services',
      companySize: '11-50',
      status: 'contacted',
      source: 'referral',
      score: 65,
      estimatedValue: 20000,
      ownerId: 'user_1',
      ownerName: 'Sarah Jenkins',
      tags: [],
    });

    useLeadStore.getState().updateLead(lead.id, { score: 90, status: 'qualified' });
    const updated = useLeadStore.getState().leads.find((l) => l.id === lead.id);
    expect(updated?.score).toBe(90);
    expect(updated?.status).toBe('qualified');

    const fetched = useLeadStore.getState().getLeadById(lead.id);
    expect(fetched?.id).toBe(lead.id);
  });

  it('filters leads by search query and status filter', () => {
    useLeadStore.getState().addLead({
      firstName: 'Alpha',
      lastName: 'User',
      fullName: 'Alpha User',
      email: 'alpha@user.com',
      phone: '4155551122',
      company: 'Acme Corp',
      jobTitle: 'Director',
      industry: 'Software & Technology',
      companySize: '51-200',
      status: 'qualified',
      source: 'website',
      score: 80,
      estimatedValue: 50000,
      ownerId: 'user_1',
      ownerName: 'Sarah Jenkins',
      tags: [],
    });

    useLeadStore.getState().setFilters({ search: 'Alpha', status: 'qualified' });
    expect(useLeadStore.getState().filters.search).toBe('Alpha');
    expect(useLeadStore.getState().filters.status).toBe('qualified');
  });
});
