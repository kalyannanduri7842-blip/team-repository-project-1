import { create } from 'zustand';
import { ProfitLossStatement, MonthlyFinancialSummary, RevenueStream, ExpenseItem } from '../types';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../services/local/db';
import { mockFinancials } from '../data/mock';

interface FinancialState {
  statement: ProfitLossStatement;

  // Actions
  fetchFinancials: () => void;
  updateMonthlyData: (month: string, updates: Partial<MonthlyFinancialSummary>) => void;
  addRevenueStream: (stream: Omit<RevenueStream, 'id'>) => void;
  addExpense: (expense: Omit<ExpenseItem, 'id'>) => void;
  deleteExpense: (id: string) => void;
  deleteRevenueStream: (id: string) => void;
}

export const useFinancialStore = create<FinancialState>((set, get) => ({
  statement: storage.getItem<ProfitLossStatement>(STORAGE_KEYS.FINANCIALS, mockFinancials),

  fetchFinancials: () => {
    const data = storage.getItem<ProfitLossStatement>(STORAGE_KEYS.FINANCIALS, mockFinancials);
    set({ statement: data });
  },

  updateMonthlyData: (month: string, updates: Partial<MonthlyFinancialSummary>) => {
    const current = get().statement;
    const updatedMonthly = current.monthlyBreakdown.map((m: MonthlyFinancialSummary) =>
      m.month === month ? { ...m, ...updates } : m
    );

    const totalRev = updatedMonthly.reduce((sum: number, m: MonthlyFinancialSummary) => sum + m.grossRevenue, 0);
    const totalExp = updatedMonthly.reduce((sum: number, m: MonthlyFinancialSummary) => sum + m.totalExpenses, 0);
    const netProf = totalRev - totalExp;
    const netMargin = totalRev > 0 ? (netProf / totalRev) * 100 : 0;

    const newStatement: ProfitLossStatement = {
      ...current,
      totalAnnualRevenue: totalRev,
      totalAnnualExpenses: totalExp,
      netAnnualProfit: netProf,
      netAnnualMargin: Math.round(netMargin * 100) / 100,
      monthlyBreakdown: updatedMonthly,
    };

    storage.setItem(STORAGE_KEYS.FINANCIALS, newStatement);
    set({ statement: newStatement });
  },

  addRevenueStream: (stream: Omit<RevenueStream, 'id'>) => {
    const current = get().statement;
    const newStream: RevenueStream = {
      id: `rev-${Date.now()}`,
      ...stream,
    };
    const updated = {
      ...current,
      revenueStreams: [...current.revenueStreams, newStream],
    };
    storage.setItem(STORAGE_KEYS.FINANCIALS, updated);
    set({ statement: updated });
  },

  addExpense: (expense: Omit<ExpenseItem, 'id'>) => {
    const current = get().statement;
    const newExpense: ExpenseItem = {
      id: `exp-${Date.now()}`,
      ...expense,
    };
    const updated = {
      ...current,
      expenses: [...current.expenses, newExpense],
    };
    storage.setItem(STORAGE_KEYS.FINANCIALS, updated);
    set({ statement: updated });
  },

  deleteExpense: (id: string) => {
    const current = get().statement;
    const updated = {
      ...current,
      expenses: current.expenses.filter((e: ExpenseItem) => e.id !== id),
    };
    storage.setItem(STORAGE_KEYS.FINANCIALS, updated);
    set({ statement: updated });
  },

  deleteRevenueStream: (id: string) => {
    const current = get().statement;
    const updated = {
      ...current,
      revenueStreams: current.revenueStreams.filter((s: RevenueStream) => s.id !== id),
    };
    storage.setItem(STORAGE_KEYS.FINANCIALS, updated);
    set({ statement: updated });
  },
}));
