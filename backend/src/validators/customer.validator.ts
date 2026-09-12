import { z } from 'zod';

export const createCustomerSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Customer name is required'),
    contactEmail: z.string().email('Invalid contact email'),
    contactPhone: z.string().optional(),
    industry: z.string().optional(),
    address: z.string().optional(),
    status: z.enum(['PROSPECT', 'ACTIVE', 'INACTIVE', 'CHURNED']).optional().default('ACTIVE'),
    ownerId: z.string().uuid('Invalid owner ID').optional(),
  }),
});

export const updateCustomerSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid customer ID format'),
  }),
  body: z.object({
    name: z.string().min(1).optional(),
    contactEmail: z.string().email().optional(),
    contactPhone: z.string().optional(),
    industry: z.string().optional(),
    address: z.string().optional(),
    status: z.enum(['PROSPECT', 'ACTIVE', 'INACTIVE', 'CHURNED']).optional(),
    ownerId: z.string().uuid().optional(),
  }),
});

export const queryCustomersSchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    search: z.string().optional(),
    status: z.enum(['PROSPECT', 'ACTIVE', 'INACTIVE', 'CHURNED']).optional(),
    ownerId: z.string().optional(),
    sortBy: z.enum(['createdAt', 'name']).optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  }),
});
