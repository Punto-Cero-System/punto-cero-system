/**
 * ObservationEngine - Motor de observación de inteligencia System
 * 
 * Responsabilidad:
 - transformar contextos de inteligencia en observaciones
 - clasificar patrones en categorías universales
 - detectar anomalías y estados del System
 
 * Prohibido:
 - modificar estados del System
 - ejecutar acciones críticas
 - llamar consumidores L2
 */

import { createIntelligenceObservation } from '../models/IntelligenceObservation'
import { IntelligenceObservation } from '../models/IntelligenceObservation'

/**
 * Analyze an intelligence context and generate an observation
 * Transforms context into a categorized observation with severity
 */
export function analyzeContextToObservation(
  context: IntelligenceContext,
  additionalSeverity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
): IntelligenceObservation {
  // Determine category based on eventType
  let category: 'operational' | 'security' | 'performance' | 'commercial' | 'governance'

  switch (context.eventType) {
    case 'GOVERNANCE_EVENT':
      category = 'governance'
      break
    case 'POLICY_DECISION':
      category = 'governance'
      break
    case 'EXECUTION_OPERATION':
      category = 'operational'
      break
    case 'SYSTEM_EVENT':
      category = 'operational'
      break
    case 'PRODUCTION_METRIC':
      category = 'performance'
      break
    case 'COMMERCIAL_STATE':
      category = 'commercial'
      break
    case 'CONTROL_PLANE_STATE':
      category = 'operational'
      break
    case 'IDENTITY_EVENT':
      category = 'security'
      break
    default:
      // Default to operational if eventType not mapped
      category = 'operational'
  }

  // Determine severity
  const severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' =
    additionalSeverity || 'LOW'

  // Validate sourceComponent is from permitted S10-S32
  const source = context.sourceComponent
  const permittedComponents = [
    'S11', 'S12', 'S13', 'S14', 'S19', 'S20',
    'S21', 'S22', 'S23', 'S25', 'S26', 'S26++', 'S27', 'S28',
    'S29', 'S30', 'S31', 'S32'
  ]

  if (!permittedComponents.includes(source)) {
    throw new Error(`ObservationEngine: Invalid source: ${source}. Only S10-S32 components permitted.`)
  }

  return createIntelligenceObservation(
    category,
    severity,
    source
  )
}

/**
 * Batch analyze multiple contexts into observations
 * Processes each context independently, no shared state that could modify System
 */
export function batchAnalyzeContexts(
  contexts: IntelligenceContext[]
): IntelligenceObservation[] {
  const observations: IntelligenceObservation[] = []

  for (const context of contexts) {
    try {
      const observation = analyzeContextToObservation(context)
      observations.push(observation)
    } catch (error) {
      // Skip invalid contexts, continue batch processing
      // NO modify System state, just skip
    }
  }

  return observations
}