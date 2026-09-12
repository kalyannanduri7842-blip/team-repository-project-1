import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart as PieIcon,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Trash2,
  Edit2,
  FileText,
  Download,
  ShieldAlert,
  Percent,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useFinancialStore, useAuthStore } from '../../store';
import { formatCurrency, formatCompactNumber } from '../../utils/formatters';
import { Button, Badge, Modal, StatCard } from '../../components/ui';

export const FinancialsPage: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const { statement, updateMonthlyData, addExpense, addRevenueStream, deleteExpense, deleteRevenueStream } =
    useFinancialStore();

  const [editMonthModal, setEditMonthModal] = useState<{
    isOpen: boolean;
    month: string;
    grossRevenue: number;
    totalExpenses: number;
    targetRevenue: number;
  }>({
    isOpen: false,
    month: '',
    grossRevenue: 0,
    totalExpenses: 0,
    targetRevenue: 0,
  });

  const [addExpenseModal, setAddExpenseModal] = useState({
    isOpen: false,
    name: '',
    category: 'salaries_wages' as any,
    amount: 10000,
  });

  const [addRevenueModal, setAddRevenueModal] = useState({
    isOpen: false,
    name: '',
    category: 'recurring_saas' as any,
    amount: 25000,
  });

  const handleSaveMonth = (e: React.FormEvent) => {
    e.preventDefault();
    const netProf = editMonthModal.grossRevenue - editMonthModal.totalExpenses;
    const margin = editMonthModal.grossRevenue > 0 ? (netProf / editMonthModal.grossRevenue) * 100 : 0;

    updateMonthlyData(editMonthModal.month, {
      grossRevenue: editMonthModal.grossRevenue,
      totalExpenses: editMonthModal.totalExpenses,
      grossProfit: netProf,
      netProfit: netProf,
      netMarginPercentage: Math.round(margin * 10) / 10,
      targetRevenue: editMonthModal.targetRevenue,
    });

    setEditMonthModal({ isOpen: false, month: '', grossRevenue: 0, totalExpenses: 0, targetRevenue: 0 });
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addExpenseModal.name) return;
    addExpense({
      name: addExpenseModal.name,
      category: addExpenseModal.category,
      amount: addExpenseModal.amount,
      isRecurring: true,
    });
    setAddExpenseModal({ isOpen: false, name: '', category: 'salaries_wages', amount: 10000 });
  };

  const handleCreateRevenue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addRevenueModal.name) return;
    addRevenueStream({
      name: addRevenueModal.name,
      category: addRevenueModal.category,
      amount: addRevenueModal.amount,
      growthPercentage: 15,
    });
    setAddRevenueModal({ isOpen: false, name: '', category: 'recurring_saas', amount: 25000 });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white/90 dark:bg-forest-900/90 backdrop-blur-md border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-forest-900 text-peach-100 dark:bg-forest-850 dark:text-peach-50 border border-peach-400/40 shadow-xs">
            <DollarSign className="w-6 h-6 text-peach-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-peach-50">
                Financial P&L Executive Command
              </h1>
              <Badge variant="primary" size="sm">
                FY {statement.fiscalYear} Audit
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-peach-200/70">
              Monthly & yearly income statements, operational expenses, profit & loss analysis, and net margins.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export Financial PDF
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setAddRevenueModal({ ...addRevenueModal, isOpen: true })}
            leftIcon={<Plus className="w-4 h-4" />}
            className="bg-forest-900 hover:bg-forest-850 text-peach-100 border border-peach-400/30 shadow-sm"
          >
            Add Revenue Stream
          </Button>
        </div>
      </div>

      {/* 4 Big Executive Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white/95 dark:bg-forest-900/90 border border-peach-200/70 dark:border-forest-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-peach-300/80 uppercase font-mono">
              Total Annual Revenue
            </span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-peach-50 mt-2">
            {formatCurrency(statement.totalAnnualRevenue)}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+24.8% vs last fiscal year</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white/95 dark:bg-forest-900/90 border border-peach-200/70 dark:border-forest-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-peach-300/80 uppercase font-mono">
              Total Annual Expenses
            </span>
            <TrendingDown className="w-5 h-5 text-rose-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-peach-50 mt-2">
            {formatCurrency(statement.totalAnnualExpenses)}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-peach-300/60 mt-1">
            <span>Operating cost & payroll overheads</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase font-mono">
              Net Annual Profit (P&L)
            </span>
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-peach-50 mt-2">
            {formatCurrency(statement.netAnnualProfit)}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 font-bold mt-1">
            <Percent className="w-3.5 h-3.5" />
            <span>{statement.netAnnualMargin}% Net Profit Margin</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-peach-500/15 border border-peach-400/40 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-forest-800 dark:text-peach-200 uppercase font-mono">
              Monthly Avg Run-Rate
            </span>
            <Layers className="w-5 h-5 text-forest-700 dark:text-peach-300" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-peach-50 mt-2">
            {formatCurrency(Math.round(statement.totalAnnualRevenue / 12))}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-forest-700 dark:text-peach-300/90 font-bold mt-1">
            <span>Positive Cashflow Trajectory</span>
          </div>
        </div>
      </div>

      {/* Monthly Financial Performance Area Chart */}
      <div className="bg-white/95 dark:bg-forest-900/90 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-peach-50">
              Monthly Income, Expenses & Net Profit Trend
            </h3>
            <p className="text-xs text-slate-500 dark:text-peach-200/70">
              Comparing actual gross realization against operating expense lines and target forecasts
            </p>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={statement.monthlyBreakdown}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#047857" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#047857" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tickFormatter={(val) => formatCompactNumber(val)} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
              <Legend />
              <Area type="monotone" dataKey="grossRevenue" name="Gross Revenue" stroke="#047857" strokeWidth={2.5} fill="url(#revenueGrad)" />
              <Area type="monotone" dataKey="netProfit" name="Net Profit" stroke="#f97316" strokeWidth={2} fill="url(#profitGrad)" />
              <Line type="monotone" dataKey="totalExpenses" name="Operating Expenses" stroke="#e11d48" strokeWidth={2} dot={{ r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2-Column: Revenue Streams vs Operating Expenses Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Streams Table */}
        <div className="bg-white/95 dark:bg-forest-900/90 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-peach-50">Revenue Streams Breakdown</h3>
                <p className="text-xs text-slate-500 dark:text-peach-200/70">Diversified annual recurring income</p>
              </div>
              <Button
                size="xs"
                variant="outline"
                leftIcon={<Plus className="w-3.5 h-3.5" />}
                onClick={() => setAddRevenueModal({ ...addRevenueModal, isOpen: true })}
              >
                Add Stream
              </Button>
            </div>

            <div className="space-y-3">
              {statement.revenueStreams.map((stream) => (
                <div
                  key={stream.id}
                  className="p-3.5 rounded-2xl bg-peach-50/60 dark:bg-forest-950/60 border border-peach-200/60 dark:border-forest-800 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-peach-50">{stream.name}</p>
                    <span className="text-[10px] text-emerald-600 font-bold">
                      +{stream.growthPercentage}% annual expansion
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-extrabold text-forest-800 dark:text-emerald-400">
                      {formatCurrency(stream.amount)}
                    </span>
                    <button
                      onClick={() => deleteRevenueStream(stream.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Delete stream"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Operating Expenses Table */}
        <div className="bg-white/95 dark:bg-forest-900/90 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-peach-50">Operating Expenses & COGS</h3>
                <p className="text-xs text-slate-500 dark:text-peach-200/70">Payroll, infrastructure, marketing, & overhead</p>
              </div>
              <Button
                size="xs"
                variant="outline"
                leftIcon={<Plus className="w-3.5 h-3.5" />}
                onClick={() => setAddExpenseModal({ ...addExpenseModal, isOpen: true })}
              >
                Add Expense
              </Button>
            </div>

            <div className="space-y-3">
              {statement.expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-peach-50">{expense.name}</p>
                    <span className="text-[10px] text-slate-400 capitalize">
                      {expense.category.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-extrabold text-rose-700 dark:text-rose-300">
                      {formatCurrency(expense.amount)}
                    </span>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Delete expense"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Audit Table with 1-Click Target Editor */}
      <div className="bg-white/95 dark:bg-forest-900/90 border border-peach-200/70 dark:border-forest-800 rounded-3xl p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-peach-50 mb-1">
          Monthly P&L Statement & Target Breakdown
        </h3>
        <p className="text-xs text-slate-500 dark:text-peach-200/70 mb-4">
          Click the edit icon on any month to adjust actual/target numbers in real time
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-peach-50/80 dark:bg-forest-950/80 text-slate-500 dark:text-peach-300/80 font-mono uppercase text-[10px] border-b border-peach-200/60 dark:border-forest-800">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Month</th>
                <th className="py-3 px-4">Gross Revenue</th>
                <th className="py-3 px-4">Expenses</th>
                <th className="py-3 px-4">Net Profit</th>
                <th className="py-3 px-4">Margin %</th>
                <th className="py-3 px-4">Target Revenue</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-peach-100 dark:divide-forest-800/60">
              {statement.monthlyBreakdown.map((m) => (
                <tr key={m.month} className="hover:bg-peach-50/40 dark:hover:bg-forest-850/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-peach-100">{m.month}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700 dark:text-emerald-400">
                    {formatCurrency(m.grossRevenue)}
                  </td>
                  <td className="py-3 px-4 text-rose-600 dark:text-rose-400">{formatCurrency(m.totalExpenses)}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-peach-50">
                    {formatCurrency(m.netProfit)}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-forest-800 dark:text-peach-300">
                    {m.netMarginPercentage}%
                  </td>
                  <td className="py-3 px-4 text-slate-400">{formatCurrency(m.targetRevenue)}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() =>
                        setEditMonthModal({
                          isOpen: true,
                          month: m.month,
                          grossRevenue: m.grossRevenue,
                          totalExpenses: m.totalExpenses,
                          targetRevenue: m.targetRevenue,
                        })
                      }
                      className="p-1.5 rounded-lg text-slate-400 hover:text-forest-900 hover:bg-peach-100 dark:hover:bg-forest-800 transition-colors"
                      title={`Edit ${m.month}`}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Month Target Modal */}
      <Modal
        isOpen={editMonthModal.isOpen}
        onClose={() => setEditMonthModal({ ...editMonthModal, isOpen: false })}
        title={`Adjust Financial Figures: ${editMonthModal.month}`}
      >
        <form onSubmit={handleSaveMonth} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">
              Gross Monthly Income ($)
            </label>
            <input
              type="number"
              value={editMonthModal.grossRevenue}
              onChange={(e) => setEditMonthModal({ ...editMonthModal, grossRevenue: Number(e.target.value) })}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">
              Monthly Operating Expenses ($)
            </label>
            <input
              type="number"
              value={editMonthModal.totalExpenses}
              onChange={(e) => setEditMonthModal({ ...editMonthModal, totalExpenses: Number(e.target.value) })}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">
              Target Revenue Goal ($)
            </label>
            <input
              type="number"
              value={editMonthModal.targetRevenue}
              onChange={(e) => setEditMonthModal({ ...editMonthModal, targetRevenue: Number(e.target.value) })}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button size="sm" variant="outline" type="button" onClick={() => setEditMonthModal({ ...editMonthModal, isOpen: false })}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" type="submit">
              Save Monthly Numbers
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Expense Modal */}
      <Modal
        isOpen={addExpenseModal.isOpen}
        onClose={() => setAddExpenseModal({ ...addExpenseModal, isOpen: false })}
        title="Add Operating Expense Line"
      >
        <form onSubmit={handleCreateExpense} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">Expense Name *</label>
            <input
              type="text"
              required
              value={addExpenseModal.name}
              onChange={(e) => setAddExpenseModal({ ...addExpenseModal, name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              placeholder="e.g. Sales Commission Pool Q3"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">Category</label>
              <select
                value={addExpenseModal.category}
                onChange={(e) => setAddExpenseModal({ ...addExpenseModal, category: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              >
                <option value="salaries_wages">Salaries & Wages</option>
                <option value="sales_commissions">Sales Commissions</option>
                <option value="cloud_infrastructure">Cloud Infra</option>
                <option value="marketing_advertising">Marketing & Ads</option>
                <option value="saas_tools">SaaS Tools</option>
                <option value="office_operations">Operations & Legal</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">Amount ($)</label>
              <input
                type="number"
                value={addExpenseModal.amount}
                onChange={(e) => setAddExpenseModal({ ...addExpenseModal, amount: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button size="sm" variant="outline" type="button" onClick={() => setAddExpenseModal({ ...addExpenseModal, isOpen: false })}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" type="submit">
              Add Expense Line
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Revenue Stream Modal */}
      <Modal
        isOpen={addRevenueModal.isOpen}
        onClose={() => setAddRevenueModal({ ...addRevenueModal, isOpen: false })}
        title="Add New Revenue Stream"
      >
        <form onSubmit={handleCreateRevenue} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">Stream Name *</label>
            <input
              type="text"
              required
              value={addRevenueModal.name}
              onChange={(e) => setAddRevenueModal({ ...addRevenueModal, name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              placeholder="e.g. AI Workflow Copilot Seats"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">Category</label>
              <select
                value={addRevenueModal.category}
                onChange={(e) => setAddRevenueModal({ ...addRevenueModal, category: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              >
                <option value="recurring_saas">Recurring SaaS</option>
                <option value="enterprise_license">Enterprise License</option>
                <option value="professional_services">Professional Services</option>
                <option value="add_ons">Add-ons</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-peach-200 mb-1">Annual Revenue ($)</label>
              <input
                type="number"
                value={addRevenueModal.amount}
                onChange={(e) => setAddRevenueModal({ ...addRevenueModal, amount: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-forest-950 border border-peach-200 dark:border-forest-800 text-slate-900 dark:text-peach-50"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button size="sm" variant="outline" type="button" onClick={() => setAddRevenueModal({ ...addRevenueModal, isOpen: false })}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" type="submit">
              Add Stream
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
