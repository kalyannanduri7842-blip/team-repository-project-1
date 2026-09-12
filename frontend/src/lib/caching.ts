/** NEXORA shared lib — caching */

export function cachingFn0(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck0(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn1(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck1(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn2(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck2(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn3(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck3(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn4(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck4(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn5(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck5(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn6(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck6(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn7(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck7(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn8(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck8(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn9(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck9(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn10(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck10(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn11(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck11(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn12(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck12(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn13(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck13(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn14(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck14(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn15(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck15(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn16(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck16(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn17(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck17(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn18(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck18(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn19(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck19(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn20(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck20(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn21(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck21(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn22(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck22(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn23(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck23(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn24(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck24(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn25(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck25(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn26(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck26(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn27(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck27(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn28(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck28(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn29(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck29(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn30(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck30(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn31(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck31(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn32(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck32(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn33(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck33(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn34(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck34(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn35(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck35(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn36(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck36(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn37(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck37(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn38(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck38(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn39(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck39(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn40(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck40(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn41(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck41(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn42(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck42(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn43(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck43(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function cachingFn44(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'caching' };
  return input;
}

export function cachingCheck44(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}
