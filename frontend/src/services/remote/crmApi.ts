/**
 * Remote CRM API wrappers with automatic local fallback.
 * Prevents Unexpected token '<' by using the guarded api client.
 */
import apiClient, { isOfflineMode, forceOfflineMode, BackendHtmlError } from '../api';
import * as local from '../local';

async function withFallback<T>(remote: () => Promise<T>, fallback: () => T | Promise<T>): Promise<T> {
  if (await isOfflineMode()) {
    return fallback();
  }
  try {
    return await remote();
  } catch (e) {
    if (e instanceof BackendHtmlError || (e as any)?.isHtmlFallback || (e as any)?.isOffline) {
      forceOfflineMode(true);
    }
    return fallback();
  }
}

// ---- Auth ----
export async function login(email: string, password: string) {
  return withFallback(
    async () => {
      const { data } = await apiClient.post('/auth/login', { email, password });
      const token = data?.data?.token || data?.token;
      if (token) localStorage.setItem('nexora_token', token);
      return data?.data || data;
    },
    async () => {
      // Offline demo login
      if (email && password) {
        localStorage.setItem('nexora_token', 'offline-demo-token');
        return { user: { email, name: 'Demo User', role: 'ADMIN' }, token: 'offline-demo-token' };
      }
      throw new Error('Invalid credentials');
    }
  );
}

export async function register(payload: { email: string; password: string; name: string }) {
  return withFallback(
    async () => {
      const { data } = await apiClient.post('/auth/register', payload);
      return data?.data || data;
    },
    async () => ({ ...payload, id: 'local-' + Date.now() })
  );
}

// ---- Leads ----
export async function fetchLeads(params?: Record<string, string>) {
  return withFallback(
    async () => {
      const { data } = await apiClient.get('/leads', { params });
      return data?.data ?? data ?? [];
    },
    async () => local.leadRepository.getAll()
  );
}

export async function createLead(payload: Record<string, unknown>) {
  return withFallback(
    async () => {
      const { data } = await apiClient.post('/leads', payload);
      return data?.data ?? data;
    },
    async () => local.leadRepository.create(payload as any)
  );
}

export async function updateLead(id: string, payload: Record<string, unknown>) {
  return withFallback(
    async () => {
      const { data } = await apiClient.put(`/leads/${id}`, payload);
      return data?.data ?? data;
    },
    async () => local.leadRepository.update(id, payload as any)
  );
}

export async function deleteLead(id: string) {
  return withFallback(
    async () => {
      await apiClient.delete(`/leads/${id}`);
      return true;
    },
    async () => {
      local.leadRepository.delete(id);
      return true;
    }
  );
}

// ---- Customers ----
export async function fetchCustomers(params?: Record<string, string>) {
  return withFallback(
    async () => {
      const { data } = await apiClient.get('/customers', { params });
      return data?.data ?? data ?? [];
    },
    async () => local.customerRepository.getAll()
  );
}

export async function createCustomer(payload: Record<string, unknown>) {
  return withFallback(
    async () => {
      const { data } = await apiClient.post('/customers', payload);
      return data?.data ?? data;
    },
    async () => local.customerRepository.create(payload as any)
  );
}

// ---- Deals ----
export async function fetchDeals(params?: Record<string, string>) {
  return withFallback(
    async () => {
      const { data } = await apiClient.get('/deals', { params });
      return data?.data ?? data ?? [];
    },
    async () => local.dealRepository.getAll()
  );
}

export async function createDeal(payload: Record<string, unknown>) {
  return withFallback(
    async () => {
      const { data } = await apiClient.post('/deals', payload);
      return data?.data ?? data;
    },
    async () => local.dealRepository.create(payload as any)
  );
}

// ---- Tasks ----
export async function fetchTasks(params?: Record<string, string>) {
  return withFallback(
    async () => {
      const { data } = await apiClient.get('/tasks', { params });
      return data?.data ?? data ?? [];
    },
    async () => local.taskRepository.getAll()
  );
}

// ---- Activities ----
export async function fetchActivities(params?: Record<string, string>) {
  return withFallback(
    async () => {
      const { data } = await apiClient.get('/activities', { params });
      return data?.data ?? data ?? [];
    },
    async () => local.activityRepository.getAll()
  );
}

// ---- Reports ----
export async function fetchReportsSummary() {
  return withFallback(
    async () => {
      const { data } = await apiClient.get('/reports/summary');
      return data?.data ?? data;
    },
    async () => ({
      leads: (await local.leadRepository.getAll()).length,
      customers: (await local.customerRepository.getAll()).length,
      deals: (await local.dealRepository.getAll()).length,
      offline: true,
    })
  );
}
