import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Plus,
  Download,
  Upload,
  Trash2,
  Edit,
  Eye,
  RefreshCw,
  Activity,
  Heart,
} from 'lucide-react';
import { useCustomerStore, useNotificationStore } from '../../store';
import { DataTable, ColumnDef } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Modal } from '../../components/ui/Modal';
import { Customer, CustomerStatus, CustomerTier, IndustryType } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { parseCSV } from '../../utils/csv';

export const CustomerListPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    customers,
    filters,
    sort,
    page,
    pageSize,
    selectedCustomerIds,
    setFilters,
    resetFilters,
    setSort,
    setPage,
    setPageSize,
    toggleSelectCustomer,
    selectAllCustomers,
    deleteCustomer,
    bulkDeleteCustomers,
    exportCustomersCSV,
    importCustomers,
  } = useCustomerStore();

  const showSuccess = useNotificationStore((s) => s.showSuccess);
  const showError = useNotificationStore((s) => s.showError);

  const [deleteDialogCust, setDeleteDialogCust] = useState<Customer | null>(null);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importFileText, setImportFileText] = useState('');
  const [importPreview, setImportPreview] = useState<any[]>([]);

  // Filtering & Sorting pipeline
  const filteredAndSortedCustomers = useMemo(() => {
    let result = [...customers];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      result = result.filter((c) => c.status === filters.status);
    }

    // Tier filter
    if (filters.tier !== 'all') {
      result = result.filter((c) => c.tier === filters.tier);
    }

    // Industry filter
    if (filters.industry !== 'all') {
      result = result.filter((c) => c.industry === filters.industry);
    }

    // Sorting
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
  }, [customers, filters, sort]);

  // Pagination
  const totalItems = filteredAndSortedCustomers.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedCustomers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredAndSortedCustomers.slice(start, start + pageSize);
  }, [filteredAndSortedCustomers, page, pageSize]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setImportFileText(text);
      const parsed = parseCSV(text);
      if (parsed.errors.length > 0) {
        showError(`CSV Parse errors: ${parsed.errors.join(', ')}`);
      }
      setImportPreview(parsed.data.slice(0, 5));
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    if (!importFileText) return;
    const parsed = parseCSV(importFileText);
    if (parsed.data.length === 0) {
      showError('No valid rows found in CSV');
      return;
    }

    const newCustomers = parsed.data.map((row: any) => ({
      name: row['Account Name'] || row.name || row.Company || 'New Enterprise Client',
      company: row.company || row.Company || 'Enterprise Org',
      email: row.email || row.Email || `client_${Date.now()}@example.com`,
      phone: row.phone || row.Phone || '+1 (555) 000-0000',
      industry: (row.industry as IndustryType) || 'Software & Technology',
      tier: (row.tier as CustomerTier) || 'Enterprise',
      status: (row.status as CustomerStatus) || 'active',
      healthScore: Number(row.healthScore || row['Health Score'] || 85),
      relationshipScore: 80,
      ownerId: 'usr_sales',
      ownerName: 'Sarah Chen',
      companySize: '201-500' as const,
      lifetimeValue: Number(row.lifetimeValue || row['Lifetime Value'] || 100000),
      openDealsCount: 0,
      totalDealsValue: 0,
      pendingTasksCount: 0,
      tags: ['Imported Account'],
      lastContactedAt: new Date().toISOString(),
    }));

    importCustomers(newCustomers);
    showSuccess(`Imported ${newCustomers.length} customer accounts!`);
    setIsImportModalOpen(false);
    setImportFileText('');
    setImportPreview([]);
  };

  const getStatusBadge = (status: CustomerStatus) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" dot>Active</Badge>;
      case 'onboarding':
        return <Badge variant="info" dot>Onboarding</Badge>;
      case 'churn_risk':
        return <Badge variant="danger" dot>Churn Risk</Badge>;
      case 'dormant':
        return <Badge variant="neutral" dot>Dormant</Badge>;
      case 'churned':
        return <Badge variant="danger">Churned</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getTierBadge = (tier: CustomerTier) => {
    switch (tier) {
      case 'Enterprise':
        return <Badge variant="purple">Enterprise</Badge>;
      case 'Mid-Market':
        return <Badge variant="primary">Mid-Market</Badge>;
      case 'Growth':
        return <Badge variant="success">Growth</Badge>;
      default:
        return <Badge variant="neutral">Starter</Badge>;
    }
  };

  const columns: ColumnDef<Customer>[] = [
    {
      id: 'name',
      header: 'Customer Account',
      sortable: true,
      render: (c) => (
        <div className="flex items-center gap-3">
          <Avatar name={c.name} size="sm" />
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 dark:text-slate-100 hover:text-forest-800 dark:hover:text-peach-400 cursor-pointer">
              {c.name}
            </p>
            <p className="text-[11px] text-slate-400 truncate">{c.company}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'tier',
      header: 'Tier',
      sortable: true,
      render: (c) => getTierBadge(c.tier),
    },
    {
      id: 'status',
      header: 'Status',
      sortable: true,
      render: (c) => getStatusBadge(c.status),
    },
    {
      id: 'healthScore',
      header: 'Health Score',
      sortable: true,
      align: 'center',
      render: (c) => (
        <div className="inline-flex items-center gap-1.5 font-bold">
          <Heart
            className={`w-3.5 h-3.5 ${
              c.healthScore >= 80
                ? 'text-emerald-500 fill-emerald-500'
                : c.healthScore >= 60
                ? 'text-amber-500 fill-amber-500'
                : 'text-rose-500 fill-rose-500'
            }`}
          />
          <span
            className={
              c.healthScore >= 80
                ? 'text-emerald-600 dark:text-emerald-400'
                : c.healthScore >= 60
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-rose-600 dark:text-rose-400'
            }
          >
            {c.healthScore}%
          </span>
        </div>
      ),
    },
    {
      id: 'industry',
      header: 'Industry',
      sortable: true,
      render: (c) => (
        <span className="text-xs text-slate-600 dark:text-slate-300 truncate">{c.industry}</span>
      ),
    },
    {
      id: 'lifetimeValue',
      header: 'Lifetime Value',
      sortable: true,
      align: 'right',
      render: (c) => (
        <span className="font-semibold text-slate-900 dark:text-slate-100">
          {formatCurrency(c.lifetimeValue)}
        </span>
      ),
    },
    {
      id: 'ownerName',
      header: 'Account Owner',
      render: (c) => (
        <div className="flex items-center gap-2">
          <Avatar src={c.ownerAvatar} name={c.ownerName} size="xs" />
          <span className="text-xs text-slate-600 dark:text-slate-300 truncate">{c.ownerName}</span>
        </div>
      ),
    },
    {
      id: 'lastContactedAt',
      header: 'Last Contact',
      sortable: true,
      render: (c) => (
        <span className="text-xs text-slate-400">{formatDate(c.lastContactedAt, 'relative')}</span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      align: 'right',
      render: (c) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => navigate(`/customers/${c.id}`)}
            title="Customer 360 View"
          >
            <Eye className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => navigate(`/customers/${c.id}/edit`)}
            title="Edit Customer"
          >
            <Edit className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className="text-rose-500 hover:text-rose-700"
            onClick={() => setDeleteDialogCust(c)}
            title="Delete Customer"
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
            <Building2 className="w-6 h-6 text-forest-700" />
            <span>Customers & Accounts</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage enterprise accounts, monitor 360 customer health, and drive retention.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsImportModalOpen(true)}
            leftIcon={<Upload className="w-3.5 h-3.5" />}
          >
            Import CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportCustomersCSV}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/customers/new')}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Customer
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          <select
            value={filters.tier}
            onChange={(e) => setFilters({ tier: e.target.value as any })}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-peach-500"
          >
            <option value="all">All Tiers</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Mid-Market">Mid-Market</option>
            <option value="Growth">Growth</option>
            <option value="Starter">Starter</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ status: e.target.value as any })}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-peach-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="onboarding">Onboarding</option>
            <option value="churn_risk">Churn Risk</option>
            <option value="dormant">Dormant</option>
          </select>

          <select
            value={filters.industry}
            onChange={(e) => setFilters({ industry: e.target.value as any })}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-peach-500"
          >
            <option value="all">All Industries</option>
            <option value="Software & Technology">Software & Technology</option>
            <option value="Healthcare & Life Sciences">Healthcare</option>
            <option value="Financial Services">Finance</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Retail & E-commerce">Retail</option>
          </select>

          {(filters.search || filters.tier !== 'all' || filters.status !== 'all' || filters.industry !== 'all') && (
            <Button variant="ghost" size="xs" onClick={resetFilters} leftIcon={<RefreshCw className="w-3 h-3" />}>
              Reset Filters
            </Button>
          )}
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing {filteredAndSortedCustomers.length} of {customers.length} accounts
        </div>
      </div>

      {/* Customer Data Table */}
      <DataTable
        data={paginatedCustomers}
        columns={columns}
        searchPlaceholder="Search customers by name, company, email..."
        searchValue={filters.search}
        onSearchChange={(val) => setFilters({ search: val })}
        sortField={sort.field}
        sortDirection={sort.direction}
        onSortChange={(field) => setSort(field as keyof Customer)}
        selectedIds={selectedCustomerIds}
        onToggleSelect={toggleSelectCustomer}
        onSelectAll={selectAllCustomers}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onRowClick={(cust) => navigate(`/customers/${cust.id}`)}
        emptyTitle="No customers found"
        emptyDescription="Convert leads or add new customer accounts to start building your relationship base."
        emptyActionLabel="Add Customer"
        onEmptyAction={() => navigate('/customers/new')}
        bulkActions={
          <div className="flex items-center gap-2">
            <Button
              variant="danger"
              size="xs"
              onClick={() => setIsBulkDeleteOpen(true)}
              leftIcon={<Trash2 className="w-3 h-3" />}
            >
              Delete Selected ({selectedCustomerIds.length})
            </Button>
          </div>
        }
      />

      {/* Delete Single Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteDialogCust}
        onClose={() => setDeleteDialogCust(null)}
        onConfirm={() => {
          if (deleteDialogCust) {
            deleteCustomer(deleteDialogCust.id);
            showSuccess(`Customer "${deleteDialogCust.name}" removed`);
            setDeleteDialogCust(null);
          }
        }}
        title="Delete Customer Account"
        message={`Are you sure you want to delete "${deleteDialogCust?.name}"? All associated metrics will be detached.`}
        confirmLabel="Delete Account"
        variant="danger"
      />

      {/* Bulk Delete Confirmation */}
      <ConfirmDialog
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        onConfirm={() => {
          bulkDeleteCustomers(selectedCustomerIds);
          showSuccess(`Deleted ${selectedCustomerIds.length} customer accounts.`);
          setIsBulkDeleteOpen(false);
        }}
        title="Delete Selected Accounts"
        message={`Are you sure you want to permanently delete ${selectedCustomerIds.length} customer accounts?`}
        confirmLabel="Delete All"
        variant="danger"
      />

      {/* Import Modal */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => {
          setIsImportModalOpen(false);
          setImportFileText('');
          setImportPreview([]);
        }}
        title="Import Customer Accounts from CSV"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-500">
            Select a CSV file containing customer records. Expected headers: <code>Account Name, Company, Email, Phone, Industry, Tier, Status, Lifetime Value</code>.
          </p>

          <input
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileUpload}
            className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-peach-100 file:text-forest-900 hover:file:bg-peach-200 cursor-pointer"
          />

          {importPreview.length > 0 && (
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs">
              <div className="bg-slate-50 dark:bg-slate-800 px-3 py-2 font-semibold">
                Preview (First 5 records)
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 p-2">
                {importPreview.map((row, idx) => (
                  <div key={idx} className="py-1 flex justify-between">
                    <span>{row['Account Name'] || row.name || row.Company}</span>
                    <span className="text-slate-400">{row.Industry || row.industry}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="outline"
              onClick={() => {
                setIsImportModalOpen(false);
                setImportFileText('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={!importFileText}
              onClick={handleConfirmImport}
            >
              Import Customers
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
