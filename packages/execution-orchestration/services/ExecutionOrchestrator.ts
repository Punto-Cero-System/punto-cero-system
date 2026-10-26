/**
 * ExecutionOrchestrator - S23 Execution Orchestration Foundation
 * 
 * Coordina el flujo completo de ejecución a través de los componentes certificados S10-S22.
 * Responsabilidades: coordina, valida, delega. NO procesa dominio vertical.
 * 
 * Principle: System-agnostic horizontal-only orchestration.
 * Pattern: Triple-validate like S22 PolicyValidator and S20 CapabilityValidator.
 * 
 * Reference: SYSTEM-S23-EXECUTION-ORCHESTRATION-DESIGN.md Fase 3
 * Reference: SYSTEM-S22-POLICY-RUNTIME-INTEGRATION.md (flow pattern)
 * Reference: SYSTEM-S22-POLICY-RUNTIME-CERTIFICATION.md (S10-S22 intacto)
 */

import { ExecutionRequest } from '../models/ExecutionRequest';
import { ExecutionResult } from '../models/ExecutionResult';
import { ExecutionContext } from '../models/ExecutionContext';
import { PolicyRuntime } from '../policy-runtime/services/PolicyEvaluator';
import { ContextRuntime } from '../context-engine/models/ContextModel';
import { CapabilityRuntime } from '../capability-runtime/models/CapabilityModel';
import { AuthorizationFoundation } from '../authorization-foundation/services/AuthFoundationService';

export class ExecutionOrchestrator {
  /**
   * Coordina una ejecución completa validando todas las dependencias
   * y preparando la llamada hacia UniversalAdapter/L2 Consumer.
   */
  async coordinarEjecucion(request: ExecutionRequest): Promise<ExecutionResult> {
    // Phase 1: Validar contexto
    const contextValid = this.validarContexto(request.contextId);
    if (!contextValid) {
      return this.resultarDecision('FAILED', 'Contexto inválido o no disponible');
    }

    // Phase 2: Validar capability
    const capabilityValid = this.validarCapability(request.capabilityId);
    if (!capabilityValid) {
      return this.resultarDecision('FAILED', 'Capability inválida o no disponible');
    }

    // Phase 3: Validar policy contra contexto
    const policyValid = this.validarPolicy(request.policyContext);
    if (!policyValid) {
      return this.resultarDecision('FAILED', 'Política inválida o evaluación fallida');
    }

    // Phase 4: Validar authorization
    const authValid = this.validarAuthorization(request.consumerId);
    if (!authValid) {
      return this.resultarDecision('FAILED', 'Autorización denegada');
    }

    // Phase 5: Ejecutar flujo GobernanceRuntime → UniversalAdapter → L2 Consumer
    const result = await this.ejecutarFlujoEjecucion(request);
    
    return result;
  }

  /**
   * Valida que el contexto existe y es accesible.
   * Dependencia read-only: ContextRuntime S11.3
   */
  private validarContexto(contextId: string): boolean {
    // En implementación real, consultaría ContextRuntime S11.3
    // Aquí validamos que el campo existe y tiene formato esperado
    return contextId !== undefined && contextId.length > 0;
  }

  /**
   * Valida que la capability existe y está disponible.
   * Dependencia read-only: CapabilityRuntime S20 (31/31 tests pass)
   */
  private validarCapability(capabilityId: string): boolean {
    // En implementación real, consultaría CapabilityRuntime S20
    return capabilityId !== undefined && capabilityId.length > 0;
  }

  /**
   * Valida que la policy es válida según enum PolicyType horizontal-only.
   * Dependencia read-only: PolicyRuntime S22 (60/60 tests pass, horizontal-only)
   */
  private validarPolicy(policyContext: ExecutionRequest['policyContext']): boolean {
    // En implementación real, consultaría PolicyRuntime S22 evaluator
    // Validation triple-check pattern S22: validatePolicyType, validateEvaluationResult, validateDecisionReason
    if (!policyContext || !policyContext.policyType) return false;
    const validTypes: ('ACCESS' | 'EXECUTION' | 'CONTEXT' | 'GOVERNANCE')[] = ['ACCESS', 'EXECUTION', 'CONTEXT', 'GOVERNANCE'];
    return validTypes.includes(policyContext.policyType);
  }

  /**
   * Valida que la authorization es válida.
   * Dependencia read-only: AuthorizationFoundation S12 (system-only maintained)
   */
  private validarAuthorization(consumerId: string): boolean {
    // En implementación real, consultaría AuthorizationFoundation S12
    // System-only auth decisions, no vertical logic
    return consumerId !== undefined && consumerId.length > 0;
  }

  /**
   * Ejecuta el flujo final: GovernanceRuntime observa y registra,
   * UniversalAdapter adapta a L2 Consumer, retorna ExecutionResult.
   */
  private async ejecutarFlujoEjecucion(request: ExecutionRequest): Promise<ExecutionResult> {
    // Simulación: en implementación real, esta llamada sería hacia
    // GovernanceRuntime S21 (observer-only) → UniversalAdapter S14 → L2 Consumer
    
    // Return standardized result based on policy evaluation
    return {
      executionId: request.executionId,
      status: 'ACCEPTED',
      decision: 'ALLOW' as 'ALLOW' | 'DENY' | 'REVIEW',
      timestamp: new Date().toISOString(),
      reason: 'Execution orchestrated through universal policy runtime'
    };
  }

  /**
   * Crea ExecutionResult con decisión system-agnostic.
   */
  private resultarDecision(status: 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'FAILED', 
                           reason: string): ExecutionResult {
    return {
      executionId: '',
      status: status,
      decision: status === 'FAILED' ? 'DENY' : 'ALLOW' as 'ALLOW' | 'DENY' | 'REVIEW',
      timestamp: new Date().toISOString(),
      reason: reason
    };
  }
}