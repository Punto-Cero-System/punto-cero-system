/*
 * OrchestrationLifecycle.ts - S51 System Global AI Agent Orchestration Foundation
 * Lifecycle model for orchestration, 7 states with observer pattern
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47, S48, S49, S50
 * Observer pattern only, no autonomous state changes
 * Estados: CREATED→VALIDATED→PLANNED→RUNNING↔PAUSED→COMPLETED→CLOSED
 */

// S51 Orchestration Lifecycle States
export type OrchestrationLifecycleState = 
  | 'CREATED'
  | 'VALIDATED'
  | 'PLANNED'
  | 'RUNNING'
  | 'PAUSED'
  | 'COMPLETED'
  | 'CLOSED';

// Valid orchestration transitions
export const validOrchestrationTransitions: {
  CREATED: ['VALIDATED', 'CLOSED'];
  VALIDATED: ['PLANNED', 'CLOSED'];
  PLANNED: ['RUNNING', 'CLOSED'];
  RUNNING: ['PAUSED', 'COMPLETED', 'CLOSED'];
  PAUSED: ['RUNNING', 'COMPLETED', 'CLOSED'];
} = {
  CREATED: ['VALIDATED', 'CLOSED'],
  VALIDATED: ['PLANNED', 'CLOSED'],
  PLANNED: ['RUNNING', 'CLOSED'],
  RUNNING: ['PAUSED', 'COMPLETED', 'CLOSED'],
  PAUSED: ['RUNNING', 'COMPLETED', 'CLOSED'];
};

// Universal orchestration lifecycle interface
export interface OrchestrationLifecycle {
  // S11 Identity Universal
  lifecycleId: {
    identityId: string;
    identityType: 'universal';
  };

  // Current state
  state: OrchestrationLifecycleState;

  // State timestamp
  stateTimestamp: number;

  // Previous state (for transition tracking)
  previousState?: OrchestrationLifecycleState;

  // Authorization context (S12/S50 enforcement)
  authorizationContext: {
    bypassAuthorization: false; // HARD CONSTRAINT
    authorizedBy: {
      identityId: string;
      identityType: 'universal';
    };
    authorizationTimestamp: number;
  };

  // Observer pattern — all state changes observed
  observedBy: {
    identity: {
      identityId: string;
      identityType: 'universal';
    };
    observationTimestamp: number;
    observationData: {
      previousState: OrchestrationLifecycleState;
      newState: OrchestrationLifecycleState;
      autonomous: false; // HARD CONSTRAINT — no autonomous state changes
    };
  };

  // Timestamps
  createdAt: number;
  updatedAt: number;
}

// Export type for external consumption
export type OrchestrationLifecycleType = OrchestrationLifecycle;