/*
 * Recommendation.ts — S48 System Global Intelligence Governance Foundation
 * Universal recommendation model, observational only, NEVER executes actions
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47
 * Estados: CREATED, VALIDATED, PENDING_REVIEW, APPROVED, REJECTED, ARCHIVED
 * Una recomendación NUNCA ejecuta acciones
 * NO IA vertical: LEGAL_AI, MEDICAL_AI, BUSINESS_AI, PRODUCT_AI prohibido
 */

// S48 Recommendation Status types
export type RecommendationStatus = 
  | 'CREATED'
  | 'VALIDATED' 
  | 'PENDING_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'ARCHIVED';

// Prohibited recommendation action directives
export const prohibitedRecommendationDirectives: string[] = [
  'execute',
  'run', 
  'decide',
  'implement',
  'autonomous',
  'automático'
];

// Universal recommendation interface — observational only, never executes actions
export interface RecommendationModel {
  // S11 Identity Universal
  recommendationId: {
    identityId: string;
    identityType: 'universal';
  };

  // Source intelligence that generated this recommendation
  sourceIntelligence: {
    intelligenceId: {
      identityId: string;
      identityType: 'universal';
    };
    intelligenceType: IntelligenceType;
  };

  // Confidence level (0-100, observational only)
  confidence: number;

  // Current status
  status: RecommendationStatus;

  // Authorization requirement for approval (S12 enforcement)
  authorizationRequirement: {
    bypassAuthorization: false; // HARD CONSTRAINT
    authorizedBy?: {
      identityId: string;
      identityType: 'universal';
    };
    authorizationTimestamp?: number;
  };

  // Recommendation content — interpretive insights only, NO action directives
  recommendationContent: {
    // Interpretive insights only
    insight: string;
    // NO: execute(), run(), decide(), implement() allowed
    // ONLY: observe, recommend, analyze, suggest, interpret
    // Strictly forbidden: any action directive that could execute automatically
  };

  // Approval tracking (optional)
  approvalTracking: {
    approvedBy?: {
      identityId: string;
      identityType: 'universal';
    };
    approvedTimestamp?: number;
    approvalReason?: string;
  };

  // Observation tracking — all recommendations observed, none autonomous
  observedBy: {
    identity: {
      identityId: string;
      identityType: 'universal';
    };
    observationTimestamp: number;
    observationData: {
      previousState: RecommendationStatus;
      newState: RecommendationStatus;
      autonomous: false; // HARD CONSTRAINT — never autonomous
    };
  };

  // Timestamps
  createdAt: number;
  updatedAt: number;
}

// Export type for external consumption
export type RecommendationModelType = RecommendationModel;