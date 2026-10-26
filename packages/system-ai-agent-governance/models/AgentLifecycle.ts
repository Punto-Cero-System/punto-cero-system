/*
 * AgentLifecycle.ts - S50 System Global AI Agent Governance Foundation
 * Lifecycle model for agents, 6 states with observer pattern
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47, S48, S49
 * Observer pattern only, no autonomous state changes
 * Estados: REGISTERED→VALIDATED→AVAILABLE→ACTIVE↔SUSPENDED→RETIRED
 */

// S50 Agent Lifecycle States
export type AgentLifecycleState = 
  | 'REGISTERED'
  | 'VALIDATED' 
  | 'AVAILABLE'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'RETIRED';

// Valid lifecycle transitions
export const validAgentTransitions: {
  REGISTERED: ['VALIDATED', 'RETIRED'];
  VALIDATED: ['AVAILABLE', 'RETIRED'];
  AVAILABLE: ['ACTIVE', 'SUSPENDED', 'RETIRED'];
  ACTIVE: ['SUSPENDED', 'RETIRED'];
  SUSPENDED: ['ACTIVE', 'RETIRED'];
} = {
  REGISTERED: ['VALIDATED', 'RETIRED'],
  VALIDATED: ['AVAILABLE', 'RETIRED'],
  AVAILABLE: ['ACTIVE', 'SUSPENDED', 'RETIRED'],
  ACTIVE: ['SUSPENDED', 'RETIRED'],
  SUSPENDED: ['ACTIVE', 'RETIRED'];
};

// Universal agent lifecycle interface
export interface AgentLifecycle {
  // S11 Identity Universal
  lifecycleId: {
    identityId: string;
    identityType: 'universal';
  };

  // Current state
  state: AgentLifecycleState;

  // State timestamp
  stateTimestamp: number;

  // Previous state (for transition tracking)
  previousState?: AgentLifecycleState;

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
      previousState: AgentLifecycleState;
      newState: AgentLifecycleState;
      autonomous: false; // HARD CONSTRAINT — no autonomous state changes
    };
  };

  // Timestamps
  createdAt: number;
  updatedAt: number;
}

// Export type for external consumption
export type AgentLifecycleType = AgentLifecycle;