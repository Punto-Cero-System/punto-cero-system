# models - CountryLifecycle.ts
/**
 * CountryLifecycle model for S39 Global Country Deployment Foundation.
 * Lifecycle states only - PLANNED → CONFIGURED → VALIDATED → ACTIVE → SUSPENDED → CLOSED.
 * No vertical data, no real country transitions, observer pattern only.
 * Reuses existing S12 AuthorizationFoundation (bypassAuthorization: false), S37 Global Administration.
 * Lifecycle management only, no autonomous actions.
 */

export type CountryLifecycleState =
  | 'PLANNED'
  | 'CONFIGURED'
  | 'VALIDATED'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'CLOSED';

export interface CountryLifecycle {
  countryId: string;          // S11 Identity reference
  currentState: CountryLifecycleState;
  previousState?: CountryLifecycleState;
  transitionHistory: Array<{
    from: CountryLifecycleState;
    to: CountryLifecycleState;
    timestamp: string;
    authorizedBy: string;     // S12 Authorization reference
    reason?: string;
  }>;
  nextAllowedTransitions: CountryLifecycleState[];
  lastTransitionAt?: string;
  authorizedBy?: string;      // S12 Authorization reference
  suspensionReason?: string;  // If suspended
  closureReason?: string;     // If closed
  createdAt?: string;         // Timestamp observer
  updatedAt?: string;         // Timestamp observer
}