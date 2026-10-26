/**
 * IntelligenceContext - Modelo universal para contexto de inteligencia System
 * 
 * Propósito: Contexto universal para eventos de inteligencia System
 * 
 * eventType values (universal, NO vertical):
 * - 'GOVERNANCE_EVENT'
 * - 'POLICY_DECISION'
 * - 'EXECUTION_OPERATION'
 * - 'SYSTEM_EVENT'
 * - 'PRODUCTION_METRIC'
 * - 'COMMERCIAL_STATE'
 * - 'CONTROL_PLANE_STATE'
 * - 'IDENTITY_EVENT'
 * 
 * NO incluye: datos verticales, información privada L2
 */

export interface IntelligenceContext {
  intelligenceId: string
  sourceComponent: string
  contextId: string
  eventType: string
  timestamp: Date
  metadata: Record<string, unknown>
}

/**
 * IntelligenceContext creation validation
 * Validates sourceComponent is from permitted S10-S32 components only
 */

export function createIntelligenceContext(
  sourceComponent: string,
  eventType: string,
  contextId: string,
  metadata?: Record<string, unknown>
): IntelligenceContext {
  // Permitted source components from S10-S32 only
  const permittedComponents = [
    'S11', 'S12', 'S13', 'S14', 'S19', 'S20',
    'S21', 'S22', 'S23', 'S25', 'S26', 'S26++', 'S27', 'S28',
    'S29', 'S30', 'S31', 'S32'
  ]

  if (!permittedComponents.includes(sourceComponent)) {
    throw new Error(`Invalid sourceComponent: ${sourceComponent}. Must be S10-S32 component.`)
  }

  // Validate eventType is universal (not vertical)
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
    throw new Error(`Invalid eventType: ${eventType}. Must be universal event type.`)
  }

  return {
    intelligenceId: crypto.randomUUID(),
    sourceComponent,
    contextId,
    eventType,
    timestamp: new Date(),
    metadata: metadata || {}
  }
}