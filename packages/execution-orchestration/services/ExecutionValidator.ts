/**
 * ExecutionValidator - S23 Execution Orchestration Foundation
 * 
 * Valida triple-check todos los componentes antes de ejecutar una operación,
 * siguiendo el patrón S22 PolicyValidator y S20 CapabilityValidator.
 * 
 * Validaciones:
 * 1. Contexto existente (ContextRuntime S11.3)
 * 2. Capability existente (CapabilityRuntime S20)
 * 3. Policy válida (PolicyRuntime S22, horizontal-only)
 * 4. Authorization válida (AuthorizationFoundation S12, system-only)
 * 
 * Absolute restriction: No introduce lógica vertical Legal/Medical/Business/One.
 */

import { ExecutionRequest } from '../models/ExecutionRequest';
import { ExecutionContext } from '../models/ExecutionContext';

export class ExecutionValidator {
  /**
   * Ejecuta validación triple-check de todos los componentes requeridos.
   * Retorna true si todas las validaciones pasan, false en caso contrario.
   */
  validarEjecucion(request: ExecutionRequest): { valid: boolean; reasons: string[] } {
    const reasons: string[] = [];

    // Validación 1: Contexto existente
    if (!request.contextId || request.contextId.length === 0) {
      reasons.push('Contexto inválido: contextId es requerido (ContextRuntime S11.3)');
    }

    // Validación 2: Capability existente
    if (!request.capabilityId || request.capabilityId.length === 0) {
      reasons.push('Capability inválida: capabilityId es requerido (CapabilityRuntime S20)');
    }

    // Validación 3: Policy válida (horizontal-only, sin verticales)
    if (!request.policyContext || !request.policyContext.policyType) {
      reasons.push('Policy inválida: policyType es requerido (PolicyRuntime S22, horizontal-only)');
    } else {
      const validPolicyTypes: ('ACCESS' | 'EXECUTION' | 'CONTEXT' | 'GOVERNANCE')[] = [
        'ACCESS', 'EXECUTION', 'CONTEXT', 'GOVERNANCE'
      ];
      if (!validPolicyTypes.includes(request.policyContext.policyType)) {
        reasons.push(`Policy tipo inválido: ${request.policyContext.policyType}. 
Solo permitidos: ACCESS|EXECUTION|CONTEXT|GOVERNANCE (sin legal_permission, medical_permission, business_rule, vertical_rule)`);
      }
    }

    // Validación 4: Authorization válida (system-only, sin verticales)
    if (!request.consumerId || request.consumerId.length === 0) {
      reasons.push('Authorization inválida: consumerId es requerido (AuthorizationFoundation S12, system-only)');
    }

    return {
      valid: reasons.length === 0,
      reasons: reasons
    };
  }

  /**
   * Valida que el ExecutionContext tiene todos los campos requeridos.
   */
  validarContexto(context: ExecutionContext): { valid: boolean; missing: string[] } {
    const missing: string[] = [];

    if (!context.contextId) missing.push('contextId');
    if (!context.identityId) missing.push('identityId');
    if (!context.tenantId) missing.push('tenantId');
    if (!context.consumerId) missing.push('consumerId');
    if (!context.capabilityId) missing.push('capabilityId');

    return {
      valid: missing.length === 0,
      missing: missing
    };
  }
}