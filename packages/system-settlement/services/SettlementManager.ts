/*
 * SettlementManager.ts -- S46 Observer pattern service, Core L1 governed
 * bypassAuthorization: false enforcement, observer pattern, zero vertical
 */

import { SettlementEntry } from '../models/SettlementEntry';

export class SettlementManager {
  private settlements = new Map<string, SettlementEntry>();

  createSettlement(data: Partial<SettlementEntry>): SettlementEntry {
    const s: SettlementEntry = {
      settlementEntryId: { identityId: `settle-${Date.now()}`, identityType: 'universal' },
      settlementAuthorizedBy: { bypassAuthorization: false, authorizedBy: { identityId: 'core-l1', identityType: 'universal' }, authorizationDate: Date.now() },
      compatibilityRules: [],
      settlementScope: 'global',
      settlementStatus: 'PENDING',
      settlementObservedBy: [],
      economicSettlementContext: [],
      observedBy: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      assignmentId: { identityId: `settle-${Date.now()}`, identityType: 'universal' },
      assignmentStatus: 'pending',
      assignmentObservedBy: { identityId: 'core-l1', identityType: 'universal', observationTimestamp: Date.now() },
      ...data
    };
    this.settlements.set(s.settlementEntryId.identityId, s);
    return s;
  }

  getSettlement(id: string): SettlementEntry | undefined {
    return this.settlements.get(id);
  }

  transitionSettlement(id: string, toState: string, auth: { bypassAuthorization: false }): { success: boolean; settlement?: SettlementEntry; error?: string } {
    if (auth.bypassAuthorization !== false) return { success: false, error: 'bypass must be false' };
    const s = this.settlements.get(id);
    if (!s) return { success: false, error: 'not found' };
    const valid = s.settlementStatus === 'PENDING' && toState === 'PROCESSING' || s.settlementStatus === 'PROCESSING' && toState === 'COMPLETED' || s.settlementStatus === 'COMPLETED' && toState === 'CLOSED';
    if (!valid) return { success: false, error: 'invalid transition' };
    s.settlementStatus = toState as any;
    this.settlements.set(id, s);
    return { success: true, settlement: s };
  }

  recordObserver(o: any): void {}

  getObservers(id: string): any[] { return []; }

  getAllSettlements(): SettlementEntry[] { return Array.from(this.settlements.values()); }

  validateSettlement(s: SettlementEntry): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (s.settlementAuthorizedBy.bypassAuthorization !== false) errors.push('bypass must be false');
    if (s.observedBy.length === 0) errors.push('no observers');
    return { valid: errors.length === 0, errors };
  }
}