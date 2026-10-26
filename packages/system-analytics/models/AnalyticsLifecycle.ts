/*
 * AnalyticsLifecycle.ts — S47 System Global Analytics Foundation
 * Lifecycle model for analytics metrics, 5 states with observer pattern
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46
 * Observer pattern only, no autonomous execution
 * NO calcula impuestos, NO maneja dinero real, NO facturación fiscal
 * NO analiza Legal, Medical, Business, One
 */

// S47 Analytics Lifecycle States
export type AnalyticsLifecycleState = 
  | 'DEFINED'
  | 'VALIDATED' 
  | 'ACTIVE'
  | 'OBSERVED'
  | 'ARCHIVED';

// Valid lifecycle transitions (observer pattern enforced)
export const validAnalyticsTransitions: {
  DEFINED: ['VALIDATED', 'ARCHIVED'];
  VALIDATED: ['ACTIVE', 'ARCHIVED'];
  ACTIVE: ['OBSERVED', 'ARCHIVED'];
  OBSERVED: ['ARCHIVED'];
} = {
  DEFINED: ['VALIDATED', 'ARCHIVED'],
  VALIDATED: ['ACTIVE', 'ARCHIVED'],
  ACTIVE: ['OBSERVED', 'ARCHIVED'],
  OBSERVED: ['ARCHIVED'];
};

// Universal analytics lifecycle interface
export interface AnalyticsLifecycle {
  // S11 Identity Universal
  lifecycleId: {
    identityId: string;
    identityType: 'universal';
  };

  // Current state
  state: AnalyticsLifecycleState;

  // State timestamp
  stateTimestamp: number;

  // Previous state (for transition tracking)
  previousState?: AnalyticsLifecycleState;

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
      previousState: AnalyticsLifecycleState;
      newState: AnalyticsLifecycleState;
      autonomous: false; // HARD CONSTRAINT — no autonomous state changes
    };
  };

  // Reference to observed event (optional)
  observedEventRef?: {
    eventId: {
      identityId: string;
      identityType: 'universal';
    };
    eventType: AnalyticsEventType;
  };

  // Timestamps
  createdAt: number;
  updatedAt: number;
}

// Export type for external consumption
export type AnalyticsLifecycleInterface = AnalyticsLifecycle;