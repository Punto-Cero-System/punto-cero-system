/*
 * IntelligenceModel.ts — S48 System Global Intelligence Governance Foundation
 * Universal intelligence model, observational only, no autonomous execution
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47
 * NO ejecuta acciones, NO modifica consumidores, NO administra tenants/países/operadores
 * Observer pattern only
 * NO IA vertical: LEGAL_AI, MEDICAL_AI, BUSINESS_AI, PRODUCT_AI prohibido
 */

// S48 Intelligence Types (prohibited vertical types excluded)
export type IntelligenceType = 
  | 'GLOBAL'
  | 'OPERATIONAL' 
  | 'ANALYTICAL'
  | 'GOVERNANCE'
  | 'RECOMMENDATION';

// Prohibited intelligence types (vertical AI)
export const prohibitedIntelligenceTypes: IntelligenceType[] = [
  'LEGAL_AI',
  'MEDICAL_AI', 
  'BUSINESS_AI',
  'PRODUCT_AI';
];

// Universal intelligence interface — observational only
export interface IntelligenceModel {
  // S11 Identity Universal
  intelligenceId: {
    identityId: string;
    identityType: 'universal';
  };

  // Intelligence type classification (no vertical allowed)
  intelligenceType: IntelligenceType;

  // Source context where intelligence originates
  sourceContext: {
    sourceId: string;
    sourceType: 'S47' | 'S46' | 'S45' | 'S44' | 'S43' | 'S42' | 'S41' | 'S40' | 'S39' | 'S38' | 'other';
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

  // Lifecycle state
  lifecycle: 'DEFINED' | 'TRAINED' | 'VALIDATED' | 'AVAILABLE' | 'OBSERVED' | 'RETIRED';

  // Confidence level for the intelligence (0-100, observational only)
  confidenceLevel: number;

  // Reference to observed events (optional)
  observedEvents: {
    eventId: string;
    observationTimestamp: number;
    relevance: number; // 0-100
  }[];

  // Timestamps
  createdAt: number;
  updatedAt: number;
}

// Export type for external consumption
export type IntelligenceModelType = IntelligenceModel;