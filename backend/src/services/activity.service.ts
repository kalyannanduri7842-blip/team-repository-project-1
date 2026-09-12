import { activityRepository, ActivityRepository, FindActivitiesParams } from '../repositories/activity.repository';
import { leadRepository } from '../repositories/lead.repository';
import { customerRepository } from '../repositories/customer.repository';
import { dealRepository } from '../repositories/deal.repository';
import { NotFoundError, BusinessRuleError } from '../errors/AppError';
import { ActivityType } from '@prisma/client';

export interface CreateActivityInput {
  type: ActivityType;
  subject: string;
  description?: string;
  leadId?: string;
  customerId?: string;
  dealId?: string;
  activityDate?: Date;
}

export class ActivityService {
  private activityRepo: ActivityRepository;

  constructor(repo = activityRepository) {
    this.activityRepo = repo;
  }

  async createActivity(input: CreateActivityInput, currentUserId: string) {
    // Validate target entity exists
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

    return this.activityRepo.create({
      ...input,
      userId: currentUserId,
    });
  }

  async getActivities(params: FindActivitiesParams) {
    const { activities, total } = await this.activityRepo.findMany(params);
    const totalPages = Math.ceil(total / params.limit) || 1;

    return {
      activities,
      meta: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages,
      },
    };
  }

  async deleteActivity(id: string) {
    const activity = await this.activityRepo.findById(id);
    if (!activity) {
      throw new NotFoundError(`Activity with ID '${id}' not found`);
    }
    await this.activityRepo.delete(id);
    return { message: `Activity '${id}' deleted successfully` };
  }
}

export const activityService = new ActivityService();
