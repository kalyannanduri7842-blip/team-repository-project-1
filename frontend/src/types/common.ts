export type SortDirection = 'asc' | 'desc';

export interface SortOption<T = string> {
  field: T;
  direction: SortDirection;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface DateRangeFilter {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  label?: string; // 'last_7_days', 'last_30_days', 'this_month', 'this_quarter', 'this_year', 'custom'
}

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'lead' | 'customer' | 'deal' | 'task' | 'activity' | 'action';
  url: string;
  badge?: string;
  metadata?: Record<string, string>;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  duration?: number;
}
