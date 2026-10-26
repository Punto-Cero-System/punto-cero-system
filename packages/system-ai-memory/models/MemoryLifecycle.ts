/*
 * MemoryLifecycle.ts - S49 System Global AI Memory Foundation
 * Lifecycle model for memory, 6 states with observer pattern
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47, S48
 * Observer pattern only, no autonomous state changes
 * NO aprendizaje autónomo, NO ejecución automática
 */

// S49 Memory Lifecycle States
export type MemoryLifecycleState = 
  | 'CREATED'
  | 'VALIDATED' 
  | 'AVAILABLE'
  | 'USED'
  | 'ARCHIVED'
  | 'RETIRED';

// Valid lifecycle transitions
export const validMemoryTransitions: {
  CREATED: ['VALIDATED', 'RETIRED'];
  VALIDATED: ['AVAILABLE', 'RETIRED'];
  AVAILABLE: ['USED', 'RETIRED'];
  USED: ['ARCHIVED', 'RETIRED'];
  ARCHIVED: ['RETIRED'];
} = {
  CREATED: ['VALIDATED', 'RETIRED'],
  VALIDATED: ['AVAILABLE', 'RETIRED'],
  AVAILABLE: ['USED', 'RETIRED'],
  USED: ['ARCHIVED', 'RETIRED'],
  ARCHIVED: ['RETIRED'];
};

// Universal memory lifecycle interface
export interface MemoryLifecycle {
  // S11 Identity Universal
  lifecycleId: {
    identityId: string;
    identityType: 'universal';
  };

  // Current state
  state: MemoryLifecycleState;

  // State timestamp
  stateTimestamp: number;

  // Previous state (for transition tracking)
  previousState?: MemoryLifecycleState;

  // Authorization context (S12 enforcement)
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
      previousState: MemoryLifecycleState;
      newState: MemoryLifecycleState;
      autonomous: false; // HARD CONSTRAINT — no autonomous state changes
    };
  };

  // Timestamps
  createdAt: number;
  updatedAt: number;
}

// Export type for external consumption
export type MemoryLifecycleType = MemoryLifecycle;