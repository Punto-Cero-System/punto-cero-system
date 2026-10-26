# models - RevenueLifecycle.ts
/**
 * RevenueLifecycle model for S44 System Global Revenue & Billing Foundation.
 * Lifecycle model only - revenue entry states with observer pattern.
 * Reuses existing S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry, S31 Commercial, S37 Global Administration, S38 Multi-Tenant, S39 Country Deployment, S40 Partner Operator, S41 Capability Registry, S42 Marketplace, S43 Subscription.
 * All lifecycle states observed, none autonomous.
 */

export interface RevenueLifecycle {
  lifecycleId: string;                   // S11 Identity universal
  revenueEntryId: string;                // S44 Revenue entry reference
  currentState: string;                  // DRAFT→VALIDATED→ACTIVE→PAUSED→CLOSED (5 states)
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