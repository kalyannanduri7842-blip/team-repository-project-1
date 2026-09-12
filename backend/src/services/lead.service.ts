import { leadRepository, LeadRepository, FindLeadsParams } from '../repositories/lead.repository';
import { NotFoundError, BusinessRuleError, ConflictError } from '../errors/AppError';
import { LeadSource, LeadStatus } from '@prisma/client';

export interface CreateLeadInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  source?: LeadSource;
  status?: LeadStatus;
  value?: number;
  assignedToId?: string;
  createdByUserId: string;
}

export interface ConvertLeadInput {
  customerName?: string;
  createDeal?: boolean;
  dealTitle?: string;
  dealAmount?: number;
  dealStage?: any;
  userId: string;
}

export class LeadService {
  private leadRepo: LeadRepository;

  constructor(repo = leadRepository) {
    this.leadRepo = repo;
  }

  async createLead(input: CreateLeadInput) {
    const existing = await this.leadRepo.findByEmail(input.email);
    if (existing) {
      throw new ConflictError(`A lead with email '${input.email}' already exists`);
    }

    return this.leadRepo.create(input);
  }

  async getLeadById(id: string) {
    const lead = await this.leadRepo.findById(id);
    if (!lead) {
      throw new NotFoundError(`Lead with ID '${id}' not found`);
    }
    return lead;
  }

  async getLeads(params: FindLeadsParams) {
    const { leads, total } = await this.leadRepo.findMany(params);
    const totalPages = Math.ceil(total / params.limit) || 1;

    return {
      leads,
      meta: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages,
      },
    };
  }

  async updateLead(id: string, data: any) {
    await this.getLeadById(id);
    return this.leadRepo.update(id, data);
  }

  async deleteLead(id: string) {
    await this.getLeadById(id);
    await this.leadRepo.softDelete(id);
    return { message: `Lead '${id}' deleted successfully` };
  }

  async convertLead(id: string, input: ConvertLeadInput) {
    const lead = await this.getLeadById(id);

    if (lead.status === 'CONVERTED') {
      throw new BusinessRuleError('Lead has already been converted to a customer');
    }

    if (lead.status === 'ARCHIVED' || lead.status === 'UNQUALIFIED') {
      throw new BusinessRuleError(`Cannot convert a lead with status '${lead.status}'`);
    }

    return this.leadRepo.convertLeadTransaction({
      lead,
      customerName: input.customerName,
      createDeal: input.createDeal,
      dealTitle: input.dealTitle,
      dealAmount: input.dealAmount,
      dealStage: input.dealStage,
      userId: input.userId,
    });
  }
}

export const leadService = new LeadService();
