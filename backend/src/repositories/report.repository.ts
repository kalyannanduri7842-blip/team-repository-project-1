import prisma from '../database/client';
import { Prisma } from '@prisma/client';

export interface ReportFilterOptions {
  startDate?: Date;
  endDate?: Date;
  userId?: string;
}

export class ReportRepository {
  async getSalesReport(filter: ReportFilterOptions) {
    const { startDate, endDate, userId } = filter;

    const where: Prisma.DealWhereInput = {
      deletedAt: null,
      ...(userId && { ownerId: userId }),
      ...((startDate || endDate) && {
        createdAt: {
          ...(startDate && { gte: startDate }),
          ...(endDate && { lte: endDate }),
        },
      }),
    };

    const [allDeals, stageGroups, ownerGroups] = await Promise.all([
      prisma.deal.findMany({
        where,
        select: {
          id: true,
          amount: true,
          stage: true,
          ownerId: true,
          owner: { select: { firstName: true, lastName: true } },
        },
      }),
      prisma.deal.groupBy({
        by: ['stage'],
        where,
        _count: { id: true },
        _sum: { amount: true },
      }),
      prisma.deal.groupBy({
        by: ['ownerId'],
        where: { ...where, stage: 'CLOSED_WON' },
        _count: { id: true },
        _sum: { amount: true },
      }),
    ]);

    const wonDeals = allDeals.filter((d) => d.stage === 'CLOSED_WON');
    const lostDeals = allDeals.filter((d) => d.stage === 'CLOSED_LOST');
    const openDeals = allDeals.filter((d) => ['QUALIFICATION', 'PROPOSAL', 'NEGOTIATION'].includes(d.stage));

    const totalSales = wonDeals.reduce((sum, d) => sum + d.amount, 0);
    const pipelineValue = openDeals.reduce((sum, d) => sum + d.amount, 0);
    const closedCount = wonDeals.length + lostDeals.length;
    const winRate = closedCount > 0 ? (wonDeals.length / closedCount) * 100 : 0;

    // Rep leaderboard details
    const reps = await prisma.user.findMany({
      where: { id: { in: ownerGroups.map((g) => g.ownerId) } },
      select: { id: true, firstName: true, lastName: true, email: true },
    });

    const leaderboard = ownerGroups.map((g) => {
      const rep = reps.find((r) => r.id === g.ownerId);
      return {
        userId: g.ownerId,
        userName: rep ? `${rep.firstName} ${rep.lastName}` : 'Unknown',
        wonDealsCount: g._count.id,
        totalRevenue: g._sum.amount || 0,
      };
    });

    return {
      totalSales,
      totalWonDeals: wonDeals.length,
      totalLostDeals: lostDeals.length,
      totalOpenDeals: openDeals.length,
      pipelineValue,
      winRate: parseFloat(winRate.toFixed(2)),
      stageBreakdown: stageGroups.map((s) => ({
        stage: s.stage,
        count: s._count.id,
        totalAmount: s._sum.amount || 0,
      })),
      salesRepLeaderboard: leaderboard,
    };
  }

  async getLeadReport(filter: ReportFilterOptions) {
    const { startDate, endDate, userId } = filter;

    const where: Prisma.LeadWhereInput = {
      deletedAt: null,
      ...(userId && { assignedToId: userId }),
      ...((startDate || endDate) && {
        createdAt: {
          ...(startDate && { gte: startDate }),
          ...(endDate && { lte: endDate }),
        },
      }),
    };

    const [totalLeads, sourceGroups, statusGroups, convertedGroups] = await Promise.all([
      prisma.lead.count({ where }),
      prisma.lead.groupBy({
        by: ['source'],
        where,
        _count: { id: true },
      }),
      prisma.lead.groupBy({
        by: ['status'],
        where,
        _count: { id: true },
      }),
      prisma.lead.groupBy({
        by: ['assignedToId'],
        where: { ...where, status: 'CONVERTED' },
        _count: { id: true },
      }),
    ]);

    const convertedCount = statusGroups.find((s) => s.status === 'CONVERTED')?._count.id || 0;
    const conversionRate = totalLeads > 0 ? (convertedCount / totalLeads) * 100 : 0;

    const assignedUserIds = convertedGroups.map((g) => g.assignedToId).filter(Boolean) as string[];
    const reps = await prisma.user.findMany({
      where: { id: { in: assignedUserIds } },
      select: { id: true, firstName: true, lastName: true },
    });

    const repLeaderboard = convertedGroups
      .filter((g) => g.assignedToId !== null)
      .map((g) => {
        const rep = reps.find((r) => r.id === g.assignedToId);
        return {
          userId: g.assignedToId!,
          userName: rep ? `${rep.firstName} ${rep.lastName}` : 'Unassigned',
          convertedCount: g._count.id,
        };
      });

    return {
      totalLeads,
      convertedLeads: convertedCount,
      conversionRate: parseFloat(conversionRate.toFixed(2)),
      sourceBreakdown: sourceGroups.map((s) => ({
        source: s.source,
        count: s._count.id,
      })),
      statusBreakdown: statusGroups.map((s) => ({
        status: s.status,
        count: s._count.id,
      })),
      repConversionLeaderboard: repLeaderboard,
    };
  }

  async getPerformanceReport(filter: ReportFilterOptions) {
    const { startDate, endDate, userId } = filter;

    const userWhere: Prisma.UserWhereInput = {
      status: 'ACTIVE',
      ...(userId && { id: userId }),
    };

    const users = await prisma.user.findMany({
      where: userWhere,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    const performanceData = await Promise.all(
      users.map(async (u) => {
        const [assignedLeads, convertedLeads, wonDeals, activitiesCount, completedTasks, pendingTasks] = await Promise.all([
          prisma.lead.count({ where: { assignedToId: u.id, deletedAt: null } }),
          prisma.lead.count({ where: { assignedToId: u.id, status: 'CONVERTED', deletedAt: null } }),
          prisma.deal.aggregate({
            where: { ownerId: u.id, stage: 'CLOSED_WON', deletedAt: null },
            _count: { id: true },
            _sum: { amount: true },
          }),
          prisma.activity.count({ where: { userId: u.id } }),
          prisma.task.count({ where: { assignedToId: u.id, status: 'COMPLETED', deletedAt: null } }),
          prisma.task.count({ where: { assignedToId: u.id, status: { in: ['PENDING', 'IN_PROGRESS'] }, deletedAt: null } }),
        ]);

        const conversionRate = assignedLeads > 0 ? (convertedLeads / assignedLeads) * 100 : 0;
        const totalTaskCount = completedTasks + pendingTasks;
        const taskCompletionRate = totalTaskCount > 0 ? (completedTasks / totalTaskCount) * 100 : 0;

        return {
          user: {
            id: u.id,
            name: `${u.firstName} ${u.lastName}`,
            email: u.email,
            role: u.role,
          },
          leads: {
            assigned: assignedLeads,
            converted: convertedLeads,
            conversionRate: parseFloat(conversionRate.toFixed(2)),
          },
          deals: {
            wonCount: wonDeals._count.id,
            revenue: wonDeals._sum.amount || 0,
          },
          activities: {
            loggedCount: activitiesCount,
          },
          tasks: {
            completed: completedTasks,
            pending: pendingTasks,
            completionRate: parseFloat(taskCompletionRate.toFixed(2)),
          },
        };
      })
    );

    return {
      performanceScorecards: performanceData,
    };
  }
}

export const reportRepository = new ReportRepository();
