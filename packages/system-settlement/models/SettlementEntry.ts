/*
 * SettlementEntry.ts — S46 System Global Settlement Foundation
 * Universal model for settlement operations.
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45
 * NO real money, NO banking, NO taxes, NO fiscal invoices
 * bypassAuthorization: false enforced
 * Zero vertical contamination
 */

// S11 Identity Universal
export type S11Identity = {
  identityId: string;
  identityType: 'universal';
  createdAt: number;
  source: 'core';
};

// S12 Authorization Foundation enforcement
export type S12Enforcement = {
  bypassAuthorization: false;
  authorizedBy: S11Identity;
  authorizationDate: number;
};

// S13 Consumer Registry reference
export type S13Reference = {
  consumerRegistryId: S11Identity;
  compatibilityRules: string[];
  availabilityStatus: 'available' | 'unavailable';
};

// S31 Commercial Foundation reference
export type S31Reference = {
  commercialReferenceId: S11Identity;
  commercialScope: 'global' | 'regional' | 'country';
  authorizedChannels: string[];
};

// S37 Global Administration reference
export type S37Reference = {
  administrationId: S11Identity;
  observedBy: string[];
  observationDate: number;
};

// S38 Multi-Tenant reference
export type S38Reference = {
  tenantId: S11Identity;
  isVisibleToTenant: boolean;
  tenantScope: 'multi' | 'single';
};

// S39 Country Deployment reference
export type S39Reference = {
  countryCode: string;
  isVisibleToCountry: boolean;
  territoryScope: 'global' | 'regional' | 'country';
};

// S40 Partner Operator reference
export type S40Reference = {
  operatorId: S11Identity;
  isVisibleToOperator: boolean;
  operatorScope: 'partner' | 'direct';
};

// S41 Capability Registry reference
export type S41Reference = {
  capabilityRef: S11Identity;
  capabilityStatus: 'active' | 'inactive' | 'pending';
};

// S42 Marketplace reference
export type S42Reference = {
  marketplaceRef: S11Identity;
  marketplaceStatus: 'active' | 'inactive';
  distributionScope: 'global' | 'regional';
};

// S43 Subscription reference
export type S43Reference = {
  subscriptionId: S11Identity;
  subscriptionStatus: 'active' | 'paused' | 'closed';
  activationStatus: 'activated' | 'suspended';
};

// S44 Revenue reference
export type S44Reference = {
  revenueEntryId: S11Identity;
  revenueStatus: 'draft' | 'validated' | 'active' | 'paused' | 'closed';
  economicRegistration: string[];
};

// S45 Financial Operations reference
export type S45Reference = {
  financialOperationId: S11Identity;
  operationStatus: 'DRAFT' | 'VALIDATED' | 'ACTIVE' | 'PROCESSING' | 'COMPLETED' | 'CLOSED';
  operationContext: string[];
};

export interface SettlementEntry {
  // S11 Identity Universal - primary key
  settlementEntryId: S11Identity;

  // Economic base references (all optional, read-only)
  revenueEntryId?: S44Reference;  // References S44 Revenue
  financialOperationId?: S45Reference; // References S45 Financial Operations
  subscriptionId?: S43Reference; // References S43 Subscription
  marketplaceLink?: S42Reference; // References S42 Marketplace
  capabilityRef?: S41Reference;  // References S41 Capability Registry

  // Organizational references (all optional, read-only)
  tenantId?: S38Reference;       // References S38 Multi-Tenant
  countryId?: S39Reference;     // References S39 Country Deployment
  operatorId?: S40Reference;    // References S40 Partner Operator
  commercialReference?: S31Reference; // References S31 Commercial Foundation

  // S12 Authorization enforcement
  settlementAuthorizedBy: S12Enforcement;

  // S13 Consumer Registry observation
  compatibilityRules: S13Reference[];

  // Settlement-specific fields
  settlementScope: 'global' | 'regional' | 'country' | 'operator';
  settlementStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CLOSED';
  settlementObservedBy: S11Identity[];
  
  // Economic settlement context (observational only)
  economicSettlementContext: string[];
  observedBy: S11Identity[];
  
  // Timestamps (S11 pattern)
  createdAt: number;
  updatedAt: number;
  
  // Audit fields
  assignmentId: S11Identity;
  assignmentStatus: 'pending' | 'authorized' | 'rejected' | 'closed';
  assignmentObservedBy: S11Identity[];
}

// Export type for external consumption (read-only)
export type SettlementEntryType = SettlementEntry;