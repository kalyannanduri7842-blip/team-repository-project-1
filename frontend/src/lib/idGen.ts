/** NEXORA shared lib — idGen */

export function idGenFn0(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck0(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn1(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck1(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn2(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck2(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn3(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck3(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn4(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck4(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn5(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck5(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn6(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck6(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn7(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck7(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn8(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck8(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn9(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck9(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn10(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck10(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn11(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck11(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn12(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck12(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn13(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck13(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn14(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck14(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn15(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck15(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn16(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck16(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn17(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck17(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn18(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck18(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn19(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck19(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn20(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck20(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn21(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck21(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn22(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck22(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn23(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck23(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn24(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck24(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn25(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck25(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn26(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck26(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn27(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck27(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn28(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck28(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn29(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck29(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn30(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck30(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn31(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck31(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn32(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck32(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn33(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck33(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn34(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck34(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn35(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck35(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn36(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck36(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn37(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck37(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn38(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck38(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn39(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck39(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn40(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck40(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn41(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck41(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn42(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck42(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn43(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck43(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function idGenFn44(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'idGen' };
  return input;
}

export function idGenCheck44(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}
