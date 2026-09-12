import prisma from '../database/client';
import { Activity, ActivityType, Prisma } from '@prisma/client';

export interface FindActivitiesParams {
  page: number;
  limit: number;
  type?: ActivityType;
  userId?: string;
  leadId?: string;
  customerId?: string;
  dealId?: string;
  startDate?: Date;
  endDate?: Date;
}

export class ActivityRepository {
  async findById(id: string): Promise<Activity | null> {
    return prisma.activity.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true } },
        lead: { select: { id: true, firstName: true, lastName: true } },
        customer: { select: { id: true, name: true } },
        deal: { select: { id: true, title: true } },
      },
    });
  }

  async create(data: {
    type: ActivityType;
    subject: string;
    description?: string;
    userId: string;
    leadId?: string;
    customerId?: string;
    dealId?: string;
    activityDate?: Date;
  }): Promise<Activity> {
    return prisma.activity.create({
      data,
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async delete(id: string): Promise<Activity> {
    return prisma.activity.delete({
      where: { id },
    });
  }

  async findMany(params: FindActivitiesParams): Promise<{ activities: Activity[]; total: number }> {
    const { page, limit, type, userId, leadId, customerId, dealId, startDate, endDate } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.ActivityWhereInput = {
      ...(type && { type }),
      ...(userId && { userId }),
      ...(leadId && { leadId }),
      ...(customerId && { customerId }),
      ...(dealId && { dealId }),
      ...((startDate || endDate) && {
        activityDate: {
          ...(startDate && { gte: startDate }),
          ...(endDate && { lte: endDate }),
        },
      }),
    };

    const [activities, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        skip,
        take: limit,
        orderBy: { activityDate: 'desc' },
        include: {
          user: { select: { id: true, firstName: true, lastName: true } },
          lead: { select: { id: true, firstName: true, lastName: true } },
          customer: { select: { id: true, name: true } },
          deal: { select: { id: true, title: true } },
        },
      }),
      prisma.activity.count({ where }),
    ]);

    return { activities, total };
  }
}

export const activityRepository = new ActivityRepository();
