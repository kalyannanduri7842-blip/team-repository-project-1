import prisma from '../database/client';
import { Task, TaskPriority, TaskStatus, Prisma } from '@prisma/client';

export interface FindTasksParams {
  page: number;
  limit: number;
  search?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  assignedToId?: string;
  leadId?: string;
  customerId?: string;
  dealId?: string;
  dueBefore?: Date;
  dueAfter?: Date;
  sortBy?: 'dueDate' | 'createdAt' | 'priority';
  sortOrder?: 'asc' | 'desc';
}

export class TaskRepository {
  async findById(id: string): Promise<Task | null> {
    return prisma.task.findFirst({
      where: { id, deletedAt: null },
      include: {
        assignedTo: { select: { id: true, firstName: true, lastName: true, email: true } },
        createdBy: { select: { id: true, firstName: true, lastName: true, email: true } },
        lead: { select: { id: true, firstName: true, lastName: true } },
        customer: { select: { id: true, name: true } },
        deal: { select: { id: true, title: true } },
      },
    });
  }

  async create(data: {
    title: string;
    description?: string;
    dueDate?: Date;
    priority?: TaskPriority;
    status?: TaskStatus;
    assignedToId: string;
    createdByUserId: string;
    leadId?: string;
    customerId?: string;
    dealId?: string;
  }): Promise<Task> {
    return prisma.task.create({
      data,
      include: {
        assignedTo: { select: { id: true, firstName: true, lastName: true } },
        createdBy: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async update(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
    return prisma.task.update({
      where: { id },
      data,
      include: {
        assignedTo: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async softDelete(id: string): Promise<Task> {
    return prisma.task.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findMany(params: FindTasksParams): Promise<{ tasks: Task[]; total: number }> {
    const {
      page,
      limit,
      search,
      priority,
      status,
      assignedToId,
      leadId,
      customerId,
      dealId,
      dueBefore,
      dueAfter,
      sortBy = 'dueDate',
      sortOrder = 'asc',
    } = params;

    const skip = (page - 1) * limit;

    const where: Prisma.TaskWhereInput = {
      deletedAt: null,
      ...(priority && { priority }),
      ...(status && { status }),
      ...(assignedToId && { assignedToId }),
      ...(leadId && { leadId }),
      ...(customerId && { customerId }),
      ...(dealId && { dealId }),
      ...((dueBefore || dueAfter) && {
        dueDate: {
          ...(dueAfter && { gte: dueAfter }),
          ...(dueBefore && { lte: dueBefore }),
        },
      }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          assignedTo: { select: { id: true, firstName: true, lastName: true } },
          createdBy: { select: { id: true, firstName: true, lastName: true } },
          lead: { select: { id: true, firstName: true, lastName: true } },
          customer: { select: { id: true, name: true } },
          deal: { select: { id: true, title: true } },
        },
      }),
      prisma.task.count({ where }),
    ]);

    return { tasks, total };
  }
}

export const taskRepository = new TaskRepository();
