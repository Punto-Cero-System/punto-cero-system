/*
 * FinancialLifecycle.ts — S45 System Global Financial Operations Foundation
 * 6-state lifecycle with observer pattern: D→V→A→P→C→CL
 * DRAFT → VALIDATED → ACTIVE → PROCESSING → COMPLETED → CLOSED
 * All transitions require S12 authorization (bypassAuthorization: false)
 * Observer pattern: all actions observed, none autonomous
 * Reuses: S11, S12, S37
 * Zero vertical contamination
 */

// 5-state flow with COMPLETED and CLOSED added
export enum FinancialOperationState {
  DRAFT = 'DRAFT',
  VALIDATED = 'VALIDATED',
  ACTIVE = 'ACTIVE',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CLOSED = 'CLOSED'
}

// Lifecycle transition validation
export type LifecycleTransition = {
  fromState: FinancialOperationState;
  toState: FinancialOperationState;
  transitionAuthorizedBy: {
    identity: {
      identityId: string;
      identityType: 'universal';
    };
    authorizationTimestamp: number;
    bypassAuthorization: false; // HARD CONSTRAINT
  };
  transitionObservedBy: {
    identity: {
      identityId: string;
      identityType: 'universal';
    };
    observationTimestamp: number;
  };
  reason?: string; // Optional human-readable reason
};

// Observer pattern for lifecycle
export type LifecycleObserver = {
  observerId: {
    identityId: string;
    identityType: 'universal';
  };
  observedOperationId: string;
  observationType: 'state-transition' | 'allocation' | 'authorization';
  observationTimestamp: number;
  observationData: {
    previousState: FinancialOperationState;
    newState: FinancialOperationState;
    authorized: boolean;
    autonomous: false; // HARD CONSTRAINT
  };
};

// Valid state transitions (D→V→A→P→C→CL, with COMPLETION before CLOSE)
export const VALID_LIFECYCLE_TRANSITIONS: FinancialOperationState[][] = [
  // DRAFT transitions
  [FinancialOperationState.DRAFT, FinancialOperationState.VALIDATED],
  [FinancialOperationState.DRAFT, FinancialOperationState.CLOSED], // Can close from draft without full lifecycle
  
  // VALIDATED transitions
  [FinancialOperationState.VALIDATED, FinancialOperationState.ACTIVE],
  [FinancialOperationState.VALIDATED, FinancialOperationState.CLOSED],
  
  // ACTIVE transitions
  [FinancialOperationState.ACTIVE, FinancialOperationState.PROCESSING],
  [FinancialOperationState.ACTIVE, FinancialOperationState.CLOSED],
  
  // PROCESSING transitions
  [FinancialOperationState.PROCESSING, FinancialOperationState.COMPLETED],
  [FinancialOperationState.PROCESSING, FinancialOperationState.CLOSED],
  
  // COMPLETED transitions (terminal)
  [FinancialOperationState.COMPLETED, FinancialOperationState.CLOSED],
  
  // CLOSED is terminal - no outgoing transitions
];

// Transition validity check
export function isValidTransition(from: FinancialOperationState, to: FinancialOperationState): boolean {
  return VALID_LIFECYCLE_TRANSITIONS.some(
    transition => transition[0] === from && transition[1] === to
  );
}

// Initial state for new operations
export const INITIAL_STATE: FinancialOperationState = FinancialOperationState.DRAFT;

// State descriptions for observer pattern
export const STATE_DESCRIPTIONS: Record<FinancialOperationState, string> = {
  [FinancialOperationState.DRAFT]: 'Operación económica inicial, sin validar',
  [FinancialOperationState.VALIDATED]: 'Referencias validadas, lista para distribución',
  [FinancialOperationState.ACTIVE]: 'Operación activa, en curso',
  [FinancialOperationState.PROCESSING]: 'Distribución interna en proceso',
  [FinancialOperationState.COMPLETED]: 'Distribución finalizada exitosamente',
  [FinancialOperationState.CLOSED]: 'Operación cerrada, sin reversibilidad automática'
};

// State color coding (for UI/observability)
export const STATE_COLORS: Record<FinancialOperationState, string> = {
  [FinancialOperationState.DRAFT]: '#6B7280',      // gray
  [FinancialOperationState.VALIDATED]: '#F59E0B',    // amber
  [FinancialOperationState.ACTIVE]: '#10B981',       // green
  [FinancialOperationState.PROCESSING]: '#3B82F6',    // blue
  [FinancialOperationState.COMPLETED]: '#8B5CF6',     // violet
  [FinancialOperationState.CLOSED]: '#EF4444'         // red/terminal
};