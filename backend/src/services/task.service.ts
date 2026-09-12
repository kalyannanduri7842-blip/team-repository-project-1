import { taskRepository, TaskRepository, FindTasksParams } from '../repositories/task.repository';
import { leadRepository } from '../repositories/lead.repository';
import { customerRepository } from '../repositories/customer.repository';
import { dealRepository } from '../repositories/deal.repository';
import { NotFoundError } from '../errors/AppError';
import { TaskPriority, TaskStatus } from '@prisma/client';

export interface CreateTaskInput {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: TaskPriority;
  status?: TaskStatus;
  assignedToId?: string;
  leadId?: string;
  customerId?: string;
  dealId?: string;
}

export class TaskService {
  private taskRepo: TaskRepository;

  constructor(repo = taskRepository) {
    this.taskRepo = repo;
  }

  async createTask(input: CreateTaskInput, currentUserId: string) {
    if (input.leadId) {
      const lead = await leadRepository.findById(input.leadId);
      if (!lead) throw new NotFoundError(`Associated Lead with ID '${input.leadId}' not found`);
    }

    if (input.customerId) {
      const customer = await customerRepository.findById(input.customerId);
      if (!customer) throw new NotFoundError(`Associated Customer with ID '${input.customerId}' not found`);
    }

    if (input.dealId) {
      const deal = await dealRepository.findById(input.dealId);
      if (!deal) throw new NotFoundError(`Associated Deal with ID '${input.dealId}' not found`);
    }

    const assignedToId = input.assignedToId || currentUserId;

    return this.taskRepo.create({
      ...input,
      assignedToId,
      createdByUserId: currentUserId,
    });
  }

  async getTaskById(id: string) {
    const task = await this.taskRepo.findById(id);
    if (!task) {
      throw new NotFoundError(`Task with ID '${id}' not found`);
    }
    return task;
  }

  async getTasks(params: FindTasksParams) {
    const { tasks, total } = await this.taskRepo.findMany(params);
    const totalPages = Math.ceil(total / params.limit) || 1;

    return {
      tasks,
      meta: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages,
      },
    };
  }

  async updateTask(id: string, data: any) {
    await this.getTaskById(id);
    return this.taskRepo.update(id, data);
  }

  async deleteTask(id: string) {
    await this.getTaskById(id);
    await this.taskRepo.softDelete(id);
    return { message: `Task '${id}' deleted successfully` };
  }
}

export const taskService = new TaskService();
