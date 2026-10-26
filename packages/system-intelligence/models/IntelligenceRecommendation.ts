/**
 * IntelligenceRecommendation - Modelo universal para recomendaciones de inteligencia System
 * 
 * Propósito: Recomendaciones generadas por inteligencia System
 * 
 * Estados:
 * - 'GENERATED': Recomendación generada, pending review
 * - 'REVIEWED': Revisada por operador humano
 * - 'ACCEPTED': Aceptada para implementación
 * - 'REJECTED': Descartada, sin implementación
 * 
 * type values (universales, NO vertical):
 * - 'CONFIGURATION_SUGGESTION'
 * - 'OPERATIONAL_OPTIMIZATION'
 * - 'SECURITY_ENHANCEMENT'
 * - 'PERFORMANCE_IMPROVEMENT'
 * - 'COMMERCIAL_OPTIMIZATION'
 * - 'ADMINISTRATIVE_IMPROVEMENT'
 * 
 * NO incluye: acciones autónomas críticas, reemplazo de autorización, modificación de políticas
 */

export interface IntelligenceRecommendation {
  recommendationId: string
  type: 'CONFIGURATION_SUGGESTION' | 'OPERATIONAL_OPTIMIZATION' | 'SECURITY_ENHANCEMENT' | 'PERFORMANCE_IMPROVEMENT' | 'COMMERCIAL_OPTIMIZATION' | 'ADMINISTRATIVE_IMPROVEMENT'
  description: string
  confidence: number  // 0.0 - 1.0
  createdAt: Date
  status: 'GENERATED' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED'
}

/**
 * IntelligenceRecommendation creation validation
 * Validates type is from permitted universals, confidence is 0.0-1.0, status is valid
 */

export function createIntelligenceRecommendation(
  type: IntelligenceRecommendation['type'],
  description: string,
  confidence: number,
  status: IntelligenceRecommendation['status'] = 'GENERATED'
): IntelligenceRecommendation {
  // Permitted types (universal only, NO vertical)
  const permittedTypes = [
    'CONFIGURATION_SUGGESTION',
    'OPERATIONAL_OPTIMIZATION',
    'SECURITY_ENHANCEMENT',
    'PERFORMANCE_IMPROVEMENT',
    'COMMERCIAL_OPTIMIZATION',
    'ADMINISTRATIVE_IMPROVEMENT'
  ]

  if (!permittedTypes.includes(type)) {
    throw new Error(`Invalid type: ${type}. Must be universal recommendation type only.`)
  }

  // Validate confidence is between 0.0 and 1.0
  if (confidence < 0.0 || confidence > 1.0) {
    throw new Error(`Invalid confidence: ${confidence}. Must be between 0.0 and 1.0.`)
  }

  // Validate status
  const permittedStatuses = ['GENERATED', 'REVIEWED', 'ACCEPTED', 'REJECTED']
  if (!permittedStatuses.includes(status)) {
    throw new Error(`Invalid status: ${status}. Must be one of: ${permittedStatuses.join(', ')}`)
  }

  return {
    recommendationId: crypto.randomUUID(),
    type,
    description,
    confidence,
    createdAt: new Date(),
    status
  }
}