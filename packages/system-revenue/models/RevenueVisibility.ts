# models - RevenueVisibility.ts
/**
 * RevenueVisibility model for S44 System Global Revenue & Billing Foundation.
 * Visibility model only - scopes and visibility rules for revenue entries.
 * Reuses existing S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry, S31 Commercial, S37 Global Administration, S38 Multi-Tenant, S39 Country Deployment, S40 Partner Operator, S41 Capability Registry, S42 Marketplace, S43 Subscription.
 * All visibility rules observed, none autonomous.
 */

export interface RevenueVisibility {
  visibilityId: string;                  // S11 Identity universal
  revenueEntryId: string;                // S44 Revenue entry reference
  visibilityScope: string;               // Global/Regional/Country
  isVisibleToTenant: boolean;            // S38 Multi-Tenant visibility
  isVisibleToOperator: boolean;          // S40 Partner Operator visibility
  isVisibleToCountry: boolean;           // S39 Country Deployment visibility
  commercialVisibility: boolean;         // S31 Commercial visibility
  authorizedBy?: string;                 // S12 authorization reference
  observedBy?: string;                   // S37 administration reference
  createdAt?: string;                    // Timestamp observer
  updatedAt?: string;                    // Timestamp observer
}