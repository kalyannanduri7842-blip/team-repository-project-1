import { z } from 'zod';

export const createLeadSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    company: z.string().optional(),
    title: z.string().optional(),
    source: z.enum(['WEBSITE', 'REFERRAL', 'COLD_CALL', 'CAMPAIGN', 'OTHER']).optional().default('OTHER'),
    status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'UNQUALIFIED', 'CONVERTED', 'ARCHIVED']).optional().default('NEW'),
    value: z.number().min(0, 'Value must be non-negative').optional().default(0),
    assignedToId: z.string().uuid('Invalid assigned user ID').optional(),
  }),
});

export const updateLeadSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid lead ID format'),
  }),
  body: z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
    title: z.string().optional(),
    source: z.enum(['WEBSITE', 'REFERRAL', 'COLD_CALL', 'CAMPAIGN', 'OTHER']).optional(),
    status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'UNQUALIFIED', 'CONVERTED', 'ARCHIVED']).optional(),
    value: z.number().min(0).optional(),
    assignedToId: z.string().uuid().nullable().optional(),
  }),
});

export const convertLeadSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid lead ID format'),
  }),
  body: z.object({
    customerName: z.string().optional(), // Defaults to company or full name
    createDeal: z.boolean().optional().default(false),
    dealTitle: z.string().optional(),
    dealAmount: z.number().min(0).optional(),
    dealStage: z.enum(['QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST']).optional().default('QUALIFICATION'),
  }),
});

export const queryLeadsSchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    search: z.string().optional(),
    status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'UNQUALIFIED', 'CONVERTED', 'ARCHIVED']).optional(),
    source: z.enum(['WEBSITE', 'REFERRAL', 'COLD_CALL', 'CAMPAIGN', 'OTHER']).optional(),
    assignedToId: z.string().optional(),
    sortBy: z.enum(['createdAt', 'value', 'lastName']).optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  }),
});
