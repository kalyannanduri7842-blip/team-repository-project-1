import { dealRepository, DealRepository, FindDealsParams } from '../repositories/deal.repository';
import { customerRepository } from '../repositories/customer.repository';
import { NotFoundError } from '../errors/AppError';
import { DealStage } from '@prisma/client';

export interface CreateDealInput {
  title: string;
  amount: number;
  stage?: DealStage;
  probability?: number;
  expectedCloseDate?: Date;
  customerId: string;
  leadId?: string;
  ownerId?: string;
  lostReason?: string;
}

export class DealService {
  private dealRepo: DealRepository;

  constructor(repo = dealRepository) {
    this.dealRepo = repo;
  }

  async createDeal(input: CreateDealInput, currentUserId: string) {
    // Verify Customer exists
    const customer = await customerRepository.findById(input.customerId);
    if (!customer) {
      throw new NotFoundError(`Customer with ID '${input.customerId}' not found`);
    }

    const ownerId = input.ownerId || currentUserId;
    return this.dealRepo.create({
      ...input,
      ownerId,
    });
  }

  async getDealById(id: string) {
    const deal = await this.dealRepo.findById(id);
    if (!deal) {
      throw new NotFoundError(`Deal with ID '${id}' not found`);
    }
    return deal;
  }

  async getDeals(params: FindDealsParams) {
    const { deals, total } = await this.dealRepo.findMany(params);
    const totalPages = Math.ceil(total / params.limit) || 1;

    return {
      deals,
      meta: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages,
      },
    };
  }

  async updateDeal(id: string, data: any) {
    const existing = await this.getDealById(id);

    // Business rules for stage transitions
    const updatedData = { ...data };
    if (data.stage && data.stage !== existing.stage) {
      if (data.stage === 'CLOSED_WON') {
        updatedData.probability = 100;
        updatedData.closedAt = new Date();
      } else if (data.stage === 'CLOSED_LOST') {
        updatedData.probability = 0;
        updatedData.closedAt = new Date();
      } else if (data.probability === undefined) {
        // Assign default stage probability if not explicitly provided
        updatedData.probability = this.getStageProbability(data.stage);
      }
    }

    return this.dealRepo.update(id, updatedData);
  }

  async deleteDeal(id: string) {
    await this.getDealById(id);
    await this.dealRepo.softDelete(id);
    return { message: `Deal '${id}' deleted successfully` };
  }

  private getStageProbability(stage: DealStage): number {
    switch (stage) {
      case 'QUALIFICATION': return 20;
      case 'PROPOSAL': return 50;
      case 'NEGOTIATION': return 80;
      case 'CLOSED_WON': return 100;
      case 'CLOSED_LOST': return 0;
      default: return 10;
    }
  }
}

export const dealService = new DealService();
