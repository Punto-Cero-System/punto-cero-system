# models - Operator.ts
/**
 * Operator model for S40 Global Partner & Operator Foundation.
 * Universal model only - no vertical data, no SDK, no gateway.
 * Reuses existing S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry, S31 Commercial, S37 Global Administration, S38 Multi-Tenant, S39 Country Deployment.
 * Operator identification only, observer pattern only, no new operators created.
 */

export interface Operator {
  operatorId: string;         // S11 Identity universal
  operatorType: string;       // Global/Regional/Country/Support/Technology
  operatorName: string;       // Generic operator name
  operatorStatus: string;     // S12 Authorization status
  operatorScope: string;      // Global/Regional/Country
  assignedTerritory: string;  // S39 Country Deployment link
  partnerLink: string;        // S40 Partner link
  tenantLink: string;         // S38 Multi-Tenant link
  lifecycleState: string;     // Lifecycle: PROPOSED→VALIDATED→AUTHORIZED→ACTIVE→SUSPENDED→CLOSED
  configuration: object;      // S31 Commercial configuration
  createdAt?: string;         // Timestamp observer
  updatedAt?: string;         // Timestamp observer
}