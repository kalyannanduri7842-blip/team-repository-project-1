import prisma from '../database/client';
import { Lead, LeadStatus, LeadSource, Prisma } from '@prisma/client';

export interface FindLeadsParams {
  page: number;
  limit: number;
  search?: string;
  status?: LeadStatus;
  source?: LeadSource;
  assignedToId?: string;
  sortBy?: 'createdAt' | 'value' | 'lastName';
  sortOrder?: 'asc' | 'desc';
}

export class LeadRepository {
  async findById(id: string): Promise<Lead | null> {
    return prisma.lead.findFirst({
      where: { id, deletedAt: null },
      include: {
        assignedTo: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        convertedCustomer: {
          select: { id: true, name: true },
        },
      },
    });
  }

  async findByEmail(email: string): Promise<Lead | null> {
    return prisma.lead.findFirst({
      where: { email: email.toLowerCase(), deletedAt: null },
    });
  }

  async create(data: {
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
  }): Promise<Lead> {
    return prisma.lead.create({
      data: {
        ...data,
        email: data.email.toLowerCase(),
      },
      include: {
        assignedTo: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }

  async update(id: string, data: Prisma.LeadUpdateInput): Promise<Lead> {
    return prisma.lead.update({
      where: { id },
      data,
      include: {
        assignedTo: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }

  async softDelete(id: string): Promise<Lead> {
    return prisma.lead.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findMany(params: FindLeadsParams): Promise<{ leads: Lead[]; total: number }> {
    const { page, limit, search, status, source, assignedToId, sortBy = 'createdAt', sortOrder = 'desc' } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.LeadWhereInput = {
      deletedAt: null,
      ...(status && { status }),
      ...(source && { source }),
      ...(assignedToId && { assignedToId }),
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { company: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          assignedTo: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
          createdBy: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
        },
      }),
      prisma.lead.count({ where }),
    ]);

    return { leads, total };
  }

  async convertLeadTransaction(input: {
    lead: Lead;
    customerName?: string;
    createDeal?: boolean;
    dealTitle?: string;
    dealAmount?: number;
    dealStage?: any;
    userId: string;
  }) {
    return prisma.$transaction(async (tx) => {
      const { lead, customerName, createDeal, dealTitle, dealAmount, dealStage } = input;

      const nameToUse = customerName || lead.company || `${lead.firstName} ${lead.lastName}`;
      const ownerId = lead.assignedToId || lead.createdByUserId;

      // 1. Create Customer
      const customer = await tx.customer.create({
        data: {
          name: nameToUse,
          contactEmail: lead.email,
          contactPhone: lead.phone,
          status: 'ACTIVE',
          ownerId,
          convertedFromLeadId: lead.id,
        },
      });

      // 2. Update Lead to CONVERTED
      const updatedLead = await tx.lead.update({
        where: { id: lead.id },
        data: {
          status: 'CONVERTED',
          convertedAt: new Date(),
          convertedCustomerId: customer.id,
        },
      });

      // 3. Create Deal if requested
      let deal = null;
      if (createDeal) {
        deal = await tx.deal.create({
          data: {
            title: dealTitle || `Deal - ${nameToUse}`,
            amount: dealAmount !== undefined ? dealAmount : lead.value,
            stage: dealStage || 'QUALIFICATION',
            probability: dealStage === 'CLOSED_WON' ? 100 : dealStage === 'CLOSED_LOST' ? 0 : 20,
            customerId: customer.id,
            leadId: lead.id,
            ownerId,
          },
        });
      }

      // 4. Log conversion activity
      await tx.activity.create({
        data: {
          type: 'NOTE',
          subject: 'Lead Converted',
          description: `Lead converted to customer '${customer.name}'${deal ? ` and deal '${deal.title}'` : ''}`,
          userId: input.userId,
          leadId: lead.id,
          customerId: customer.id,
          ...(deal && { dealId: deal.id }),
        },
      });

      return { customer, lead: updatedLead, deal };
    });
  }
}

export const leadRepository = new LeadRepository();
