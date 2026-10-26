# models - CapabilityLifecycle.ts
/**
 * CapabilityLifecycle model for S41 System Global Capability Registry Foundation.
 * Lifecycle model only - capability states with observer pattern.
 * Reuses existing S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry, S37 Global Administration, S38 Multi-Tenant, S39 Country Deployment, S40 Partner Operator.
 * All lifecycle states observed, none autonomous.
 */

export interface CapabilityLifecycle {
  lifecycleId: string;           // S11 Identity universal
  capabilityId: string;          // S41 Capability reference
  currentState: string;          // DEFINED→VALIDATED→AVAILABLE→ASSIGNED→SUSPENDED→RETIRED
  previousState?: string;        // Previous lifecycle state
  stateTransitionAt?: string;    // Timestamp of last transition
  transitionAuthorizedBy?: string; // S12 authorization reference
  transitionObservedBy?: string;   // S37 administration reference
  transitionReason?: string;     // S12 transition reason
  assignedTerritory?: string;    // S39 Country Deployment (optional)
  assignedOperator?: string;     // S40 Partner Operator (optional)
  assignedTenant?: string;       // S38 Multi-Tenant (optional)
  createdAt?: string;            // Timestamp observer
  updatedAt?: string;            // Timestamp observer
}