/*
 * ContextRelationship.ts - S49 System Global AI Memory Foundation
 * Universal context relationships, authorized only, observer pattern
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47, S48
 * NO relaciones verticales, NO acceso sin autorización
 * Observer pattern only
 */

// S49 Relation Types
export type RelationType = 
  | 'EVENT_REFERENCE'
  | 'KNOWLEDGE_REFERENCE' 
  | 'RECOMMENDATION_REFERENCE'
  | 'OPERATION_REFERENCE';

// Universal context relationship interface
export interface ContextRelationship {
  // S11 Identity Universal
  relationshipId: {
    identityId: string;
    identityType: 'universal';
  };

  // Source memory
  sourceMemory: {
    memoryId: {
      identityId: string;
      identityType: 'universal';
    };
    memoryType: MemoryType;
  };

  // Target memory
  targetMemory: {
    memoryId: {
      identityId: string;
      identityType: 'universal';
    };
    memoryType: MemoryType;
  };

  // Type of relationship
  relationType: RelationType;

  // Authorization requirement (S12 enforcement)
  authorizationRequirement: {
    bypassAuthorization: false; // HARD CONSTRAINT
    authorizedBy: {
      identityId: string;
      identityType: 'universal';
    };
    authorizationTimestamp: number;
  };

  // Relationship validation status
  validationStatus: 'UNVALIDATED' | 'VALIDATED' | 'VALIDATION_PENDING' | 'ARCHIVED';

  // Timestamps
  createdAt: number;
  updatedAt: number;
}

// Export type for external consumption
export type ContextRelationshipType = ContextRelationship;