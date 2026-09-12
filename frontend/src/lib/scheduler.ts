/** NEXORA lib — scheduler */

export function schedulerFn0(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck0(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn1(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck1(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn2(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck2(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn3(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck3(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn4(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck4(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn5(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck5(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn6(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck6(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn7(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck7(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn8(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck8(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn9(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck9(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn10(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck10(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn11(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck11(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn12(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck12(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn13(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck13(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn14(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck14(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn15(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck15(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn16(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck16(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn17(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck17(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn18(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck18(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn19(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck19(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn20(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck20(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn21(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck21(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn22(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck22(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn23(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck23(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn24(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck24(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn25(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck25(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn26(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck26(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn27(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck27(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn28(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck28(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn29(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck29(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn30(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck30(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn31(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck31(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn32(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck32(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn33(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck33(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn34(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck34(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn35(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck35(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn36(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck36(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn37(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck37(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn38(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck38(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn39(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck39(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn40(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck40(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}

export function schedulerFn41(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'scheduler' };
  return input;
}

export function schedulerCheck41(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html');
  return { ok: errors.length === 0, errors };
}
