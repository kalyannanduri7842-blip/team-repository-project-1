import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Plus,
  Download,
  Upload,
  Trash2,
  Edit,
  Eye,
  RefreshCw,
  LayoutGrid,
} from 'lucide-react';
import { useDealStore, useNotificationStore } from '../../store';
import { DataTable, ColumnDef } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Deal, DealStage, DealPriority } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const DealListPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    deals,
    filters,
    sort,
    page,
    pageSize,
    selectedDealIds,
    setFilters,
    resetFilters,
    setSort,
    setPage,
    setPageSize,
    toggleSelectDeal,
    selectAllDeals,
    deleteDeal,
    bulkDeleteDeals,
    exportDealsCSV,
  } = useDealStore();

  const showSuccess = useNotificationStore((s) => s.showSuccess);
  const [deleteDialogDeal, setDeleteDialogDeal] = useState<Deal | null>(null);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);

  // Filter & Sort pipeline
  const filteredAndSortedDeals = useMemo(() => {
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

    if (filters.stage !== 'all') {
      result = result.filter((d) => d.stage === filters.stage);
    }

    if (filters.priority !== 'all') {
      result = result.filter((d) => d.priority === filters.priority);
    }

    if (filters.minAmount > 0) {
      result = result.filter((d) => d.amount >= filters.minAmount);
    }

    // Sort
    result.sort((a, b) => {
      const field = sort.field;
      const valA = a[field];
      const valB = b[field];

      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      let comparison = 0;
      if (typeof valA === 'number' && typeof valB === 'number') {
        comparison = valA - valB;
      } else {
        comparison = String(valA).localeCompare(String(valB));
      }

      return sort.direction === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [deals, filters, sort]);

  const totalItems = filteredAndSortedDeals.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedDeals = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredAndSortedDeals.slice(start, start + pageSize);
  }, [filteredAndSortedDeals, page, pageSize]);

  const getStageBadge = (stage: DealStage) => {
    switch (stage) {
      case 'new':
        return <Badge variant="primary">Discovery</Badge>;
      case 'qualified':
        return <Badge variant="purple">Qualified</Badge>;
      case 'proposal':
        return <Badge variant="warning">Proposal Sent</Badge>;
      case 'negotiation':
        return <Badge variant="info">Negotiation</Badge>;
      case 'won':
        return <Badge variant="success">Closed Won</Badge>;
      case 'lost':
        return <Badge variant="danger">Closed Lost</Badge>;
    }
  };

  const columns: ColumnDef<Deal>[] = [
    {
      id: 'title',
      header: 'Deal Opportunity',
      sortable: true,
      render: (d) => (
        <div className="min-w-0">
          <p className="font-semibold text-slate-900 dark:text-slate-100 hover:text-forest-800 dark:hover:text-peach-400 cursor-pointer truncate max-w-xs">
            {d.title}
          </p>
          <p className="text-[11px] text-slate-400 truncate">{d.customerName}</p>
        </div>
      ),
    },
    {
      id: 'amount',
      header: 'Amount',
      sortable: true,
      align: 'right',
      render: (d) => (
        <span className="font-bold text-slate-900 dark:text-slate-100">
          {formatCurrency(d.amount)}
        </span>
      ),
    },
    {
      id: 'stage',
      header: 'Stage',
      sortable: true,
      render: (d) => getStageBadge(d.stage),
    },
    {
      id: 'probability',
      header: 'Win Prob.',
      sortable: true,
      align: 'center',
      render: (d) => <span className="font-semibold text-slate-700 dark:text-slate-300">{d.probability}%</span>,
    },
    {
      id: 'weightedValue',
      header: 'Weighted Value',
      sortable: true,
      align: 'right',
      render: (d) => (
        <span className="text-xs font-semibold text-forest-800 dark:text-peach-400">
          {formatCurrency(d.weightedValue)}
        </span>
      ),
    },
    {
      id: 'priority',
      header: 'Priority',
      sortable: true,
      render: (d) => (
        <Badge
          variant={d.priority === 'urgent' ? 'danger' : d.priority === 'high' ? 'warning' : 'default'}
          size="sm"
        >
          {d.priority}
        </Badge>
      ),
    },
    {
      id: 'expectedCloseDate',
      header: 'Target Close',
      sortable: true,
      render: (d) => <span className="text-xs text-slate-500">{d.expectedCloseDate}</span>,
    },
    {
      id: 'ownerName',
      header: 'Owner',
      render: (d) => (
        <div className="flex items-center gap-2">
          <Avatar src={d.ownerAvatar} name={d.ownerName} size="xs" />
          <span className="text-xs text-slate-600 dark:text-slate-300 truncate">{d.ownerName}</span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      align: 'right',
      render: (d) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => navigate(`/deals/${d.id}`)}
            title="View Deal"
          >
            <Eye className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => navigate(`/deals/${d.id}/edit`)}
            title="Edit Deal"
          >
            <Edit className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className="text-rose-500 hover:text-rose-700"
            onClick={() => setDeleteDialogDeal(d)}
            title="Delete Deal"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-forest-700" />
            <span>Deals & Opportunities</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tabular list view of all commercial opportunities and weighted pipeline metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/deals/kanban')}
            leftIcon={<LayoutGrid className="w-3.5 h-3.5" />}
          >
            Kanban View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportDealsCSV}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/deals/new')}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create Deal
          </Button>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          <select
            value={filters.stage}
            onChange={(e) => setFilters({ stage: e.target.value as any })}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-peach-500"
          >
            <option value="all">All Stages</option>
            <option value="new">Discovery</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal Sent</option>
            <option value="negotiation">Negotiation</option>
            <option value="won">Closed Won</option>
            <option value="lost">Closed Lost</option>
          </select>

          <select
            value={filters.priority}
            onChange={(e) => setFilters({ priority: e.target.value as any })}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-peach-500"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {(filters.search || filters.stage !== 'all' || filters.priority !== 'all') && (
            <Button variant="ghost" size="xs" onClick={resetFilters} leftIcon={<RefreshCw className="w-3 h-3" />}>
              Reset Filters
            </Button>
          )}
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing {filteredAndSortedDeals.length} of {deals.length} deals
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={paginatedDeals}
        columns={columns}
        searchPlaceholder="Search deals by title, customer..."
        searchValue={filters.search}
        onSearchChange={(val) => setFilters({ search: val })}
        sortField={sort.field}
        sortDirection={sort.direction}
        onSortChange={(field) => setSort(field as keyof Deal)}
        selectedIds={selectedDealIds}
        onToggleSelect={toggleSelectDeal}
        onSelectAll={selectAllDeals}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onRowClick={(deal) => navigate(`/deals/${deal.id}`)}
        emptyTitle="No deals found"
        emptyDescription="Create your first deal to start forecasting revenue."
        emptyActionLabel="Create Deal"
        onEmptyAction={() => navigate('/deals/new')}
        bulkActions={
          <div className="flex items-center gap-2">
            <Button
              variant="danger"
              size="xs"
              onClick={() => setIsBulkDeleteOpen(true)}
              leftIcon={<Trash2 className="w-3 h-3" />}
            >
              Delete Selected ({selectedDealIds.length})
            </Button>
          </div>
        }
      />

      {/* Delete Single Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteDialogDeal}
        onClose={() => setDeleteDialogDeal(null)}
        onConfirm={() => {
          if (deleteDialogDeal) {
            deleteDeal(deleteDialogDeal.id);
            showSuccess(`Deal "${deleteDialogDeal.title}" deleted`);
            setDeleteDialogDeal(null);
          }
        }}
        title="Delete Deal"
        message={`Are you sure you want to delete "${deleteDialogDeal?.title}"?`}
        confirmLabel="Delete Deal"
        variant="danger"
      />

      {/* Bulk Delete Confirmation */}
      <ConfirmDialog
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        onConfirm={() => {
          bulkDeleteDeals(selectedDealIds);
          showSuccess(`Deleted ${selectedDealIds.length} deals.`);
          setIsBulkDeleteOpen(false);
        }}
        title="Delete Selected Deals"
        message={`Are you sure you want to delete ${selectedDealIds.length} selected deals?`}
        confirmLabel="Delete All"
        variant="danger"
      />
    </div>
  );
};
