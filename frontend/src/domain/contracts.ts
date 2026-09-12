/** NEXORA CRM domain — contracts */

export type ContractsId = string;
export type ContractsState = 'NEW' | 'IN_PROGRESS' | 'DONE' | 'FAILED' | 'CANCELLED';

export interface ContractsModel0 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel0(p: Partial<ContractsModel0> = {}): ContractsModel0 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel0(e: ContractsModel0): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel1 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel1(p: Partial<ContractsModel1> = {}): ContractsModel1 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel1(e: ContractsModel1): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel2 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel2(p: Partial<ContractsModel2> = {}): ContractsModel2 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel2(e: ContractsModel2): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel3 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel3(p: Partial<ContractsModel3> = {}): ContractsModel3 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel3(e: ContractsModel3): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel4 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel4(p: Partial<ContractsModel4> = {}): ContractsModel4 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel4(e: ContractsModel4): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel5 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel5(p: Partial<ContractsModel5> = {}): ContractsModel5 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel5(e: ContractsModel5): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel6 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel6(p: Partial<ContractsModel6> = {}): ContractsModel6 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel6(e: ContractsModel6): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel7 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel7(p: Partial<ContractsModel7> = {}): ContractsModel7 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel7(e: ContractsModel7): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel8 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel8(p: Partial<ContractsModel8> = {}): ContractsModel8 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel8(e: ContractsModel8): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel9 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel9(p: Partial<ContractsModel9> = {}): ContractsModel9 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel9(e: ContractsModel9): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel10 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel10(p: Partial<ContractsModel10> = {}): ContractsModel10 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel10(e: ContractsModel10): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel11 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel11(p: Partial<ContractsModel11> = {}): ContractsModel11 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel11(e: ContractsModel11): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel12 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel12(p: Partial<ContractsModel12> = {}): ContractsModel12 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel12(e: ContractsModel12): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel13 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel13(p: Partial<ContractsModel13> = {}): ContractsModel13 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel13(e: ContractsModel13): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel14 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel14(p: Partial<ContractsModel14> = {}): ContractsModel14 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel14(e: ContractsModel14): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel15 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel15(p: Partial<ContractsModel15> = {}): ContractsModel15 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel15(e: ContractsModel15): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel16 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel16(p: Partial<ContractsModel16> = {}): ContractsModel16 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel16(e: ContractsModel16): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel17 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel17(p: Partial<ContractsModel17> = {}): ContractsModel17 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel17(e: ContractsModel17): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel18 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel18(p: Partial<ContractsModel18> = {}): ContractsModel18 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel18(e: ContractsModel18): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel19 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel19(p: Partial<ContractsModel19> = {}): ContractsModel19 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel19(e: ContractsModel19): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel20 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel20(p: Partial<ContractsModel20> = {}): ContractsModel20 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel20(e: ContractsModel20): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface ContractsModel21 {
  id: ContractsId;
  state: ContractsState;
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

export function buildContractsModel21(p: Partial<ContractsModel21> = {}): ContractsModel21 {
  return {
    id: p.id ?? `contracts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertContractsModel21(e: ContractsModel21): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export function contractsReduce0(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function contractsBucket0(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function contractsReduce1(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function contractsBucket1(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function contractsReduce2(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function contractsBucket2(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function contractsReduce3(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function contractsBucket3(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function contractsReduce4(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function contractsBucket4(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function contractsReduce5(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function contractsBucket5(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function contractsReduce6(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function contractsBucket6(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function contractsReduce7(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function contractsBucket7(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function contractsReduce8(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function contractsBucket8(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function contractsReduce9(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function contractsBucket9(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function contractsReduce10(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function contractsBucket10(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function contractsReduce11(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function contractsBucket11(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function contractsReduce12(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function contractsBucket12(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function contractsReduce13(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function contractsBucket13(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}
