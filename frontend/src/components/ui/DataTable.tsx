import React, { useState } from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Search,
  SlidersHorizontal,
  Check,
  MoreVertical,
} from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { EmptyState } from './EmptyState';
import { Pagination } from './Pagination';
import { cn } from '../../utils/cn';

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: ColumnDef<T>[];
  keyField?: keyof T;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  // Sorting
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onSortChange?: (field: string) => void;
  // Selection
  selectedIds?: string[];
  onToggleSelect?: (id: string) => void;
  onSelectAll?: (selected: boolean) => void;
  bulkActions?: React.ReactNode;
  // Pagination
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  // Actions
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  headerActions?: React.ReactNode;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  keyField = 'id',
  searchPlaceholder = 'Search records...',
  searchValue,
  onSearchChange,
  sortField,
  sortDirection,
  onSortChange,
  selectedIds = [],
  onToggleSelect,
  onSelectAll,
  bulkActions,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onRowClick,
  isLoading,
  emptyTitle = 'No records found',
  emptyDescription = 'There are no items matching your criteria.',
  emptyActionLabel,
  onEmptyAction,
  headerActions,
}: DataTableProps<T>) {
  // Column visibility state
  const [visibleColIds, setVisibleColIds] = useState<string[]>(columns.map((c) => c.id));
  const [showColMenu, setShowColMenu] = useState(false);

  const toggleColumn = (colId: string) => {
    setVisibleColIds((prev) =>
      prev.includes(colId) ? prev.filter((id) => id !== colId) : [...prev, colId]
    );
  };

  const activeColumns = columns.filter((col) => visibleColIds.includes(col.id));
  const isAllSelected = data.length > 0 && data.every((item) => selectedIds.includes(String(item[keyField])));
  const isSomeSelected = data.some((item) => selectedIds.includes(String(item[keyField]))) && !isAllSelected;

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden flex flex-col">
      {/* Top Table Toolbar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-md">
          {onSearchChange !== undefined && (
            <Input
              value={searchValue || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              leftIcon={<Search className="w-4 h-4" />}
              className="py-1.5 text-xs sm:text-sm"
            />
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Column Visibility Menu */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<SlidersHorizontal className="w-3.5 h-3.5" />}
              onClick={() => setShowColMenu(!showColMenu)}
            >
              Columns
            </Button>

            {showColMenu && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-30 p-2 text-xs"
                onMouseLeave={() => setShowColMenu(false)}
              >
                <div className="font-semibold text-slate-700 dark:text-slate-300 px-2 py-1 mb-1 border-b border-slate-100 dark:border-slate-700">
                  Toggle Columns
                </div>
                {columns.map((col) => (
                  <label
                    key={col.id}
                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700/60 rounded cursor-pointer text-slate-700 dark:text-slate-300"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColIds.includes(col.id)}
                      onChange={() => toggleColumn(col.id)}
                      className="rounded border-slate-300 text-forest-800 focus:ring-peach-500 w-3.5 h-3.5"
                    />
                    <span>{col.header}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {headerActions}
        </div>
      </div>

      {/* Bulk Action Notification Bar */}
      {selectedIds.length > 0 && bulkActions && (
        <div className="bg-peach-100/90 dark:bg-forest-900/60 px-4 py-2.5 border-b border-peach-200 dark:border-forest-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-forest-950 dark:text-peach-200">
            {selectedIds.length} {selectedIds.length === 1 ? 'record' : 'records'} selected
          </span>
          <div className="flex items-center gap-2">{bulkActions}</div>
        </div>
      )}

      {/* Table Content Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-peach-50/60 dark:bg-forest-900/40 border-b border-peach-200/80 dark:border-forest-800 text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              {onToggleSelect && onSelectAll && (
                <th className="w-10 px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = isSomeSelected;
                    }}
                    onChange={(e) => onSelectAll(e.target.checked)}
                    className="rounded border-slate-300 dark:border-forest-700 text-forest-800 focus:ring-peach-500 w-4 h-4 cursor-pointer"
                  />
                </th>
              )}

              {activeColumns.map((col) => {
                const isSorted = sortField === (col.accessorKey as string || col.id);
                return (
                  <th
                    key={col.id}
                    onClick={() => {
                      if (col.sortable && onSortChange) {
                        onSortChange(String(col.accessorKey || col.id));
                      }
                    }}
                    className={cn(
                      'px-4 py-3 select-none',
                      col.sortable && 'cursor-pointer hover:text-forest-900 dark:hover:text-peach-200 transition-colors',
                      col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
                      col.className
                    )}
                  >
                    <div
                      className={cn(
                        'inline-flex items-center gap-1.5',
                        col.align === 'center' && 'justify-center',
                        col.align === 'right' && 'justify-end'
                      )}
                    >
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="text-slate-400">
                          {isSorted ? (
                            sortDirection === 'asc' ? (
                              <ChevronUp className="w-3.5 h-3.5 text-forest-800 dark:text-peach-400" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-forest-800 dark:text-peach-400" />
                            )
                          ) : (
                            <ChevronsUpDown className="w-3.5 h-3.5 opacity-40 hover:opacity-100" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-peach-100/60 dark:divide-forest-900/60 text-xs sm:text-sm">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={activeColumns.length + (onToggleSelect ? 1 : 0)}
                  className="py-12 px-4"
                >
                  <EmptyState
                    title={emptyTitle}
                    description={emptyDescription}
                    actionLabel={emptyActionLabel}
                    onAction={onEmptyAction}
                  />
                </td>
              </tr>
            ) : (
              data.map((item) => {
                const itemId = String(item[keyField]);
                const isSelected = selectedIds.includes(itemId);

                return (
                  <tr
                    key={itemId}
                    onClick={() => onRowClick && onRowClick(item)}
                    className={cn(
                      'transition-colors',
                      isSelected
                        ? 'bg-peach-100/50 dark:bg-forest-900/50 font-medium'
                        : 'hover:bg-peach-50/40 dark:hover:bg-forest-900/20',
                      onRowClick && 'cursor-pointer'
                    )}
                  >
                    {onToggleSelect && (
                      <td
                        className="w-10 px-4 py-3 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleSelect(itemId)}
                          className="rounded border-slate-300 dark:border-forest-700 text-forest-800 focus:ring-peach-500 w-4 h-4 cursor-pointer"
                        />
                      </td>
                    )}

                    {activeColumns.map((col) => (
                      <td
                        key={col.id}
                        className={cn(
                          'px-4 py-3.5 text-slate-700 dark:text-slate-300',
                          col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
                          col.className
                        )}
                      >
                        {col.render
                          ? col.render(item)
                          : col.accessorKey
                          ? String(item[col.accessorKey] ?? '—')
                          : '—'}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {currentPage !== undefined && totalPages !== undefined && totalItems !== undefined && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize || 10}
          onPageChange={onPageChange || (() => {})}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
}
