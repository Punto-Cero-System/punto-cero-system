# models - Capability.ts
/**
 * Capability model for S41 System Global Capability Registry Foundation.
 * Universal model only - no vertical data, no SDK, no gateway.
 * Reuses existing S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry, S31 Commercial, S37 Global Administration, S38 Multi-Tenant, S39 Country Deployment, S40 Partner Operator.
 * Capability identification only, observer pattern only, no new capabilities created.
 */

export interface Capability {
  capabilityId: string;          // S11 Identity universal
  capabilityType: string;        // SYSTEM/PLATFORM/OPERATIONAL/COMMERCIAL/ADMINISTRATIVE/INTELLIGENCE
  capabilityStatus: string;      // S12 Authorization status
  scope: string;                 // Global/Regional/Country
  authorizationRequirement: string; // S12 Authorization requirement
  commercialReference: string;   // S31 Commercial reference
  consumerCompatibility: string; // S13 ConsumerRegistry compatibility
  createdAt?: string;            // Timestamp observer
  updatedAt?: string;            // Timestamp observer
}