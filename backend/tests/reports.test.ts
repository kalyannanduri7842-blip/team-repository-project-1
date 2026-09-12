import { describe, it, expect, vi, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { setupTestState } from './mockData';

vi.mock('../src/database/client', () => {
  return {
    default: {
      user: {
        findUnique: vi.fn(async ({ where }) => {
          if (where.id === '11111111-1111-4111-8111-111111111111') {
            return { id: '11111111-1111-4111-8111-111111111111', role: 'ADMIN', status: 'ACTIVE' };
          }
          if (where.id === '33333333-3333-4333-8333-333333333333') {
            return { id: '33333333-3333-4333-8333-333333333333', role: 'SALES_REP', status: 'ACTIVE' };
          }
          return null;
        }),
        findMany: vi.fn(async () => []),
      },
      tokenBlacklist: {
        findUnique: vi.fn(async () => null),
      },
      deal: {
        findMany: vi.fn(async () => [
          { id: 'd1', amount: 100000, stage: 'CLOSED_WON', ownerId: 'rep1' },
          { id: 'd2', amount: 50000, stage: 'PROPOSAL', ownerId: 'rep1' },
        ]),
        groupBy: vi.fn(async () => []),
      },
      lead: {
        count: vi.fn(async () => 10),
        groupBy: vi.fn(async () => []),
      },
      activity: {
        count: vi.fn(async () => 5),
      },
      task: {
        count: vi.fn(async () => 3),
      },
    },
  };
});

describe('Reports API Endpoints & RBAC Authorization (/api/reports)', () => {
  let adminToken: string;
  let repToken: string;

  beforeAll(async () => {
    const state = await setupTestState();
    adminToken = state.adminToken;
    repToken = state.repToken;
  });

  it('GET /api/reports/sales - should return sales aggregation report for ADMIN', async () => {
    const res = await request(app)
      .get('/api/reports/sales')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.totalSales).toBe(100000);
    expect(res.body.data.pipelineValue).toBe(50000);
    expect(res.body.data.winRate).toBe(100);
  });

  it('GET /api/reports/leads - should return lead conversion funnel report for ADMIN', async () => {
    const res = await request(app)
      .get('/api/reports/leads')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.totalLeads).toBe(10);
  });

  it('GET /api/reports/sales - should deny access to unauthorized SALES_REP role (RBAC verification)', async () => {
    const res = await request(app)
      .get('/api/reports/sales')
      .set('Authorization', `Bearer ${repToken}`);

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('FORBIDDEN');
  });
});
