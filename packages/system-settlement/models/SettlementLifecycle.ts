/*
 * SettlementLifecycle.ts — S46 System Global Settlement Foundation
 * 4-state lifecycle with observer pattern: P→P→C→CL
 * PENDING → PROCESSING → COMPLETED → CLOSED
 * All transitions require S12 authorization (bypassAuthorization: false)
 * Observer pattern: all actions observed, none autonomous
 * Reuses: S11, S12, S37
 * Zero vertical contamination
 */

// 4-state flow
export enum SettlementOperationState {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CLOSED = 'CLOSED'
}

// Lifecycle transition validation
export type LifecycleTransition = {
  fromState: SettlementOperationState;
  toState: SettlementOperationState;
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
}

// Observer pattern for lifecycle
export type LifecycleObserver = {
  observerId: {
    identityId: string;
    identityType: 'universal';
  };
  observedOperationId: string;
  observationType: 'state-transition' | 'settlement' | 'authorization';
  observationTimestamp: number;
  observationData: {
    previousState: SettlementOperationState;
    newState: SettlementOperationState;
    authorized: boolean;
    autonomous: false; // HARD CONSTRAINT
  };
}

// Valid state transitions (P→P→C→CL)
export const VALID_LIFECYCLE_TRANSITIONS: SettlementOperationState[][] = [
  // PENDING transitions
  [SettlementOperationState.PENDING, SettlementOperationState.PROCESSING],
  [SettlementOperationState.PENDING, SettlementOperationState.CLOSED], // Can close from pending
  
  // PROCESSING transitions
  [SettlementOperationState.PROCESSING, SettlementOperationState.COMPLETED],
  [SettlementOperationState.PROCESSING, SettlementOperationState.CLOSED],
  
  // COMPLETED transitions (terminal before close)
  [SettlementOperationState.COMPLETED, SettlementOperationState.CLOSED],
  
  // CLOSED is terminal - no outgoing transitions
];

// Transition validity check
export function isValidTransition(from: SettlementOperationState, to: SettlementOperationState): boolean {
  return VALID_LIFECYCLE_TRANSITIONS.some(
    transition => transition[0] === from && transition[1] === to
  );
}

// Initial state for new settlements
export const INITIAL_STATE: SettlementOperationState = SettlementOperationState.PENDING;

// State descriptions for observer pattern
export const STATE_DESCRIPTIONS: Record<SettlementOperationState, string> = {
  [SettlementOperationState.PENDING]: 'Settlement inicial, pendiente de procesar',
  [SettlementOperationState.PROCESSING]: 'Settlement en proceso de distribución',
  [SettlementOperationState.COMPLETED]: 'Settlement finalizada exitosamente',
  [SettlementOperationState.CLOSED]: 'Settlement cerrada, sin reversibilidad automática'
};

// State color coding (for UI/observability)
export const STATE_COLORS: Record<SettlementOperationState, string> = {
  [SettlementOperationState.PENDING]: '#6B7280',      // gray
  [SettlementOperationState.PROCESSING]: '#3B82F6',    // blue
  [SettlementOperationState.COMPLETED]: '#8B5CF6',     // violet
  [SettlementOperationState.CLOSED]: '#EF4444'          // red/terminal
};