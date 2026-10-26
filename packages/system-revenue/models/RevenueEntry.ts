# models - RevenueEntry.ts
/**
 * RevenueEntry model for S44 System Global Revenue & Billing Foundation.
 * Universal model only - no vertical data, no SDK, no gateway.
 * Reuses existing S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry, S31 Commercial, S37 Global Administration, S38 Multi-Tenant, S39 Country Deployment, S40 Partner Operator, S41 Capability Registry, S42 Marketplace, S43 Subscription.
 * Revenue entry identification only, observer pattern only, no products created.
 */

export interface RevenueEntry {
  revenueEntryId: string;          // S11 Identity universal
  subscriptionLink: string;        // S43 Subscription reference
  capabilityRef: string;           // S41 Capability Registry reference
  marketplaceLink: string;         // S42 Marketplace reference
  commercialReference: string;     // S31 Commercial reference
  availabilityStatus: string;      // DRAFT/VALIDATED/ACTIVE/PAUSED/CLOSED (5 states)
  visibilityScope: string;         // Global/Regional/Country
  assignedTerritory: string;       // S39 Country Deployment link (optional)
  assignedOperator: string;        // S40 Partner Operator link (optional)
  assignedTenant: string;          // S38 Multi-Tenant link (optional)
  assignmentId?: string;           // S12 Authorization reference
  assignmentStatus?: string;       // Current assignment state
  createdAt?: string;              // Timestamp observer
  updatedAt?: string;              // Timestamp observer
}