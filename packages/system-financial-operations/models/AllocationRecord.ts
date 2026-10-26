/*
 * AllocationRecord.ts — S45 System Global Financial Operations Foundation
 * Internal distribution of economic operations.
 * Represents: distribution internal, participation, territorial references, operator references.
 * NO calcula impuestos, NO maneja dinero real, NO facturación fiscal
 * Reuses: S38, S39, S40, S44
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

// Internal allocation record
export interface AllocationRecord {
  // S11 Identity Universal
  allocationId: {
    identityId: string;
    identityType: 'universal';
  };

  // Reference to FinancialOperation (S45)
  financialOperationRef: {
    operationId: string;
    operationType: 'financial-operation';
  };

  // References to S38/S39/S40 (all optional, read-only)
  tenantRef?: TerritorialAllocation['tenantReference'];
  countryRef?: TerritorialAllocation['countryReference'];
  operatorRef?: TerritorialAllocation['operatorReference'];

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
export type AllocationRecordType = AllocationRecord;