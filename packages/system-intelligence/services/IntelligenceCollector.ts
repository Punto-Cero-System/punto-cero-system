/**
 * IntelligenceCollector - Servicio de recopilación de inteligencia System
 * 
 * Responsabilidad:
 * - recibir eventos universales del System
 - recopilar información permitida (S10-S32 only)
 - crear IntelligenceContext para análisis
 * 
 * Prohibido:
 * - ejecutar acciones críticas
 - modificar estados externos
 - llamar consumidores L2
 */

import { createIntelligenceContext } from '../models/IntelligenceContext'
import { IntelligenceContext } from '../models/IntelligenceContext'

/**
 * Collect intelligence context from a system event
 * Only processes events from permitted S10-S32 components
 */
export function collectIntelligenceContext(
  sourceComponent: string,
  eventType: string,
  contextId: string,
  metadata?: Record<string, unknown>
): IntelligenceContext {
  // Validación: sourceComponent debe ser componente S10-S32 permitido
  const permittedComponents = [
    'S11', 'S12', 'S13', 'S14', 'S19', 'S20',
    'S21', 'S22', 'S23', 'S25', 'S26', 'S26++', 'S27', 'S28',
    'S29', 'S30', 'S31', 'S32'
  ]

  if (!permittedComponents.includes(sourceComponent)) {
    throw new Error(`IntelligenceCollector: Invalid sourceComponent: ${sourceComponent}. Only S10-S32 components permitted.`)
  }

  // Validación: eventType debe ser tipo universal permitido
  const permittedEventTypes = [
    'GOVERNANCE_EVENT',
    'POLICY_DECISION',
    'EXECUTION_OPERATION',
    'SYSTEM_EVENT',
    'PRODUCTION_METRIC',
    'COMMERCIAL_STATE',
    'CONTROL_PLANE_STATE',
    'IDENTITY_EVENT'
  ]

  if (!permittedEventTypes.includes(eventType)) {
    throw new Error(`IntelligenceCollector: Invalid eventType: ${eventType}. Only universal event types permitted.`)
  }

  // Collect and create context (lectura solo, sin ejecución)
  const context = createIntelligenceContext(
    sourceComponent,
    eventType,
    contextId,
    metadata
  )

  return context
}

/**
 * Batch collect multiple intelligence contexts
 * Processes each event independently, no cross-event correlation that could introduce vertical logic
 */
export function batchCollectIntelligenceContexts(
  events: Array<{
    sourceComponent: string
    eventType: string
    contextId: string
    metadata?: Record<string, unknown>
  }>
): IntelligenceContext[] {
  const contexts: IntelligenceContext[] = []

  for (const event of events) {
    try {
      const context = collectIntelligenceContext(
        event.sourceComponent,
        event.eventType,
        event.contextId,
        event.metadata
      )
      contexts.push(context)
    } catch (error) {
      // Log invalid event (vertical logic, bad component, etc.) but continue processing
      // NO execute, NO modify, just skip invalid events
    }
  }

  return contexts
}