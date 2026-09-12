import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import prisma from '../src/database/client';
import { setupTestState } from './mockData';

vi.mock('../src/database/client', () => {
  const mockUsers: any[] = [];
  const mockBlacklist: any[] = [];

  return {
    default: {
      user: {
        findUnique: vi.fn(async ({ where }) => {
          if (where.id) return mockUsers.find((u) => u.id === where.id) || null;
          if (where.email) return mockUsers.find((u) => u.email === where.email) || null;
          return null;
        }),
        create: vi.fn(async ({ data }) => {
          const newUser = { id: `user-${Date.now()}`, ...data, createdAt: new Date(), updatedAt: new Date() };
          mockUsers.push(newUser);
          return newUser;
        }),
        findMany: vi.fn(async () => mockUsers),
        count: vi.fn(async () => mockUsers.length),
      },
      tokenBlacklist: {
        findUnique: vi.fn(async ({ where }) => mockBlacklist.find((b) => b.tokenHash === where.tokenHash) || null),
        create: vi.fn(async ({ data }) => {
          mockBlacklist.push(data);
          return data;
        }),
      },
    },
  };
});

describe('Authentication API Endpoints (/api/auth)', () => {
  it('POST /api/auth/register - should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'newuser@crm.com',
        password: 'Password123!',
        firstName: 'New',
        lastName: 'User',
        role: 'SALES_REP',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user).toBeDefined();
    expect(res.body.data.user.email).toBe('newuser@crm.com');
    expect(res.body.data.user.passwordHash).toBeUndefined(); // Should not leak password hash
    expect(res.body.data.token).toBeDefined();
  });

  it('POST /api/auth/register - should reject invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'invalid-email',
        password: 'Password123!',
        firstName: 'Bad',
        lastName: 'Email',
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('POST /api/auth/login - should authenticate existing user and return token', async () => {
    const state = await setupTestState();

    // Register user first
    await request(app).post('/api/auth/register').send({
      email: 'login.test@crm.com',
      password: 'Password123!',
      firstName: 'Login',
      lastName: 'Test',
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login.test@crm.com',
        password: 'Password123!',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.user.email).toBe('login.test@crm.com');
  });

  it('POST /api/auth/login - should reject invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@crm.com',
        password: 'WrongPassword!',
      });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });
});
