/**
 * IntelligenceValidator - Validador de componentes de inteligencia System
 * Validaciones obligatorias: sourceComponent válido, contexto válido, 
 * datos no verticales, separación L1/L2, no bypass Authorization, observación sin ejecución
 */
export interface IntelligenceValidator {
  /**
   * Validar IntelligenceContext
   * Checks: sourceComponent permitted, eventType permitted, no vertical data in metadata
   */
  validateContext(context: IntelligenceContext): { valid: true } | { valid: false; errors: string[] }

  /**
   * Validar IntelligenceObservation
   * Checks: category permitted, severity permitted, sourceComponent permitted, no vertical data
   */
  validateObservation(observation: IntelligenceObservation): { valid: true } | { valid: false; errors: string[] }

  /**
   * Validar IntelligenceRecommendation
   * Checks: type permitted, confidence range 0.0-1.0, status permitted, no vertical data in description
   */
  validateRecommendation(recommendation: IntelligenceRecommendation): { valid: true } | { valid: false; errors: string[] }

  /**
   * Validación comprehensiva de todos los componentes de inteligencia
   */
  validateExecution(context: IntelligenceContext, observation: IntelligenceObservation, recommendation: IntelligenceRecommendation): {
    contextValid: boolean
    observationValid: boolean
    recommendationValid: boolean
    overallValid: boolean
    bypassAuthorization: false
  }

  /**
   * Verificar que sourceComponent sea de capas S10-S32 permitidas solo
   */
  verifySourceLayer(sourceComponent: string): 'L1-permitted' | 'L2-prohibited' | 'unknown'
}