/*
 * MemoryEntry.ts - S49 System Global AI Memory Foundation
 * Universal memory entry, authorized only, no vertical, no personal
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47, S48
 * NO memoria vertical, NO memoria personal no autorizada, NO aprendizaje autónomo
 * Observer pattern only, no autonomous execution
 */

// S49 Memory Types (prohibited vertical/personal types excluded)
export type MemoryType = 
  | 'SYSTEM_CONTEXT'
  | 'OPERATIONAL_CONTEXT' 
  | 'ANALYTICAL_CONTEXT'
  | 'INTELLIGENCE_CONTEXT'
  | 'GOVERNANCE_CONTEXT';

// Prohibited memory types (vertical/personal)
export const prohibitedMemoryTypes: string[] = [
  'USER_PRIVATE_MEMORY',
  'LEGAL_MEMORY', 
  'MEDICAL_MEMORY',
  'BUSINESS_MEMORY',
  'VERTICAL_MEMORY';
];

// Universal memory entry interface
export interface MemoryEntry {
  // S11 Identity Universal
  memoryId: {
    identityId: string;
    identityType: 'universal';
  };

  // Memory type classification (no vertical/personal allowed)
  memoryType: MemoryType;

  // Source reference where memory originates
  sourceReference: {
    sourceId: string;
    sourceType: 'S47' | 'S48' | 'S46' | 'S45' | 'S44' | 'S43' | 'S42' | 'S41' | 'S40' | 'S39' | 'S38' | 'other';
    sourceTimestamp: number;
  };

  // Authorization context (S12 enforcement)
  authorizationContext: {
    bypassAuthorization: false; // HARD CONSTRAINT
    authorizedBy: {
      identityId: string;
      identityType: 'universal';
    };
    authorizationTimestamp: number;
  };

  // Context scope
  contextScope: 'GLOBAL' | 'REGIONAL' | 'COUNTRY' | 'TENANT';

  // Lifecycle status
  lifecycleStatus: 'CREATED' | 'VALIDATED' | 'AVAILABLE' | 'USED' | 'ARCHIVED' | 'RETIRED';

  // Retention policy
  retentionPolicy: 'SHORT_TERM' | 'MEDIUM_TERM' | 'LONG_TERM' | 'PERMANENT';

  // Related memories (references only)
  relatedMemories: {
    memoryId: {
      identityId: string;
      identityType: 'universal';
    };
    relationType: 'EVENT_REFERENCE' | 'KNOWLEDGE_REFERENCE' | 'RECOMMENDATION_REFERENCE' | 'OPERATION_REFERENCE';
    relationStrength: number; // 0-100
  }[];

  // Timestamps
  createdAt: number;
  updatedAt: number;
  accessedAt?: number;
}

// Export type for external consumption
export type MemoryEntryType = MemoryEntry;