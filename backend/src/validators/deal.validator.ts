import { z } from 'zod';

export const createDealSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Deal title is required'),
    amount: z.number().min(0, 'Amount must be non-negative'),
    stage: z.enum(['QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST']).optional().default('QUALIFICATION'),
    probability: z.number().min(0).max(100).optional(),
    expectedCloseDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    customerId: z.string().uuid('Invalid customer ID format'),
    leadId: z.string().uuid().optional(),
    ownerId: z.string().uuid().optional(),
    lostReason: z.string().optional(),
  }),
});

export const updateDealSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid deal ID format'),
  }),
  body: z.object({
    title: z.string().min(1).optional(),
    amount: z.number().min(0).optional(),
    stage: z.enum(['QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST']).optional(),
    probability: z.number().min(0).max(100).optional(),
    expectedCloseDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    customerId: z.string().uuid().optional(),
    leadId: z.string().uuid().nullable().optional(),
    ownerId: z.string().uuid().optional(),
    lostReason: z.string().optional(),
  }),
});

export const queryDealsSchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    search: z.string().optional(),
    stage: z.enum(['QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST']).optional(),
    ownerId: z.string().optional(),
    customerId: z.string().optional(),
    minAmount: z.string().optional().transform((val) => (val ? parseFloat(val) : undefined)),
    maxAmount: z.string().optional().transform((val) => (val ? parseFloat(val) : undefined)),
    sortBy: z.enum(['createdAt', 'amount', 'title', 'expectedCloseDate']).optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  }),
});
