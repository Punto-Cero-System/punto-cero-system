/*
 * IntelligenceLifecycle.ts — S48 System Global Intelligence Governance Foundation
 * Lifecycle model for intelligence, 6 states with observer pattern
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47
 * Observer pattern only, no autonomous state changes
 * NO IA vertical, NO ejecución autónoma, NO decisiones automáticas
 */

// S48 Intelligence Lifecycle States
export type IntelligenceLifecycleState = 
  | 'DEFINED'
  | 'TRAINED' 
  | 'VALIDATED'
  | 'AVAILABLE'
  | 'OBSERVED'
  | 'RETIRED';

// Valid lifecycle transitions (observer pattern enforced)
export const validIntelligenceTransitions: {
  DEFINED: ['TRAINED', 'RETIRED'];
  TRAINED: ['VALIDATED', 'RETIRED'];
  VALIDATED: ['AVAILABLE', 'RETIRED'];
  AVAILABLE: ['OBSERVED', 'RETIRED'];
  OBSERVED: ['RETIRED'];
} = {
  DEFINED: ['TRAINED', 'RETIRED'],
  TRAINED: ['VALIDATED', 'RETIRED'],
  VALIDATED: ['AVAILABLE', 'RETIRED'],
  AVAILABLE: ['OBSERVED', 'RETIRED'],
  OBSERVED: ['RETIRED'];
};

// Universal intelligence lifecycle interface
export interface IntelligenceLifecycle {
  // S11 Identity Universal
  lifecycleId: {
    identityId: string;
    identityType: 'universal';
  };

  // Current state
  state: IntelligenceLifecycleState;

  // State timestamp
  stateTimestamp: number;

  // Previous state (for transition tracking)
  previousState?: IntelligenceLifecycleState;

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
      previousState: IntelligenceLifecycleState;
      newState: IntelligenceLifecycleState;
      autonomous: false; // HARD CONSTRAINT — no autonomous state changes
    };
  };

  // Reference to observed intelligence (optional)
  observedIntelligenceRef?: {
    intelligenceId: {
      identityId: string;
      identityType: 'universal';
    };
    intelligenceType: IntelligenceType;
  };

  // Timestamps
  createdAt: number;
  updatedAt: number;
}

// Export type for external consumption
export type IntelligenceLifecycleType = IntelligenceLifecycle;