/**
 * Safe LocalStorage — never JSON.parse HTML
 * Fixes: Unexpected token '<' ... is not valid JSON
 */
const memoryStorage = new Map<string, string>();

function looksLikeHtml(text: string): boolean {
  const t = String(text || '').trim();
  return t.startsWith('<') || t.startsWith('<!DOCTYPE') || t.startsWith('<html');
}

function safeParse<T>(raw: string | null | undefined, defaultValue: T): T {
  if (raw == null || raw === '') return defaultValue;
  const trimmed = String(raw).trim();
  if (looksLikeHtml(trimmed)) {
    console.warn('[storage] HTML ignored — not JSON');
    return defaultValue;
  }
  try {
    return JSON.parse(trimmed) as T;
  } catch {
    console.warn('[storage] invalid JSON ignored');
    return defaultValue;
  }
}

export const storage = {
  getItem<T>(key: string, defaultValue: T): T {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return safeParse(memoryStorage.get(key), defaultValue);
      }
      return safeParse(window.localStorage.getItem(key), defaultValue);
    } catch {
      return safeParse(memoryStorage.get(key), defaultValue);
    }
  },
  setItem<T>(key: string, value: T): boolean {
    try {
      const serialized = JSON.stringify(value);
      memoryStorage.set(key, serialized);
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, serialized);
      }
      return true;
    } catch {
      return false;
    }
  },
  removeItem(key: string): void {
    try {
      memoryStorage.delete(key);
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch { /* ignore */ }
  },
  clear(): void {
    try {
      memoryStorage.clear();
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
      }
    } catch { /* ignore */ }
  },
};

export const getStorageItem = storage.getItem;
export const setStorageItem = storage.setItem;
export const removeStorageItem = storage.removeItem;
export const clearAllStorage = storage.clear;
