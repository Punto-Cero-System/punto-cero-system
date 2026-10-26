# models - SubscriptionLifecycle.ts
/**
 * SubscriptionLifecycle model for S43 System Global Subscription & Commercial Activation Foundation.
 * Lifecycle model only - subscription entry states with observer pattern.
 * Reuses existing S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry, S37 Global Administration, S38 Multi-Tenant, S39 Country Deployment, S40 Partner Operator, S41 Capability Registry, S42 Marketplace.
 * All lifecycle states observed, none autonomous.
 */

export interface SubscriptionLifecycle {
  lifecycleId: string;                   // S11 Identity universal
  subscriptionEntryId: string;           // S43 Subscription entry reference
  currentState: string;                  // DRAFT→VALIDATED→AVAILABLE→ACTIVE→SUSPENDED→CANCELLED→RETIRED
  previousState?: string;                // Previous lifecycle state
  stateTransitionAt?: string;            // Timestamp of last transition
  transitionAuthorizedBy?: string;       // S12 authorization reference
  transitionObservedBy?: string;         // S37 administration reference
  transitionReason?: string;             // S12 transition reason
  capabilityLink?: string;               // S41 Capability Registry link (optional)
  assignedTerritory?: string;            // S39 Country Deployment (optional)
  assignedOperator?: string;             // S40 Partner Operator (optional)
  assignedTenant?: string;               // S38 Multi-Tenant (optional)
  createdAt?: string;                    // Timestamp observer
  updatedAt?: string;                    // Timestamp observer
}