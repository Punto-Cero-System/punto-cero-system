/**
 * IntelligenceObservation - Modelo universal para observaciones de inteligencia System
 * 
 * Propósito: Observación e identificación de patrones en el ecosistema System
 * 
 * Categorías (universales):
 * - 'operational' - Operaciones del System
 * - 'security' - Seguridad operacional del System
 * - 'performance' - Performance del System
 * - 'commercial' - Estados comerciales del System
 * - 'governance' - Gobernanza del System
 * 
 * Severity values (universales):
 * - 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
 * 
 * NO incluye: casos legales, historiales médicos, transacciones business, datos privados consumidores
 */

export interface IntelligenceObservation {
  observationId: string
  category: 'operational' | 'security' | 'performance' | 'commercial' | 'governance'
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  source: string
  detectedAt: Date
}

/**
 * IntelligenceObservation creation validation
 * Validates category is from permitted universals only, source is S10-S32 component
 */

export function createIntelligenceObservation(
  category: IntelligenceObservation['category'],
  severity: IntelligenceObservation['severity'],
  source: string,
  detectedAt?: Date
): IntelligenceObservation {
  // Permitted categories (universal only)
  const permittedCategories = [
    'operational',
    'security',
    'performance',
    'commercial',
    'governance'
  ]

  if (!permittedCategories.includes(category)) {
    throw new Error(`Invalid category: ${category}. Must be universal category only.`)
  }

  // Validate severity
  const permittedSeverities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
  if (!permittedSeverities.includes(severity)) {
    throw new Error(`Invalid severity: ${severity}. Must be one of: ${permittedSeverities.join(', ')}`)
  }

  // Validate source is from permitted S10-S32 components
  const permittedComponents = [
    'S11', 'S12', 'S13', 'S14', 'S19', 'S20',
    'S21', 'S22', 'S23', 'S25', 'S26', 'S26++', 'S27', 'S28',
    'S29', 'S30', 'S31', 'S32'
  ]

  if (!permittedComponents.includes(source)) {
    throw new Error(`Invalid source: ${source}. Must be S10-S32 component only.`)
  }

  return {
    observationId: crypto.randomUUID(),
    category,
    severity,
    source,
    detectedAt: detectedAt || new Date()
  }
}