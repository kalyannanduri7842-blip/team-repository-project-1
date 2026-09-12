import { describe, it, expect, vi, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { setupTestState } from './mockData';
import crypto from 'crypto';

const mockLeads: any[] = [];
const mockCustomers: any[] = [];
const mockDeals: any[] = [];
const mockActivities: any[] = [];

vi.mock('../src/database/client', () => {
  return {
    default: {
      user: {
        findUnique: vi.fn(async ({ where }) => {
          if (where.id === '11111111-1111-4111-8111-111111111111') {
            return {
              id: '11111111-1111-4111-8111-111111111111',
              email: 'admin.test@crm.com',
              firstName: 'Admin',
              lastName: 'Tester',
              role: 'ADMIN',
              status: 'ACTIVE',
            };
          }
          return null;
        }),
      },
      tokenBlacklist: {
        findUnique: vi.fn(async () => null),
      },
      lead: {
        findFirst: vi.fn(async ({ where }) => {
          if (where.id) return mockLeads.find((l) => l.id === where.id && !l.deletedAt) || null;
          if (where.email) return mockLeads.find((l) => l.email === where.email && !l.deletedAt) || null;
          return null;
        }),
        create: vi.fn(async ({ data }) => {
          const newLead = { id: crypto.randomUUID(), ...data, createdAt: new Date(), updatedAt: new Date(), deletedAt: null };
          mockLeads.push(newLead);
          return newLead;
        }),
        update: vi.fn(async ({ where, data }) => {
          const lead = mockLeads.find((l) => l.id === where.id);
          if (lead) Object.assign(lead, data);
          return lead;
        }),
        findMany: vi.fn(async () => mockLeads.filter((l) => !l.deletedAt)),
        count: vi.fn(async () => mockLeads.filter((l) => !l.deletedAt).length),
      },
      customer: {
        create: vi.fn(async ({ data }) => {
          const customer = { id: crypto.randomUUID(), ...data, createdAt: new Date(), updatedAt: new Date(), deletedAt: null };
          mockCustomers.push(customer);
          return customer;
        }),
      },
      deal: {
        create: vi.fn(async ({ data }) => {
          const deal = { id: crypto.randomUUID(), ...data, createdAt: new Date(), updatedAt: new Date(), deletedAt: null };
          mockDeals.push(deal);
          return deal;
        }),
      },
      activity: {
        create: vi.fn(async ({ data }) => {
          const activity = { id: crypto.randomUUID(), ...data, createdAt: new Date() };
          mockActivities.push(activity);
          return activity;
        }),
      },
      $transaction: vi.fn(async (callback) => {
        return callback({
          customer: {
            create: async ({ data }: any) => {
              const customer = { id: crypto.randomUUID(), ...data, createdAt: new Date(), updatedAt: new Date() };
              mockCustomers.push(customer);
              return customer;
            },
          },
          lead: {
            update: async ({ where, data }: any) => {
              const lead = mockLeads.find((l) => l.id === where.id);
              if (lead) Object.assign(lead, data);
              return lead;
            },
          },
          deal: {
            create: async ({ data }: any) => {
              const deal = { id: crypto.randomUUID(), ...data, createdAt: new Date(), updatedAt: new Date() };
              mockDeals.push(deal);
              return deal;
            },
          },
          activity: {
            create: async ({ data }: any) => {
              const activity = { id: crypto.randomUUID(), ...data, createdAt: new Date() };
              mockActivities.push(activity);
              return activity;
            },
          },
        });
      }),
    },
  };
});

describe('Lead & Lead Conversion API Endpoints (/api/leads)', () => {
  let adminToken: string;

  beforeAll(async () => {
    const state = await setupTestState();
    adminToken = state.adminToken;
  });

  it('POST /api/leads - should create a new lead successfully', async () => {
    const res = await request(app)
      .post('/api/leads')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@enterprise.com',
        company: 'Enterprise Solutions',
        source: 'WEBSITE',
        status: 'QUALIFIED',
        value: 50000,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.email).toBe('john.doe@enterprise.com');
  });

  it('GET /api/leads - should list leads with pagination metadata', async () => {
    const res = await request(app)
      .get('/api/leads')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.meta).toBeDefined();
  });

  it('POST /api/leads/:id/convert - should transactionally convert lead to customer & deal', async () => {
    const createRes = await request(app)
      .post('/api/leads')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        firstName: 'Convertible',
        lastName: 'Lead',
        email: 'convertible@enterprise.com',
        company: 'Convertible Inc',
        status: 'QUALIFIED',
        value: 75000,
      });

    const leadId = createRes.body.data.id;

    const convertRes = await request(app)
      .post(`/api/leads/${leadId}/convert`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        customerName: 'Convertible Enterprise Inc',
        createDeal: true,
        dealTitle: 'Enterprise Software SOW',
        dealAmount: 75000,
        dealStage: 'QUALIFICATION',
      });

    expect(convertRes.status).toBe(200);
    expect(convertRes.body.success).toBe(true);
    expect(convertRes.body.data.customer).toBeDefined();
    expect(convertRes.body.data.customer.name).toBe('Convertible Enterprise Inc');
    expect(convertRes.body.data.lead.status).toBe('CONVERTED');
    expect(convertRes.body.data.deal).toBeDefined();
    expect(convertRes.body.data.deal.amount).toBe(75000);
  });
});
