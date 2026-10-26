/*
 * PolicyEvaluator.ts
 * S22 - Policy Runtime Foundation
 * Servicio para evaluar contexto contra políticas universales
 * 
 * Restricciones:
 * - Evalúa PolicyEvaluationContext contra PolicyDefinition
 * - Retorna PolicyDecision (ALLOW|DENY|REVIEW)
 * - No ejecuta acciones verticales
 * - No conoce Legal, Medical, Business, One
 * - Usa contextId de ContextRuntime S11.3 (read-only)
 * - Usa consumerId de TenantUniversal S11.2+S18.1 (read-only)
 * - Usa capabilityId de CapabilityRuntime S20 (read-only)
 */

export interface PolicyEvaluator {
  /**
   * Evaluar un contexto contra una política
   * @param context PolicyEvaluationContext con datos de evaluación
   * @param policy PolicyDefinition contra la cual evaluar
   * @returns PolicyDecision con el resultado
   */
  evaluate(context: PolicyEvaluationContext, policy: PolicyDefinition): PolicyDecision;

  /**
   * Verificar si un consumidor tiene permiso para una acción
   * @param policyId Política a consultar
   * @param context Contexto de evaluación
   * @returns PolicyDecision con ALLOW|DENY|REVIEW
   */
  checkPermission(policyId: string, context: PolicyEvaluationContext): PolicyDecision;

  /**
   * Obtener la razón de una decisión
   * @param decision PolicyDecision de la cual obtener la razón
   * @returns string describiendo la razón
   */
  getDecisionReason(decision: PolicyDecision): string;
}