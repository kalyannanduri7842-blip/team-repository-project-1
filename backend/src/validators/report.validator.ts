import { z } from 'zod';

export const reportQuerySchema = z.object({
  query: z.object({
    startDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    endDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    userId: z.string().optional(),
  }),
});
