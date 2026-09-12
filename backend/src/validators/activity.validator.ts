import { z } from 'zod';

export const createActivitySchema = z.object({
  body: z.object({
    type: z.enum(['CALL', 'MEETING', 'EMAIL', 'NOTE', 'TASK_LOG']),
    subject: z.string().min(1, 'Subject is required'),
    description: z.string().optional(),
    leadId: z.string().uuid().optional(),
    customerId: z.string().uuid().optional(),
    dealId: z.string().uuid().optional(),
    activityDate: z.string().optional().transform((val) => (val ? new Date(val) : new Date())),
  }).refine((data) => data.leadId || data.customerId || data.dealId, {
    message: 'Activity must be associated with at least one entity (leadId, customerId, or dealId)',
    path: ['leadId'],
  }),
});

export const queryActivitiesSchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    type: z.enum(['CALL', 'MEETING', 'EMAIL', 'NOTE', 'TASK_LOG']).optional(),
    userId: z.string().optional(),
    leadId: z.string().optional(),
    customerId: z.string().optional(),
    dealId: z.string().optional(),
    startDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    endDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
  }),
});
