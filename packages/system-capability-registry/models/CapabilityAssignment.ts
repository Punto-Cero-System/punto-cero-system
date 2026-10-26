# models - CapabilityAssignment.ts
/**
 * CapabilityAssignment model for S41 System Global Capability Registry Foundation.
 * Assignment model only - links capabilities to countries, operators, and tenants.
 * Reuses existing S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry, S38 Multi-Tenant, S39 Country Deployment, S40 Partner Operator.
 * No vertical data, no SDK, no gateway.
 */

export interface CapabilityAssignment {
  assignmentId: string;          // S11 Identity universal
  capabilityId: string;          // S41 Capability reference
  assignedTerritory: string;     // S39 Country Deployment
  operatorLink: string;          // S40 Partner Operator link
  tenantLink: string;            // S38 Multi-Tenant link
  authorizationId: string;       // S12 Authorization reference
  assignmentStatus: string;      // DEFINED/VALIDATED/AVAILABLE/ASSIGNED/SUSPENDED/RETIRED
  assignedAt?: string;           // Timestamp observer
  updatedAt?: string;            // Timestamp observer
  validationReason?: string;     // S12 validation reason
}