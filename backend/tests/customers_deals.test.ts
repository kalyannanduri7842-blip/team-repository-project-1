import { describe, it, expect, vi, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { setupTestState } from './mockData';
import crypto from 'crypto';

const mockCustomers: any[] = [];
const mockDeals: any[] = [];

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
      customer: {
        findFirst: vi.fn(async ({ where }) => mockCustomers.find((c) => c.id === where.id && !c.deletedAt) || null),
        create: vi.fn(async ({ data }) => {
          const newCustomer = { id: crypto.randomUUID(), ...data, createdAt: new Date(), updatedAt: new Date(), deletedAt: null };
          mockCustomers.push(newCustomer);
          return newCustomer;
        }),
        update: vi.fn(async ({ where, data }) => {
          const cust = mockCustomers.find((c) => c.id === where.id);
          if (cust) Object.assign(cust, data);
          return cust;
        }),
        findMany: vi.fn(async () => mockCustomers.filter((c) => !c.deletedAt)),
        count: vi.fn(async () => mockCustomers.filter((c) => !c.deletedAt).length),
      },
      deal: {
        findFirst: vi.fn(async ({ where }) => mockDeals.find((d) => d.id === where.id && !d.deletedAt) || null),
        create: vi.fn(async ({ data }) => {
          const newDeal = { id: crypto.randomUUID(), ...data, createdAt: new Date(), updatedAt: new Date(), deletedAt: null };
          mockDeals.push(newDeal);
          return newDeal;
        }),
        update: vi.fn(async ({ where, data }) => {
          const deal = mockDeals.find((d) => d.id === where.id);
          if (deal) Object.assign(deal, data);
          return deal;
        }),
        findMany: vi.fn(async () => mockDeals.filter((d) => !d.deletedAt)),
        count: vi.fn(async () => mockDeals.filter((d) => !d.deletedAt).length),
      },
    },
  };
});

describe('Customers & Deals API Endpoints (/api/customers & /api/deals)', () => {
  let adminToken: string;
  let customerId: string;

  beforeAll(async () => {
    const state = await setupTestState();
    adminToken = state.adminToken;
  });

  it('POST /api/customers - should create a customer', async () => {
    const res = await request(app)
      .post('/api/customers')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Apex Innovations',
        contactEmail: 'contact@apexinnovations.com',
        industry: 'Biotech',
        status: 'ACTIVE',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBeDefined();
    customerId = res.body.data.id;
  });

  it('POST /api/deals - should create a deal under customer', async () => {
    const res = await request(app)
      .post('/api/deals')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Biotech Lab Equipment Renewal',
        amount: 120000,
        stage: 'PROPOSAL',
        customerId,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.amount).toBe(120000);
    expect(res.body.data.probability).toBe(50);
  });

  it('PUT /api/deals/:id - should update deal stage to CLOSED_WON and auto-set probability & closedAt', async () => {
    const dealId = mockDeals[0].id;

    const res = await request(app)
      .put(`/api/deals/${dealId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        stage: 'CLOSED_WON',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.probability).toBe(100);
    expect(res.body.data.closedAt).toBeDefined();
  });
});
