# models - OperatorAssignment.ts
/**
 * OperatorAssignment model for S40 Global Partner & Operator Foundation.
 * Assignment model only - links operators to partners, territories, and tenants.
 * Reuses existing S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry, S38 Multi-Tenant, S39 Country Deployment.
 * No vertical data, no SDK, no gateway.
 */

export interface OperatorAssignment {
  assignmentId: string;       // S11 Identity universal
  operatorId: string;         // S40 Operator reference
  partnerId: string;          // S40 Partner reference
  assignedTerritory: string;  // S39 Country Deployment
  tenantLink: string;         // S38 Multi-Tenant link
  authorizationId: string;    // S12 Authorization reference
  assignmentStatus: string;   // PROPOSED/VALIDATED/AUTHORIZED/ACTIVE/SUSPENDED/CLOSED
  assignedAt?: string;        // Timestamp observer
  updatedAt?: string;         // Timestamp observer
  validationReason?: string;  // S12 validation reason
}