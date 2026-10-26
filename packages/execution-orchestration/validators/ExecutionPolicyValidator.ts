/**
 * ExecutionPolicyValidator - S23 Execution Orchestration Foundation
 * 
 * Confirmar reglas S22: validación triple-check sobre políticas universales,
 * sin Introducir lógica vertical Legal/Medical/Business/One.
 * 
 * Pattern idént a PolicyValidator S22: validatePolicyType, validateEvaluationResult, validateDecisionReason.
 * 
 * Absolute restriction: PolicyRuntime NO contiene reglas verticales.
 * PolicyType enum: ACCESS|EXECUTION|CONTEXT|GOVERNANCE solo.
 * DecisionType enum: ALLOW|DENY|REVIEW solo (system-agnostic).
 */

import { ExecutionRequest } from '../models/ExecutionRequest';

export class ExecutionPolicyValidator {
  /**
   * Valida que la policyContext sigue reglas S22 de enum horizontal-only.
   * Retorna true si la policy es válida, false si viola restricciones S22.
   */
  validarPolicyType(policyType: string): boolean {
    const validTypes: ('ACCESS' | 'EXECUTION' | 'CONTEXT' | 'GOVERNANCE')[] = [
      'ACCESS', 'EXECUTION', 'CONTEXT', 'GOVERNANCE'
    ];
    return validTypes.includes(policyType as ('ACCESS' | 'EXECUTION' | 'CONTEXT' | 'GOVERNANCE'));
  }

  /**
   * Valida el evaluationResult contra PolicyType y DecisionType S22.
   * Triple-check pattern idént a PolicyValidator S22.
   */
  validarEvaluationResult(policyType: string, evaluationResult: string): boolean {
    // Validate policyType first
    if (!this.validarPolicyType(policyType)) return false;

    const validResults: ('ALLOW' | 'DENY' | 'REVIEW')[] = ['ALLOW', 'DENY', 'REVIEW'];
    return validResults.includes(evaluationResult as ('ALLOW' | 'DENY' | 'REVIEW'));
  }

  /**
   * Valida el decisionReason siguiendo reglas S22.
   * Reason debe ser system-agnostic, sin referencias a Legal/Medical/Business/One.
   */
  validarDecisionReason(reason: string): boolean {
    if (!reason) return true; // reason opcional puede estar vacío

    // Prohibir patrones verticales en el reason
    const verticalPatterns = [
      /legal/i,
      /medical/i,
      /business/i,
      /one/i,
      /patient/i,
      /case/i,
      /legal_permission/i,
      /medical_permission/i,
      /business_rule/i,
      /vertical_rule/i
    ];

    return !verticalPatterns.some(pattern => pattern.test(reason));
  }

  /**
   * Validación completa S22 de una policy request.
   * Ejecuta los tres checks S22: validatePolicyType, validateEvaluationResult, validateDecisionReason.
   */
  validarPolicyCompleta(request: ExecutionRequest): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check 1: validatePolicyType
    if (!this.validarPolicyType(request.policyContext?.policyType)) {
      errors.push('Tipo de política inválido: debe ser ACCESS|EXECUTION|CONTEXT|GOVERNANCE');
    }

    // Check 2: validateEvaluationResult
    if (request.policyContext?.evaluationResult && 
        !this.validarEvaluationResult(request.policyContext.policyType, request.policyContext.evaluationResult)) {
      errors.push('Resultado de evaluación inválido: debe ser ALLOW|DENY|REVIEW');
    }

    // Check 3: validateDecisionReason (prohibir verticales)
    if (request.policyContext?.decisionReason && 
        !this.validarDecisionReason(request.policyContext.decisionReason)) {
      errors.push('Razón de decisión contiene referencias verticales prohibidas (Legal/Medical/Business/One)');
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }
}