import prisma from '../database/client';
import { Deal, DealStage, Prisma } from '@prisma/client';

export interface FindDealsParams {
  page: number;
  limit: number;
  search?: string;
  stage?: DealStage;
  ownerId?: string;
  customerId?: string;
  minAmount?: number;
  maxAmount?: number;
  sortBy?: 'createdAt' | 'amount' | 'title' | 'expectedCloseDate';
  sortOrder?: 'asc' | 'desc';
}

export class DealRepository {
  async findById(id: string): Promise<Deal | null> {
    return prisma.deal.findFirst({
      where: { id, deletedAt: null },
      include: {
        customer: {
          select: { id: true, name: true, contactEmail: true },
        },
        lead: {
          select: { id: true, firstName: true, lastName: true },
        },
        owner: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        activities: {
          take: 5,
          orderBy: { activityDate: 'desc' },
        },
        tasks: {
          where: { deletedAt: null, status: { not: 'COMPLETED' } },
        },
      },
    });
  }

  async create(data: {
    title: string;
    amount: number;
    stage?: DealStage;
    probability?: number;
    expectedCloseDate?: Date;
    customerId: string;
    leadId?: string;
    ownerId: string;
    lostReason?: string;
  }): Promise<Deal> {
    const probability = data.probability !== undefined ? data.probability : this.getDefaultProbability(data.stage || 'QUALIFICATION');
    return prisma.deal.create({
      data: {
        ...data,
        probability,
        ...(data.stage === 'CLOSED_WON' || data.stage === 'CLOSED_LOST' ? { closedAt: new Date() } : {}),
      },
      include: {
        customer: { select: { id: true, name: true } },
        owner: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async update(id: string, data: Prisma.DealUpdateInput): Promise<Deal> {
    return prisma.deal.update({
      where: { id },
      data,
      include: {
        customer: { select: { id: true, name: true } },
        owner: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async softDelete(id: string): Promise<Deal> {
    return prisma.deal.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findMany(params: FindDealsParams): Promise<{ deals: Deal[]; total: number }> {
    const { page, limit, search, stage, ownerId, customerId, minAmount, maxAmount, sortBy = 'createdAt', sortOrder = 'desc' } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.DealWhereInput = {
      deletedAt: null,
      ...(stage && { stage }),
      ...(ownerId && { ownerId }),
      ...(customerId && { customerId }),
      ...((minAmount !== undefined || maxAmount !== undefined) && {
        amount: {
          ...(minAmount !== undefined && { gte: minAmount }),
          ...(maxAmount !== undefined && { lte: maxAmount }),
        },
      }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { customer: { name: { contains: search, mode: 'insensitive' } } },
        ],
      }),
    };

    const [deals, total] = await Promise.all([
      prisma.deal.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          customer: { select: { id: true, name: true } },
          owner: { select: { id: true, firstName: true, lastName: true, email: true } },
        },
      }),
      prisma.deal.count({ where }),
    ]);

    return { deals, total };
  }

  private getDefaultProbability(stage: DealStage): number {
    switch (stage) {
      case 'QUALIFICATION':
        return 20;
      case 'PROPOSAL':
        return 50;
      case 'NEGOTIATION':
        return 80;
      case 'CLOSED_WON':
        return 100;
      case 'CLOSED_LOST':
        return 0;
      default:
        return 10;
    }
  }
}

export const dealRepository = new DealRepository();
