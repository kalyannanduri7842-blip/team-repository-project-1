/** NEXORA CRM domain — upsell */

export type UpsellId = string;
export type UpsellState = 'NEW' | 'IN_PROGRESS' | 'DONE' | 'FAILED' | 'CANCELLED';

export interface UpsellModel0 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel0(p: Partial<UpsellModel0> = {}): UpsellModel0 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel0(e: UpsellModel0): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel1 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel1(p: Partial<UpsellModel1> = {}): UpsellModel1 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel1(e: UpsellModel1): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel2 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel2(p: Partial<UpsellModel2> = {}): UpsellModel2 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel2(e: UpsellModel2): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel3 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel3(p: Partial<UpsellModel3> = {}): UpsellModel3 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel3(e: UpsellModel3): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel4 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel4(p: Partial<UpsellModel4> = {}): UpsellModel4 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel4(e: UpsellModel4): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel5 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel5(p: Partial<UpsellModel5> = {}): UpsellModel5 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel5(e: UpsellModel5): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel6 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel6(p: Partial<UpsellModel6> = {}): UpsellModel6 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel6(e: UpsellModel6): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel7 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel7(p: Partial<UpsellModel7> = {}): UpsellModel7 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel7(e: UpsellModel7): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel8 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel8(p: Partial<UpsellModel8> = {}): UpsellModel8 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel8(e: UpsellModel8): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel9 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel9(p: Partial<UpsellModel9> = {}): UpsellModel9 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel9(e: UpsellModel9): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel10 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel10(p: Partial<UpsellModel10> = {}): UpsellModel10 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel10(e: UpsellModel10): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel11 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel11(p: Partial<UpsellModel11> = {}): UpsellModel11 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel11(e: UpsellModel11): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel12 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel12(p: Partial<UpsellModel12> = {}): UpsellModel12 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel12(e: UpsellModel12): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel13 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel13(p: Partial<UpsellModel13> = {}): UpsellModel13 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel13(e: UpsellModel13): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel14 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel14(p: Partial<UpsellModel14> = {}): UpsellModel14 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel14(e: UpsellModel14): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel15 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel15(p: Partial<UpsellModel15> = {}): UpsellModel15 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel15(e: UpsellModel15): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel16 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel16(p: Partial<UpsellModel16> = {}): UpsellModel16 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel16(e: UpsellModel16): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel17 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel17(p: Partial<UpsellModel17> = {}): UpsellModel17 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel17(e: UpsellModel17): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel18 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel18(p: Partial<UpsellModel18> = {}): UpsellModel18 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel18(e: UpsellModel18): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel19 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel19(p: Partial<UpsellModel19> = {}): UpsellModel19 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel19(e: UpsellModel19): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel20 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel20(p: Partial<UpsellModel20> = {}): UpsellModel20 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel20(e: UpsellModel20): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface UpsellModel21 {
  id: UpsellId;
  state: UpsellState;
  prop0: string | number | boolean | null;
  prop1: string | number | boolean | null;
  prop2: string | number | boolean | null;
  prop3: string | number | boolean | null;
  prop4: string | number | boolean | null;
  prop5: string | number | boolean | null;
  prop6: string | number | boolean | null;
  prop7: string | number | boolean | null;
  prop8: string | number | boolean | null;
  prop9: string | number | boolean | null;
  prop10: string | number | boolean | null;
  prop11: string | number | boolean | null;
  prop12: string | number | boolean | null;
  prop13: string | number | boolean | null;
  value?: number;
  score?: number;
  ownerId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export function buildUpsellModel21(p: Partial<UpsellModel21> = {}): UpsellModel21 {
  return {
    id: p.id ?? `upsell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    state: p.state ?? 'NEW',
    prop0: p.prop0 ?? null,
    prop1: p.prop1 ?? null,
    prop2: p.prop2 ?? null,
    prop3: p.prop3 ?? null,
    prop4: p.prop4 ?? null,
    prop5: p.prop5 ?? null,
    prop6: p.prop6 ?? null,
    prop7: p.prop7 ?? null,
    prop8: p.prop8 ?? null,
    prop9: p.prop9 ?? null,
    prop10: p.prop10 ?? null,
    prop11: p.prop11 ?? null,
    prop12: p.prop12 ?? null,
    prop13: p.prop13 ?? null,
    value: p.value,
    score: p.score,
    ownerId: p.ownerId,
    meta: p.meta,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

export function assertUpsellModel21(e: UpsellModel21): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export function upsellReduce0(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function upsellBucket0(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function upsellReduce1(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function upsellBucket1(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function upsellReduce2(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function upsellBucket2(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function upsellReduce3(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function upsellBucket3(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function upsellReduce4(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function upsellBucket4(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function upsellReduce5(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function upsellBucket5(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function upsellReduce6(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function upsellBucket6(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function upsellReduce7(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function upsellBucket7(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function upsellReduce8(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function upsellBucket8(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function upsellReduce9(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function upsellBucket9(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function upsellReduce10(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function upsellBucket10(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function upsellReduce11(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function upsellBucket11(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function upsellReduce12(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function upsellBucket12(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function upsellReduce13(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function upsellBucket13(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}
