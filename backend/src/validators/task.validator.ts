import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Task title is required'),
    description: z.string().optional(),
    dueDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional().default('MEDIUM'),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional().default('PENDING'),
    assignedToId: z.string().uuid('Invalid assigned user ID').optional(),
    leadId: z.string().uuid().optional(),
    customerId: z.string().uuid().optional(),
    dealId: z.string().uuid().optional(),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid task ID format'),
  }),
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    dueDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
    assignedToId: z.string().uuid().optional(),
    leadId: z.string().uuid().nullable().optional(),
    customerId: z.string().uuid().nullable().optional(),
    dealId: z.string().uuid().nullable().optional(),
  }),
});

export const queryTasksSchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    search: z.string().optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
    assignedToId: z.string().optional(),
    leadId: z.string().optional(),
    customerId: z.string().optional(),
    dealId: z.string().optional(),
    dueBefore: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    dueAfter: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    sortBy: z.enum(['dueDate', 'createdAt', 'priority']).optional().default('dueDate'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  }),
});
