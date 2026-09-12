/**
 * Shared API client — never parses HTML as JSON
 */
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const API_BASE_URL = ((import.meta as any).env?.VITE_API_BASE_URL as string) || '/api';

export class BackendHtmlError extends Error {
  preview: string;
  constructor(message: string, preview = '') {
    super(message);
    this.name = 'BackendHtmlError';
    this.preview = preview;
  }
}

let _offlineMode = false;

export async function isOfflineMode(): Promise<boolean> {
  return _offlineMode;
}

export function forceOfflineMode(val = true): void {
  _offlineMode = val;
}

function looksLikeHtml(data: unknown): boolean {
  if (typeof data !== 'string') return false;
  const t = data.trim();
  return t.startsWith('<') || t.startsWith('<!DOCTYPE') || t.startsWith('<html');
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  timeout: 12000,
  transformResponse: [
    (data, headers) => {
      if (typeof data !== 'string') return data;
      const trimmed = data.trim();
      const ct = (headers?.['content-type'] || headers?.['Content-Type'] || '') as string;
      if (looksLikeHtml(trimmed) || (typeof ct === 'string' && ct.includes('text/html'))) {
        return { __isHtmlError: true, message: 'HTML instead of JSON', preview: trimmed.slice(0, 120) };
      }
      try {
        return JSON.parse(trimmed);
      } catch {
        return { __isParseError: true, message: 'Invalid JSON', raw: trimmed.slice(0, 120) };
      }
    },
  ],
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  try {
    const token = localStorage.getItem('nexora_token');
    if (token && typeof token === 'string' && !token.trim().startsWith('<')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch { /* ignore */ }
  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data?.__isHtmlError) {
      const err = new BackendHtmlError(
        'Server returned HTML instead of JSON. Backend may be offline.',
        response.data.preview
      );
      (err as any).isHtmlFallback = true;
      return Promise.reject(err);
    }
    if (response.data?.__isParseError) {
      return Promise.reject(new Error(response.data.message || 'JSON parse failed'));
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response && looksLikeHtml(error.response.data)) {
      error.message = 'Backend returned HTML error page. Offline mode.';
      (error as any).isHtmlFallback = true;
    } else if (!error.response) {
      error.message = 'Network error — backend unreachable. Offline mode.';
      (error as any).isOffline = true;
    }
    return Promise.reject(error);
  }
);

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await apiClient.get('/health', { timeout: 2500 });
    return res.status === 200 && !res.data?.__isHtmlError;
  } catch {
    return false;
  }
}

export default apiClient;
