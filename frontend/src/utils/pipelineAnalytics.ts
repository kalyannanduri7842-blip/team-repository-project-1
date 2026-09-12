import { Deal } from '../types';

export interface StageSummary {
  count: number;
  totalAmount: number;
  weightedAmount: number;
}

/**
 * Calculates win rate percentage of completed deals.
 */
export function calculateWinRate(deals: Deal[]): number {
  const closedDeals = deals.filter((d) => d.stage === 'won' || d.stage === 'lost');
  if (closedDeals.length === 0) return 0;
  const wonCount = closedDeals.filter((d) => d.stage === 'won').length;
  return Number(((wonCount / closedDeals.length) * 100).toFixed(1));
}

/**
 * Aggregates pipeline distribution across stages.
 */
export function groupDealsByStage(deals: Deal[]): Record<Deal['stage'], StageSummary> {
  const summary: Record<Deal['stage'], StageSummary> = {
    new: { count: 0, totalAmount: 0, weightedAmount: 0 },
    qualified: { count: 0, totalAmount: 0, weightedAmount: 0 },
    proposal: { count: 0, totalAmount: 0, weightedAmount: 0 },
    negotiation: { count: 0, totalAmount: 0, weightedAmount: 0 },
    won: { count: 0, totalAmount: 0, weightedAmount: 0 },
    lost: { count: 0, totalAmount: 0, weightedAmount: 0 },
  };

  deals.forEach((deal) => {
    if (summary[deal.stage]) {
      summary[deal.stage].count += 1;
      summary[deal.stage].totalAmount += deal.amount;
      summary[deal.stage].weightedAmount += (deal.amount * deal.probability) / 100;
    }
  });

  return summary;
}
