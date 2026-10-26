/*
 * AllocationDistribution.ts — S46 System Global Settlement Foundation
 * Internal distribution of settlements.
 * Represents: distribution internal, participation, territorial references, operator references.
 * NO calcula impuestos, NO maneja dinero real, NO facturación fiscal
 * Reuses: S38, S39, S40, S44, S45
 * Observer pattern only
 */

// Allocation participation (observational only, no real money)
export type AllocationParticipation = {
  participantId: {
    identityId: string;
    identityType: 'universal';
  };
  participantType: 'tenant' | 'operator' | 'country' | 'global';
  participationPercentage: number; // Observational only, 0-100
  allocationScope: 'tenant' | 'country' | 'operator' | 'global';
  allocationAuthorizedBy: {
    identity: {
      identityId: string;
      identityType: 'universal';
    };
    authorizationTimestamp: number;
    bypassAuthorization: false; // HARD CONSTRAINT
  };
};

// Territorial allocation reference
export type TerritorialAllocation = {
  countryReference: {
    countryCode: string;
    countryName: string;
    territoryScope: 'global' | 'regional' | 'country';
    isVisibleToCountry: boolean;
  };
  operatorReference?: {
    operatorId: {
      identityId: string;
      identityType: 'universal';
    };
    operatorScope: 'partner' | 'direct';
  };
  tenantReference: {
    tenantId: {
      identityId: string;
      identityType: 'universal';
    };
    tenantScope: 'multi' | 'single';
  };
  allocationStatus: 'pending' | 'processing' | 'completed' | 'closed';
};

// Internal allocation/distribution record
export interface AllocationDistribution {
  // S11 Identity Universal
  allocationId: {
    identityId: string;
    identityType: 'universal';
  };

  // Reference to SettlementEntry (S46)
  settlementEntryRef: {
    settlementId: string;
    settlementType: 'settlement-entry';
  };

  // References to S38/S39/S40 (all optional, read-only)
  tenantRef?: TerritorialAllocation['tenantReference'];
  countryRef?: TerritorialAllocation['countryReference'];
  operatorRef?: TerritorialAllocation['operatorReference'];

  // S45 Financial Operations reference (optional)
  financialOperationRef?: {
    financialOperationId: {
      identityId: string;
      identityType: 'universal';
    };
    financialOperationStatus: 'DRAFT' | 'VALIDATED' | 'ACTIVE' | 'PROCESSING' | 'COMPLETED' | 'CLOSED';
  };

  // S44 Revenue reference (optional)
  revenueRef?: {
    revenueEntryId: {
      identityId: string;
      identityType: 'universal';
    };
    revenueStatus: 'draft' | 'validated' | 'active' | 'paused' | 'closed';
  };

  // Allocation participation (observational only)
  participations: AllocationParticipation[];

  // Allocation lifecycle state
  allocationState: 'pending' | 'processing' | 'completed' | 'closed';

  // Authorization (S12 enforcement)
  authorizedBy: {
    identity: {
      identityId: string;
      identityType: 'universal';
    };
    authorizationTimestamp: number;
    bypassAuthorization: false; // HARD CONSTRAINT
  };

  // Observer pattern
  observedBy: {
    identity: {
      identityId: string;
      identityType: 'universal';
    };
    observationTimestamp: number;
    observationData: {
      previousState: 'pending' | 'processing' | 'completed' | 'closed';
      newState: 'pending' | 'processing' | 'completed' | 'closed';
      autonomous: false; // HARD CONSTRAINT
    };
  };

  // Timestamps
  createdAt: number;
  updatedAt: number;

  // Audit fields
  assignmentId: {
    identityId: string;
    identityType: 'universal';
  };
  assignmentStatus: 'pending' | 'authorized' | 'rejected' | 'closed';
  assignmentObservedBy: {
    identity: {
      identityId: string;
      identityType: 'universal';
    };
    observationTimestamp: number;
  };
}

// Export type for external consumption
export type AllocationDistributionType = AllocationDistribution;