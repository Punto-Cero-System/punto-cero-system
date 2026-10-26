/*
 * KnowledgeContext.ts — S48 System Global Intelligence Governance Foundation
 * Universal knowledge context, no vertical contexts, observational only
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47
 * NO contexto vertical: LEGAL, MEDICAL, BUSINESS, ONE prohibido
 * Observer pattern only, no autonomous execution
 */

// S48 Context Scopes (no vertical allowed)
export type ContextScope = 
  | 'GLOBAL'
  | 'REGIONAL' 
  | 'COUNTRY'
  | 'TENANT';

// Prohibited vertical context types
export const prohibitedContextTypes: string[] = [
  'LEGAL_CONTEXT',
  'MEDICAL_CONTEXT', 
  'BUSINESS_CONTEXT',
  'ONE_CONTEXT';
];

// Universal knowledge context interface
export interface KnowledgeContext {
  // S11 Identity Universal
  contextId: {
    identityId: string;
    identityType: 'universal';
  };

  // Context scope (no vertical allowed)
  scope: ContextScope;

  // Source of knowledge
  sourceId: {
    identityId: string;
    identityType: 'universal';
  };

  // Validation status
  validationStatus: 'UNVALIDATED' | 'VALIDATED' | 'VALIDATION_PENDING' | 'ARCHIVED';

  // Authorization requirement (S12 enforcement)
  authorizationRequirement: 'S12_REQUIRED' | 'S12_COMPLETED' | 'S12_WAIVED' | 'NONE';

  // Context data — no vertical content allowed
  contextData: {
    [key: string]: any;
    // NO fields: legal, medical, business, one, or any vertical-specific content
  };

  // Observation tracking
  observedBy: {
    identity: {
      identityId: string;
      identityType: 'universal';
    };
    observationTimestamp: number;
    observationData: {
      previousState?: string;
      newState: string;
      autonomous: false; // HARD CONSTRAINT
    };
  };

  // Timestamps
  createdAt: number;
  updatedAt: number;
}

// Export type for external consumption
export type KnowledgeContextType = KnowledgeContext;