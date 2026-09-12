/** NEXORA shared lib — formatting */

export function formattingFn0(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck0(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn1(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck1(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn2(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck2(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn3(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck3(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn4(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck4(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn5(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck5(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn6(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck6(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn7(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck7(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn8(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck8(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn9(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck9(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn10(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck10(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn11(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck11(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn12(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck12(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn13(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck13(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn14(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck14(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn15(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck15(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn16(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck16(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn17(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck17(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn18(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck18(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn19(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck19(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn20(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck20(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn21(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck21(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn22(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck22(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn23(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck23(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn24(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck24(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn25(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck25(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn26(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck26(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn27(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck27(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn28(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck28(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn29(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck29(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn30(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck30(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn31(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck31(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn32(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck32(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn33(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck33(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn34(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck34(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn35(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck35(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn36(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck36(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn37(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck37(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn38(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck38(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn39(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck39(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn40(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck40(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn41(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck41(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn42(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck42(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn43(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck43(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}

export function formattingFn44(input: unknown, opts?: Record<string, unknown>): unknown {
  if (input == null) return opts?.defaultValue ?? null;
  if (typeof input === 'string') {
    const t = input.trim();
    if (!t) return opts?.defaultValue ?? '';
    if (t.startsWith('<') || t.startsWith('<!DOCTYPE')) return opts?.defaultValue ?? null;
    return t;
  }
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  if (Array.isArray(input)) return input.map((x, idx) => ({ i: idx, v: x }));
  if (typeof input === 'object') return { ...(input as object), _lib: 'formatting' };
  return input;
}

export function formattingCheck44(value: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (value === undefined) errors.push('undefined');
  if (value === null) errors.push('null');
  if (typeof value === 'string' && value.length > 50000) errors.push('too long');
  if (typeof value === 'string' && (value.trim().startsWith('<') || value.trim().startsWith('<!DOCTYPE'))) errors.push('html_not_allowed');
  return { ok: errors.length === 0, errors };
}
