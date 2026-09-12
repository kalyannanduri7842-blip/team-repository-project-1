import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Plus,
  Filter,
  DollarSign,
  Calendar,
  Layers,
  ArrowRight,
  MoreVertical,
  CheckCircle,
  XCircle,
  Table as TableIcon,
} from 'lucide-react';
import { useDealStore, useNotificationStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Deal, DealStage, DEAL_STAGES } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const DealKanbanPage: React.FC = () => {
  const navigate = useNavigate();
  const { deals, updateDealStage, filters, setFilters, resetFilters } = useDealStore();
  const showSuccess = useNotificationStore((s) => s.showSuccess);

  // Drag state
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<DealStage | null>(null);

  // Filters
  const filteredDeals = useMemo(() => {
    let result = [...deals];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.customerName.toLowerCase().includes(q) ||
          d.customerCompany.toLowerCase().includes(q)
      );
    }
    if (filters.priority !== 'all') {
      result = result.filter((d) => d.priority === filters.priority);
    }
    if (filters.minAmount > 0) {
      result = result.filter((d) => d.amount >= filters.minAmount);
    }
    return result;
  }, [deals, filters]);

  // Total Pipeline Metrics
  const totalOpenValue = filteredDeals
    .filter((d) => d.stage !== 'won' && d.stage !== 'lost')
    .reduce((sum, d) => sum + d.amount, 0);

  const totalWeightedValue = filteredDeals
    .filter((d) => d.stage !== 'won' && d.stage !== 'lost')
    .reduce((sum, d) => sum + d.weightedValue, 0);

  // Drag & Drop Handlers
  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    e.dataTransfer.setData('text/plain', dealId);
    setDraggedDealId(dealId);
  };

  const handleDragOver = (e: React.DragEvent, stageId: DealStage) => {
    e.preventDefault();
    setDragOverStage(stageId);
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = (e: React.DragEvent, targetStage: DealStage) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData('text/plain') || draggedDealId;
    if (dealId) {
      updateDealStage(dealId, targetStage);
      showSuccess(`Deal moved to ${targetStage.toUpperCase()}`);
    }
    setDraggedDealId(null);
    setDragOverStage(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-peach-50 flex items-center gap-2.5">
              <Briefcase className="w-6 h-6 text-forest-800 dark:text-peach-400" />
              <span>Sales Pipeline Kanban</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-peach-200/70 mt-1">
            Drag and drop deals across pipeline stages. Win probability & forecast adjust dynamically.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/deals/list')}
            leftIcon={<TableIcon className="w-3.5 h-3.5 text-forest-800 dark:text-peach-400" />}
            className="border-peach-300 dark:border-forest-700 hover:bg-peach-100 dark:hover:bg-forest-800"
          >
            Table View
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/deals/new')}
            leftIcon={<Plus className="w-4 h-4" />}
            className="bg-forest-900 hover:bg-forest-850 text-peach-100 border border-peach-400/30"
          >
            Create Deal
          </Button>
        </div>
      </div>

      {/* Pipeline Summary Bar */}
      <div className="bg-[#fffbf8] dark:bg-[#062016] border border-[#fed7aa]/80 dark:border-[#0e3526] rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6 text-xs">
          <div>
            <span className="text-slate-500 dark:text-peach-300/70 uppercase tracking-wider text-[10px] font-bold block">
              Active Pipeline
            </span>
            <span className="text-lg font-black text-slate-900 dark:text-peach-50">
              {formatCurrency(totalOpenValue)}
            </span>
          </div>

          <div className="w-px h-8 bg-[#fed7aa] dark:bg-[#0e3526] hidden sm:block" />

          <div>
            <span className="text-slate-500 dark:text-peach-300/70 uppercase tracking-wider text-[10px] font-bold block">
              Weighted Forecast
            </span>
            <span className="text-lg font-black text-forest-800 dark:text-peach-300">
              {formatCurrency(totalWeightedValue)}
            </span>
          </div>

          <div className="w-px h-8 bg-[#fed7aa] dark:bg-[#0e3526] hidden sm:block" />

          <div>
            <span className="text-slate-500 dark:text-peach-300/70 uppercase tracking-wider text-[10px] font-bold block">
              Total Deals
            </span>
            <span className="text-lg font-black text-slate-900 dark:text-peach-50">
              {filteredDeals.length}
            </span>
          </div>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-2">
          <select
            value={filters.priority}
            onChange={(e) => setFilters({ priority: e.target.value as any })}
            className="bg-[#ffeedd] dark:bg-[#0b261c] border border-[#fed7aa] dark:border-[#164e37] rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-peach-100 focus:outline-none focus:ring-1 focus:ring-peach-500"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Kanban Stages Grid */}
      <div className="flex gap-4 overflow-x-auto pb-4 min-h-[600px] items-start">
        {DEAL_STAGES.map((stage) => {
          const stageDeals = filteredDeals.filter((d) => d.stage === stage.id);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.amount, 0);
          const isTargeted = dragOverStage === stage.id;

          return (
            <div
              key={stage.id}
              onDragOver={(e) => handleDragOver(e, stage.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage.id)}
              className={`w-72 sm:w-80 shrink-0 bg-[#ffeedd]/50 dark:bg-[#081f16]/70 border rounded-3xl p-3 flex flex-col transition-all duration-200 ${
                isTargeted
                  ? 'border-peach-500 bg-peach-100/60 dark:bg-forest-900/60 ring-2 ring-peach-400/40 shadow-glow-sm'
                  : 'border-[#fed7aa] dark:border-[#0e3526]'
              }`}
            >
              {/* Column Header */}
              <div className="p-2 mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <h3 className="text-xs font-bold text-slate-900 dark:text-peach-100 uppercase tracking-wider">
                    {stage.label}
                  </h3>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#fffbf8] dark:bg-[#0b261c] text-slate-700 dark:text-peach-200 border border-[#fed7aa] dark:border-[#164e37]">
                    {stageDeals.length}
                  </span>
                </div>

                <span className="text-[11px] font-semibold text-slate-600 dark:text-peach-300">
                  {formatCurrency(stageTotal)}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-3 overflow-y-auto flex-1 max-h-[calc(100vh-280px)] pr-0.5">
                {stageDeals.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl border border-dashed border-[#fed7aa] dark:border-[#164e37] text-[11px] text-slate-400 dark:text-peach-300/50">
                    Drop deals here
                  </div>
                ) : (
                  stageDeals.map((deal) => {
                    const isDragging = draggedDealId === deal.id;

                    return (
                      <div
                        key={deal.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, deal.id)}
                        onClick={() => navigate(`/deals/${deal.id}`)}
                        className={`p-4 rounded-2xl bg-[#fffbf8] dark:bg-[#0b261c] border border-[#fed7aa] dark:border-[#164e37] shadow-xs hover:shadow-md hover:border-peach-500/70 cursor-grab active:cursor-grabbing transition-all ${
                          isDragging ? 'opacity-40 scale-95' : 'opacity-100'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <Badge
                            variant={
                              deal.priority === 'urgent'
                                ? 'danger'
                                : deal.priority === 'high'
                                ? 'warning'
                                : 'default'
                            }
                            size="sm"
                          >
                            {deal.priority}
                          </Badge>
                          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400">
                            {deal.probability}% win
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-slate-900 dark:text-cream-50 hover:text-emerald-700 dark:hover:text-emerald-400 line-clamp-2 leading-snug mb-1">
                          {deal.title}
                        </h4>

                        <p className="text-[11px] text-slate-500 dark:text-cream-300/70 truncate mb-3">
                          {deal.customerName}
                        </p>

                        <div className="pt-2 border-t border-[#ded7ca]/60 dark:border-[#1c3629] flex items-center justify-between">
                          <span className="text-sm font-black text-slate-900 dark:text-cream-50">
                            {formatCurrency(deal.amount)}
                          </span>
                          <Avatar src={deal.ownerAvatar} name={deal.ownerName} size="xs" />
                        </div>

                        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-dashed border-[#ded7ca]/40 dark:border-[#1c3629]/60 text-[10px] text-slate-500 dark:text-cream-300/70">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
                            <span>Close: {deal.expectedCloseDate}</span>
                          </div>

                          {/* Quick Stage Move Dropdown for direct click interactions */}
                          <select
                            value={deal.stage}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              e.stopPropagation();
                              updateDealStage(deal.id, e.target.value as DealStage);
                              showSuccess(`Stage updated to ${e.target.value.toUpperCase()}`);
                            }}
                            className="text-[9px] font-semibold bg-[#f4ede0] dark:bg-[#0c1913] border border-[#ded7ca] dark:border-[#1c3629] rounded px-1.5 py-0.5 text-slate-800 dark:text-cream-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          >
                            {DEAL_STAGES.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
