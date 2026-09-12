import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Plus,
  Download,
  Upload,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  Filter,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useLeadStore, useNotificationStore } from '../../store';
import { DataTable, ColumnDef } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Modal } from '../../components/ui/Modal';
import { LeadConversionModal } from './LeadConversionModal';
import { Lead, LeadStatus, LeadSource } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { parseCSV } from '../../utils/csv';

export const LeadListPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    leads,
    filters,
    sort,
    page,
    pageSize,
    selectedLeadIds,
    setFilters,
    resetFilters,
    setSort,
    setPage,
    setPageSize,
    toggleSelectLead,
    selectAllLeads,
    deleteLead,
    bulkDeleteLeads,
    bulkUpdateStatus,
    exportLeadsCSV,
    importLeads,
  } = useLeadStore();

  const showSuccess = useNotificationStore((s) => s.showSuccess);
  const showError = useNotificationStore((s) => s.showError);

  // Modals state
  const [conversionModalLead, setConversionModalLead] = useState<Lead | null>(null);
  const [deleteDialogLead, setDeleteDialogLead] = useState<Lead | null>(null);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importFileText, setImportFileText] = useState('');
  const [importPreview, setImportPreview] = useState<any[]>([]);

  // Filtering & Sorting pipeline
  const filteredAndSortedLeads = useMemo(() => {
    let result = [...leads];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (l) =>
          l.fullName.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.jobTitle.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      result = result.filter((l) => l.status === filters.status);
    }

    // Source filter
    if (filters.source !== 'all') {
      result = result.filter((l) => l.source === filters.source);
    }

    // Min Score
    if (filters.minScore > 0) {
      result = result.filter((l) => l.score >= filters.minScore);
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
  }, [leads, filters, sort]);

  // Pagination slice
  const totalItems = filteredAndSortedLeads.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedLeads = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredAndSortedLeads.slice(start, start + pageSize);
  }, [filteredAndSortedLeads, page, pageSize]);

  // Handle CSV file upload
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

    const newLeads = parsed.data.map((row: any) => ({
      firstName: row['First Name'] || row.fullName?.split(' ')[0] || row['Full Name']?.split(' ')[0] || 'Inbound',
      lastName: row['Last Name'] || row.fullName?.split(' ')[1] || row['Full Name']?.split(' ')[1] || 'Lead',
      fullName: row['Full Name'] || row.fullName || `${row['First Name'] || ''} ${row['Last Name'] || ''}`.trim() || 'New Lead',
      email: row.email || row.Email || `contact_${Date.now()}@example.com`,
      phone: row.phone || row.Phone || '+1 (555) 000-0000',
      company: row.company || row.Company || 'Enterprise Lead',
      jobTitle: row.jobTitle || row['Job Title'] || 'Prospect',
      source: (row.source as LeadSource) || 'website',
      status: (row.status as LeadStatus) || 'new',
      score: Number(row.score || row.Score || 70),
      ownerId: 'usr_sales',
      ownerName: 'Sarah Chen',
      industry: (row.industry as any) || 'Software & Technology',
      companySize: '51-200' as const,
      estimatedValue: Number(row.estimatedValue || row['Estimated Value'] || 50000),
      tags: ['Imported CSV'],
    }));

    importLeads(newLeads);
    showSuccess(`Successfully imported ${newLeads.length} leads!`);
    setIsImportModalOpen(false);
    setImportFileText('');
    setImportPreview([]);
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'new':
        return <Badge variant="primary" dot>New</Badge>;
      case 'contacted':
        return <Badge variant="info" dot>Contacted</Badge>;
      case 'qualified':
        return <Badge variant="success" dot>Qualified</Badge>;
      case 'converted':
        return <Badge variant="purple" dot>Converted</Badge>;
      case 'unqualified':
        return <Badge variant="danger" dot>Unqualified</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return <span className="font-bold text-emerald-600 dark:text-emerald-400">{score}/100</span>;
    if (score >= 50) return <span className="font-semibold text-amber-600 dark:text-amber-400">{score}/100</span>;
    return <span className="text-slate-400">{score}/100</span>;
  };

  const columns: ColumnDef<Lead>[] = [
    {
      id: 'fullName',
      header: 'Lead Name & Company',
      sortable: true,
      render: (lead) => (
        <div className="flex items-center gap-3">
          <Avatar name={lead.fullName} size="sm" />
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 dark:text-slate-100 hover:text-forest-800 dark:hover:text-peach-400 cursor-pointer">
              {lead.fullName}
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              {lead.jobTitle} • <strong className="text-slate-600 dark:text-slate-300">{lead.company}</strong>
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'contact',
      header: 'Contact Info',
      render: (lead) => (
        <div className="text-xs space-y-0.5">
          <p className="text-slate-800 dark:text-slate-200">{lead.email}</p>
          <p className="text-slate-400 text-[11px]">{lead.phone}</p>
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      sortable: true,
      render: (lead) => getStatusBadge(lead.status),
    },
    {
      id: 'score',
      header: 'Score',
      sortable: true,
      align: 'center',
      render: (lead) => getScoreBadge(lead.score),
    },
    {
      id: 'source',
      header: 'Source',
      sortable: true,
      render: (lead) => (
        <span className="text-xs text-slate-600 dark:text-slate-300 capitalize">
          {lead.source.replace('_', ' ')}
        </span>
      ),
    },
    {
      id: 'estimatedValue',
      header: 'Estimated Value',
      sortable: true,
      align: 'right',
      render: (lead) => (
        <span className="font-semibold text-slate-900 dark:text-slate-100">
          {formatCurrency(lead.estimatedValue)}
        </span>
      ),
    },
    {
      id: 'ownerName',
      header: 'Owner',
      render: (lead) => (
        <div className="flex items-center gap-2">
          <Avatar src={lead.ownerAvatar} name={lead.ownerName} size="xs" />
          <span className="text-xs text-slate-600 dark:text-slate-300 truncate">{lead.ownerName}</span>
        </div>
      ),
    },
    {
      id: 'createdAt',
      header: 'Created',
      sortable: true,
      render: (lead) => (
        <span className="text-xs text-slate-400">{formatDate(lead.createdAt, 'short')}</span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      align: 'right',
      render: (lead) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => navigate(`/leads/${lead.id}`)}
            title="View 360 Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => navigate(`/leads/${lead.id}/edit`)}
            title="Edit Lead"
          >
            <Edit className="w-3.5 h-3.5" />
          </Button>
          {lead.status !== 'converted' && (
            <Button
              variant="ghost"
              size="xs"
              className="text-forest-800 hover:text-forest-900 dark:text-peach-400"
              onClick={() => setConversionModalLead(lead)}
              title="Convert Lead"
            >
              <CheckCircle className="w-3.5 h-3.5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="xs"
            className="text-rose-500 hover:text-rose-700"
            onClick={() => setDeleteDialogLead(lead)}
            title="Delete Lead"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Users className="w-6 h-6 text-forest-700" />
            <span>Leads Management</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Capture, qualify, score, and convert high-value prospects into customers and deals.
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
            onClick={exportLeadsCSV}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/leads/new')}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Lead
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Status filter */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ status: e.target.value as any })}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-peach-500"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="unqualified">Unqualified</option>
          </select>

          {/* Source filter */}
          <select
            value={filters.source}
            onChange={(e) => setFilters({ source: e.target.value as any })}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-peach-500"
          >
            <option value="all">All Sources</option>
            <option value="website">Website</option>
            <option value="referral">Referral</option>
            <option value="social_media">Social Media</option>
            <option value="email_campaign">Email Campaign</option>
            <option value="event">Event</option>
            <option value="partner">Partner</option>
          </select>

          {/* Min Score filter */}
          <select
            value={filters.minScore}
            onChange={(e) => setFilters({ minScore: Number(e.target.value) })}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-peach-500"
          >
            <option value={0}>Any Score</option>
            <option value={50}>Score &gt;= 50</option>
            <option value={75}>Score &gt;= 75 (Hot)</option>
            <option value={90}>Score &gt;= 90 (Tier 1)</option>
          </select>

          {(filters.search || filters.status !== 'all' || filters.source !== 'all' || filters.minScore > 0) && (
            <Button
              variant="ghost"
              size="xs"
              onClick={resetFilters}
              leftIcon={<RefreshCw className="w-3 h-3" />}
            >
              Reset Filters
            </Button>
          )}
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing {filteredAndSortedLeads.length} of {leads.length} leads
        </div>
      </div>

      {/* Main Leads Data Table */}
      <DataTable
        data={paginatedLeads}
        columns={columns}
        searchPlaceholder="Search leads by name, email, company..."
        searchValue={filters.search}
        onSearchChange={(val) => setFilters({ search: val })}
        sortField={sort.field}
        sortDirection={sort.direction}
        onSortChange={(field) => setSort(field as keyof Lead)}
        selectedIds={selectedLeadIds}
        onToggleSelect={toggleSelectLead}
        onSelectAll={selectAllLeads}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onRowClick={(lead) => navigate(`/leads/${lead.id}`)}
        emptyTitle="No leads found"
        emptyDescription="Create a new lead to start building your qualified sales pipeline."
        emptyActionLabel="Add New Lead"
        onEmptyAction={() => navigate('/leads/new')}
        bulkActions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="xs"
              onClick={() => bulkUpdateStatus(selectedLeadIds, 'qualified')}
            >
              Mark Qualified
            </Button>
            <Button
              variant="danger"
              size="xs"
              onClick={() => setIsBulkDeleteOpen(true)}
              leftIcon={<Trash2 className="w-3 h-3" />}
            >
              Delete Selected
            </Button>
          </div>
        }
      />

      {/* Conversion Modal */}
      <LeadConversionModal
        lead={conversionModalLead}
        isOpen={!!conversionModalLead}
        onClose={() => setConversionModalLead(null)}
        onConverted={(custId) => navigate(`/customers/${custId}`)}
      />

      {/* Delete Single Lead Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteDialogLead}
        onClose={() => setDeleteDialogLead(null)}
        onConfirm={() => {
          if (deleteDialogLead) {
            deleteLead(deleteDialogLead.id);
            showSuccess(`Lead "${deleteDialogLead.fullName}" deleted`);
            setDeleteDialogLead(null);
          }
        }}
        title="Delete Lead"
        message={`Are you sure you want to delete "${deleteDialogLead?.fullName}" (${deleteDialogLead?.company})? This action cannot be undone.`}
        confirmLabel="Delete Lead"
        variant="danger"
      />

      {/* Bulk Delete Confirmation */}
      <ConfirmDialog
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        onConfirm={() => {
          bulkDeleteLeads(selectedLeadIds);
          showSuccess(`Deleted ${selectedLeadIds.length} leads.`);
          setIsBulkDeleteOpen(false);
        }}
        title="Delete Selected Leads"
        message={`Are you sure you want to permanently delete ${selectedLeadIds.length} selected leads?`}
        confirmLabel="Delete All"
        variant="danger"
      />

      {/* CSV Import Modal */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => {
          setIsImportModalOpen(false);
          setImportFileText('');
          setImportPreview([]);
        }}
        title="Import Leads from CSV"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-500">
            Select a CSV file with prospect details. Expected headers: <code>First Name, Last Name, Email, Phone, Company, Job Title, Source, Score, Estimated Value</code>.
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
                    <span>{row['Full Name'] || `${row['First Name'] || ''} ${row['Last Name'] || ''}`}</span>
                    <span className="text-slate-400">{row.Company || row.company || row.email}</span>
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
              Import Leads
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
