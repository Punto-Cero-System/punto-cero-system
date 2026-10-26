/*
 * PolicyValidator.ts
 * S22 - Policy Runtime Foundation
 * Validador para políticas y decisiones de Policy Runtime
 * 
 * Restricciones (Triple check pattern idént a CapabilityValidator S20):
 * - validatePolicyType: validar que policyType sea ACCESS|EXECUTION|CONTEXT|GOVERNANCE
 * - validateEvaluationResult: validar que evaluationResult sea ALLOW|DENY|REVIEW
 * - validateDecisionReason: validar que reason sea system-agnostic (sin legal/medical/business references)
 * - validateNoVerticalDependencies: verificar que no haya dependencias verticales
 */

export interface PolicyValidator {
  /**
   * Validar que el policyType sea un valor permitido (horizontal-only)
   * @param type PolicyType a validar
   * @returns boolean indicating if type is valid
   */
  validatePolicyType(type: string): boolean;

  /**
   * Validar que el evaluationResult sea un valor permitido
   * @param result EvaluationResult a validar
   * @returns boolean indicating if result is valid
   */
  validateEvaluationResult(result: string): boolean;

  /**
   * Validar que la razón de una decisión sea system-agnostic
   * @param reason string reason to validate
   * @returns boolean indicating if reason is valid (no vertical references)
   */
  validateDecisionReason(reason: string): boolean;

  /**
   * Triple check validation idént a CapabilityValidator S20
   * Verifica consumer exists, context valid, capability valid, no vertical dependencies
   * @param policyId Policy ID a verificar
   * @param context PolicyEvaluationContext con datos
   * @returns boolean indicating if all validations pass
   */
  tripleCheck(policyId: string, context: PolicyEvaluationContext): boolean;

  /**
   * Validar que el scope de una política sea system-agnostic
   * @param scope string scope a validar
   * @returns boolean indicating if scope is valid (no legal/medical/business/one references)
   */
  validateScope(scope: string): boolean;
}