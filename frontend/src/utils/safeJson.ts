export function isHtmlLike(text: string): boolean {
  const t = String(text || '').trim();
  return t.startsWith('<') || t.startsWith('<!DOCTYPE') || t.startsWith('<html');
}

export function safeJsonParse<T = unknown>(raw: string, fallback?: T): T {
  if (raw == null || raw === '') {
    if (fallback !== undefined) return fallback;
    throw new Error('Empty body');
  }
  const trimmed = String(raw).trim();
  if (isHtmlLike(trimmed)) {
    if (fallback !== undefined) return fallback;
    throw new Error('HTML instead of JSON (backend offline or wrong URL)');
  }
  try {
    return JSON.parse(trimmed) as T;
  } catch {
    if (fallback !== undefined) return fallback;
    throw new Error('Invalid JSON');
  }
}
