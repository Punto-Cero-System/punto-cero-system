/**
 * RecommendationEngine - Motor de recomendaciones de inteligencia System
 * 
 * Responsabilidad:
 - generar recomendaciones basadas en observaciones y análisis
 - asignar nivel de confianza (0.0 - 1.0)
 - mantener recomendaciones en estado GENERATED para revisión humana
 
 * Prohibido:
 - ejecutar recomendaciones automáticamente
 - modificar estados del System
 - reemplazar autorización o gobernanza
 */

import { createIntelligenceRecommendation } from '../models/IntelligenceRecommendation'
import { IntelligenceRecommendation } from '../models/IntelligenceRecommendation'

/**
 * Generate a intelligence recommendation based on analysis
 * Recommendation is created in GENERATED status for human review
 */
export function generateRecommendation(
  type: IntelligenceRecommendation['type'],
  description: string,
  confidence: number,
  status: IntelligenceRecommendation['status'] = 'GENERATED'
): IntelligenceRecommendation {
  // Validate confidence range
  if (confidence < 0.0 || confidence > 1.0) {
    throw new Error(`RecommendationEngine: Invalid confidence: ${confidence}. Must be between 0.0 and 1.0.`)
  }

  // Validate type is universal (not vertical)
  const permittedTypes = [
    'CONFIGURATION_SUGGESTION',
    'OPERATIONAL_OPTIMIZATION',
    'SECURITY_ENHANCEMENT',
    'PERFORMANCE_IMPROVEMENT',
    'COMMERCIAL_OPTIMIZATION',
    'ADMINISTRATIVE_IMPROVEMENT'
  ]

  if (!permittedTypes.includes(type)) {
    throw new Error(`RecommendationEngine: Invalid type: ${type}. Only universal recommendation types permitted.`)
  }

  // Create recommendation in GENERATED status for human review
  // NO ejecutar automáticamente, NO modificar estados, NO reemplazar autorización
  const recommendation = createIntelligenceRecommendation(
    type,
    description,
    confidence,
    status
  )

  return recommendation
}

/**
 * Batch generate multiple recommendations
 * Each recommendation is independent, no coordinated action that could bypass authorization
 */
export function batchGenerateRecommendations(
  recommendations: Array<{
    type: IntelligenceRecommendation['type']
    description: string
    confidence: number
    status?: IntelligenceRecommendation['status']
  }>
): IntelligenceRecommendation[] {
  const results: IntelligenceRecommendation[] = []

  for (const rec of recommendations) {
    try {
      const recommendation = generateRecommendation(
        rec.type,
        rec.description,
        rec.confidence,
        rec.status
      )
      results.push(recommendation)
    } catch (error) {
      // Skip invalid recommendation, continue batch
      // NO execute, NO modify, just skip
    }
  }

  return results
}

/**
 * Update recommendation status to REVIEWED by human operator
 * This is the only allowed state transition: GENERATED -> REVIEWED
 * All other transitions require manual human approval outside this engine
 */
export function reviewRecommendation(
  recommendationId: string,
  currentStatus: IntelligenceRecommendation['status']
): IntelligenceRecommendation['status'] {
  // Only allow GENERATED -> REVIEWED transition
  if (currentStatus === 'GENERATED') {
    return 'REVIEWED'
  }
  // If already reviewed, rejected, or accepted, no automatic change
  // Human operator must decide ACCEPT or REJECT outside this engine
  return currentStatus
}