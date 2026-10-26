/*
 * PolicyEvaluationContext.ts
 * S22 - Policy Runtime Foundation
 * Contexto de evaluación para Policy Runtime
 * 
 * Restricciones:
 * - Sin fields verticales
 * - contextId referencia a ContextRuntime S11.3 (sin modifications)
 * - consumerId referencia a TenantUniversal S11.2+S18.1 (sin modifications)
 * - capabilityId referencia a CapabilityRuntime S20 (sin modifications)
 * - evaluationResult enum: ALLOW|DENY|REVIEW (solo System decisions)
 */

export interface PolicyEvaluationContext {
  policyId: string;
  contextId: string;
  consumerId: string;
  capabilityId: string;
  evaluationResult: EvaluationResult;
}

export enum EvaluationResult {
  ALLOW = 'ALLOW',
  DENY = 'DENY',
  REVIEW = 'REVIEW',
}