import prisma from '../database/client';
import { Customer, CustomerStatus, Prisma } from '@prisma/client';

export interface FindCustomersParams {
  page: number;
  limit: number;
  search?: string;
  status?: CustomerStatus;
  ownerId?: string;
  sortBy?: 'createdAt' | 'name';
  sortOrder?: 'asc' | 'desc';
}

export class CustomerRepository {
  async findById(id: string): Promise<Customer | null> {
    return prisma.customer.findFirst({
      where: { id, deletedAt: null },
      include: {
        owner: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        deals: {
          where: { deletedAt: null },
          select: { id: true, title: true, amount: true, stage: true },
        },
        activities: {
          take: 5,
          orderBy: { activityDate: 'desc' },
          select: { id: true, type: true, subject: true, activityDate: true },
        },
        tasks: {
          where: { deletedAt: null, status: { not: 'COMPLETED' } },
          select: { id: true, title: true, priority: true, dueDate: true },
        },
      },
    });
  }

  async create(data: {
    name: string;
    contactEmail: string;
    contactPhone?: string;
    industry?: string;
    address?: string;
    status?: CustomerStatus;
    ownerId: string;
    convertedFromLeadId?: string;
  }): Promise<Customer> {
    return prisma.customer.create({
      data: {
        ...data,
        contactEmail: data.contactEmail.toLowerCase(),
      },
      include: {
        owner: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }

  async update(id: string, data: Prisma.CustomerUpdateInput): Promise<Customer> {
    return prisma.customer.update({
      where: { id },
      data,
      include: {
        owner: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }

  async findMany(params: FindCustomersParams): Promise<{ customers: Customer[]; total: number }> {
    const { page, limit, search, status, ownerId, sortBy = 'createdAt', sortOrder = 'desc' } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.CustomerWhereInput = {
      deletedAt: null,
      ...(status && { status }),
      ...(ownerId && { ownerId }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { contactEmail: { contains: search, mode: 'insensitive' } },
          { industry: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          owner: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
          _count: {
            select: { deals: true, activities: true, tasks: true },
          },
        },
      }),
      prisma.customer.count({ where }),
    ]);

    return { customers, total };
  }
}

export const customerRepository = new CustomerRepository();
