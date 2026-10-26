# models - MarketplaceEntry.ts
/**
 * MarketplaceEntry model for S42 System Global Marketplace Foundation.
 * Universal model only - no vertical data, no SDK, no gateway.
 * Reuses existing S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry, S31 Commercial, S37 Global Administration, S38 Multi-Tenant, S39 Country Deployment, S40 Partner Operator, S41 Capability Registry.
 * Marketplace entry identification only, observer pattern only, no new entries created.
 */

export interface MarketplaceEntry {
  marketplaceEntryId: string;          // S11 Identity universal
  capabilityId: string;                // S41 Capability Registry reference
  availabilityStatus: string;          // DRAFT/VALIDATED/PUBLISHED/AVAILABLE/SUSPENDED/RETIRED
  visibilityScope: string;             // Global/Regional/Country
  commercialReference: string;         // S31 Commercial reference
  compatibilityRules: string;          // S13 ConsumerRegistry compatibility
  createdAt?: string;                  // Timestamp observer
  updatedAt?: string;                  // Timestamp observer
}