# models - SubscriptionVisibility.ts
/**
 * SubscriptionVisibility model for S43 System Global Subscription & Commercial Activation Foundation.
 * Visibility model only - scopes and visibility rules for subscription entries.
 * Reuses existing S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry, S31 Commercial, S37 Global Administration, S38 Multi-Tenant, S39 Country Deployment, S40 Partner Operator, S41 Capability Registry, S42 Marketplace.
 * All visibility rules observed, none autonomous.
 */

export interface SubscriptionVisibility {
  visibilityId: string;                  // S11 Identity universal
  subscriptionEntryId: string;           // S43 Subscription entry reference
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