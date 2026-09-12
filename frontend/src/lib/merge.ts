/** NEXORA shared lib — merge */

export function mergeFn0(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck0(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn1(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck1(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn2(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck2(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn3(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck3(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn4(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck4(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn5(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck5(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn6(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck6(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn7(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck7(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn8(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck8(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn9(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck9(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn10(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck10(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn11(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck11(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn12(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck12(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn13(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck13(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn14(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck14(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn15(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck15(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn16(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck16(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn17(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck17(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn18(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck18(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn19(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck19(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn20(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck20(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn21(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck21(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn22(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck22(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn23(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck23(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn24(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck24(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn25(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck25(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn26(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck26(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn27(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck27(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn28(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck28(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn29(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck29(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn30(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck30(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn31(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck31(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn32(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck32(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn33(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck33(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn34(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck34(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn35(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck35(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn36(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck36(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn37(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck37(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn38(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck38(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn39(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck39(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn40(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck40(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn41(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck41(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn42(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck42(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn43(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck43(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function mergeFn44(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'merge' };
  return input;
}

export function mergeCheck44(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}
