/** NEXORA CRM domain — territoryPlanning */

export type TerritoryPlanningId = string;
export type TerritoryPlanningState = 'NEW' | 'IN_PROGRESS' | 'DONE' | 'FAILED' | 'CANCELLED';

export interface TerritoryPlanningModel0 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel0(p: Partial<TerritoryPlanningModel0> = {}): TerritoryPlanningModel0 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel0(e: TerritoryPlanningModel0): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel1 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel1(p: Partial<TerritoryPlanningModel1> = {}): TerritoryPlanningModel1 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel1(e: TerritoryPlanningModel1): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel2 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel2(p: Partial<TerritoryPlanningModel2> = {}): TerritoryPlanningModel2 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel2(e: TerritoryPlanningModel2): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel3 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel3(p: Partial<TerritoryPlanningModel3> = {}): TerritoryPlanningModel3 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel3(e: TerritoryPlanningModel3): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel4 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel4(p: Partial<TerritoryPlanningModel4> = {}): TerritoryPlanningModel4 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel4(e: TerritoryPlanningModel4): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel5 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel5(p: Partial<TerritoryPlanningModel5> = {}): TerritoryPlanningModel5 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel5(e: TerritoryPlanningModel5): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel6 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel6(p: Partial<TerritoryPlanningModel6> = {}): TerritoryPlanningModel6 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel6(e: TerritoryPlanningModel6): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel7 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel7(p: Partial<TerritoryPlanningModel7> = {}): TerritoryPlanningModel7 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel7(e: TerritoryPlanningModel7): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel8 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel8(p: Partial<TerritoryPlanningModel8> = {}): TerritoryPlanningModel8 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel8(e: TerritoryPlanningModel8): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel9 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel9(p: Partial<TerritoryPlanningModel9> = {}): TerritoryPlanningModel9 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel9(e: TerritoryPlanningModel9): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel10 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel10(p: Partial<TerritoryPlanningModel10> = {}): TerritoryPlanningModel10 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel10(e: TerritoryPlanningModel10): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel11 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel11(p: Partial<TerritoryPlanningModel11> = {}): TerritoryPlanningModel11 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel11(e: TerritoryPlanningModel11): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel12 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel12(p: Partial<TerritoryPlanningModel12> = {}): TerritoryPlanningModel12 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel12(e: TerritoryPlanningModel12): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel13 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel13(p: Partial<TerritoryPlanningModel13> = {}): TerritoryPlanningModel13 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel13(e: TerritoryPlanningModel13): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel14 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel14(p: Partial<TerritoryPlanningModel14> = {}): TerritoryPlanningModel14 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel14(e: TerritoryPlanningModel14): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel15 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel15(p: Partial<TerritoryPlanningModel15> = {}): TerritoryPlanningModel15 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel15(e: TerritoryPlanningModel15): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel16 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel16(p: Partial<TerritoryPlanningModel16> = {}): TerritoryPlanningModel16 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel16(e: TerritoryPlanningModel16): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel17 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel17(p: Partial<TerritoryPlanningModel17> = {}): TerritoryPlanningModel17 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel17(e: TerritoryPlanningModel17): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel18 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel18(p: Partial<TerritoryPlanningModel18> = {}): TerritoryPlanningModel18 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel18(e: TerritoryPlanningModel18): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export interface TerritoryPlanningModel19 {
  id: TerritoryPlanningId;
  state: TerritoryPlanningState;
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

export function buildTerritoryPlanningModel19(p: Partial<TerritoryPlanningModel19> = {}): TerritoryPlanningModel19 {
  return {
    id: p.id ?? `territoryPlanning-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
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

export function assertTerritoryPlanningModel19(e: TerritoryPlanningModel19): string[] {
  const errs: string[] = [];
  if (!e.id) errs.push('id');
  if (!e.createdAt) errs.push('createdAt');
  return errs;
}

export function territoryPlanningReduce0(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function territoryPlanningBucket0(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function territoryPlanningReduce1(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function territoryPlanningBucket1(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function territoryPlanningReduce2(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function territoryPlanningBucket2(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function territoryPlanningReduce3(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function territoryPlanningBucket3(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function territoryPlanningReduce4(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function territoryPlanningBucket4(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function territoryPlanningReduce5(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function territoryPlanningBucket5(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function territoryPlanningReduce6(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function territoryPlanningBucket6(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function territoryPlanningReduce7(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function territoryPlanningBucket7(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function territoryPlanningReduce8(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function territoryPlanningBucket8(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function territoryPlanningReduce9(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function territoryPlanningBucket9(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function territoryPlanningReduce10(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function territoryPlanningBucket10(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function territoryPlanningReduce11(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function territoryPlanningBucket11(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function territoryPlanningReduce12(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function territoryPlanningBucket12(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}

export function territoryPlanningReduce13(rows: Array<{ value?: number; score?: number }>): number {
  return rows.reduce((s, r) => s + (r.value ?? 0) + (r.score ?? 0), 0);
}

export function territoryPlanningBucket13(rows: Array<{ state: string; value?: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) m[r.state] = (m[r.state] || 0) + (r.value ?? 1);
  return m;
}
