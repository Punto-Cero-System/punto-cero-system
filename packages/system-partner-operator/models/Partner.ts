# models - Partner.ts
/**
 * Partner model for S40 Global Partner & Operator Foundation.
 * Universal model only - no vertical data, no SDK, no gateway.
 * Reuses existing S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry, S31 Commercial, S37 Global Administration, S38 Multi-Tenant, S39 Country Deployment.
 * Partner identification only, observer pattern only, no new partners created.
 */

export interface Partner {
  partnerId: string;          // S11 Identity universal
  partnerType: string;        // Global/Regional/Country/Support/Technology
  partnerName: string;        // Generic partner name
  partnerStatus: string;      // S12 Authorization status
  partnerScope: string;       // Global/Regional/Country
  assignedTerritory: string;  // S39 Country Deployment link
  tenantLink: string;         // S38 Multi-Tenant link
  configuration: object;      // S31 Commercial configuration
  createdAt?: string;         // Timestamp observer
  updatedAt?: string;         // Timestamp observer
}