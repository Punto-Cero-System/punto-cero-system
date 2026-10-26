# models - SubscriptionEntry.ts
/**
 * SubscriptionEntry model for S43 System Global Subscription & Commercial Activation Foundation.
 * Universal model only - no vertical data, no SDK, no gateway.
 * Reuses existing S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry, S31 Commercial, S37 Global Administration, S38 Multi-Tenant, S39 Country Deployment, S40 Partner Operator, S41 Capability Registry, S42 Marketplace.
 * Subscription entry identification only, observer pattern only, no products created.
 */

export interface SubscriptionEntry {
  subscriptionEntryId: string;          // S11 Identity universal
  capabilityRef: string;                 // S41 Capability Registry reference
  marketplaceLink: string;               // S42 Marketplace reference
  availabilityStatus: string;            // DRAFT/VALIDATED/AVAILABLE/ACTIVE/SUSPENDED/RETIRED
  visibilityScope: string;               // Global/Regional/Country
  commercialReference: string;           // S31 Commercial reference
  compatibilityRules: string;            // S13 ConsumerRegistry compatibility
  assignedTerritory: string;             // S39 Country Deployment link
  operatorLink: string;                  // S40 Partner Operator link
  tenantLink: string;                    // S38 Multi-Tenant link
  assignmentId?: string;                 // S12 Authorization reference
  assignmentStatus?: string;             // Current assignment state
  createdAt?: string;                    // Timestamp observer
  updatedAt?: string;                    // Timestamp observer
}