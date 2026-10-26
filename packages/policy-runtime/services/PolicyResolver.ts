/*
 * PolicyResolver.ts
 * S22 - Policy Runtime Foundation
 * Servicio para resolver decisiones de política basándose en contexto
 * 
 * Restricciones:
 * - Resuelve PolicyDecision basándose en PolicyEvaluationContext
 * - No ejecuta acciones verticales
 * - No conoce Legal, Medical, Business, One
 * - Integra con GovernanceRuntime S21 para auditoría
 * - Integra con AuthorizationFoundation S12 para foundation decisions
 */

export interface PolicyResolver {
  /**
   * Resolver una decisión completa basada en política y contexto
   * @param policyId Identificador de la política
   * @param context PolicyEvaluationContext con datos de evaluación
   * @returns PolicyDecision final con ALLOW|DENY|REVIEW
   */
  resolveDecision(policyId: string, context: PolicyEvaluationContext): PolicyDecision;

  /**
   * Obtener la política aplicable para un consumidor y contexto
   * @param consumerId Identificador del consumidor L2
   * @param contextId Identificador del contexto
   * @returns PolicyDefinition aplicable o undefined
   */
  getApplicablePolicy(consumerId: string, contextId: string): PolicyDefinition | undefined;

  /**
   * Auditar una decisión de política para traceability
   * @param decision PolicyDecision tomada
   * @param context Contexto en el cual se tomó la decisión
   * void
   */
  auditDecision(decision: PolicyDecision, context: PolicyEvaluationContext): void;
}