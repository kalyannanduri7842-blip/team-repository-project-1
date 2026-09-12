import { describe, it, expect, beforeEach } from 'vitest';
import { leadRepository } from '../../services/local/leadRepository';
import { STORAGE_KEYS } from '../../services/local/db';
import { storage } from '../../utils/storage';

describe('leadRepository', () => {
  beforeEach(() => {
    storage.setItem(STORAGE_KEYS.LEADS, []);
  });

  it('performs full CRUD lifecycle on leads', () => {
    const newLead: any = {
      fullName: 'Austin Rivers',
      email: 'austin@fintechscale.io',
      phone: '4155550199',
      company: 'FintechScale Inc',
      jobTitle: 'Director of Growth',
      status: 'new',
      source: 'linkedin',
      score: 85,
      estimatedValue: 75000,
      assignedTo: 'user_1',
      tags: ['Enterprise', 'Fintech'],
      notes: 'Interested in annual multi-seat license.',
    };

    const created = leadRepository.create(newLead);
    expect(created.id).toBeDefined();
    expect(created.fullName).toBe('Austin Rivers');
    expect(created.score).toBe(85);

    const fetched = leadRepository.getById(created.id);
    expect(fetched).toEqual(created);

    const all = leadRepository.getAll();
    expect(all.some((l) => l.id === created.id)).toBe(true);

    const updated = leadRepository.update(created.id, {
      status: 'qualified',
      score: 92,
      estimatedValue: 90000,
    } as any);
    expect(updated).not.toBeNull();
    expect(updated?.status).toBe('qualified');
    expect(updated?.score).toBe(92);
    expect(updated?.estimatedValue).toBe(90000);

    const deleted = leadRepository.delete(created.id);
    expect(deleted).toBe(true);
    expect(leadRepository.getById(created.id)).toBeNull();
  });

  it('filters leads by status, search term, and score range', () => {
    leadRepository.create({
      fullName: 'Alice Walker',
      email: 'alice@alpha.io',
      company: 'Alpha Corp',
      status: 'qualified',
      source: 'website',
      score: 95,
      estimatedValue: 50000,
      assignedTo: 'user_1',
      tags: ['VIP'],
    } as any);

    leadRepository.create({
      fullName: 'Bob Smith',
      email: 'bob@beta.io',
      company: 'Beta LLC',
      status: 'unqualified',
      source: 'referral',
      score: 30,
      estimatedValue: 10000,
      assignedTo: 'user_2',
      tags: ['SMB'],
    } as any);

    const qualifiedLeads = leadRepository.getByStatus('qualified');
    expect(qualifiedLeads.length).toBe(1);
    expect(qualifiedLeads[0].fullName).toBe('Alice Walker');

    const searchResults = leadRepository.search('Alpha');
    expect(searchResults.length).toBe(1);
    expect(searchResults[0].company).toBe('Alpha Corp');
  });
});
