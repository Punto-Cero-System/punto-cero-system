/**
 * ExecutionCoordinator - S23 Execution Orchestration Foundation
 * 
 * Prepara y coordina la llamada hacia UniversalAdapter después devalidar todas
 * las dependencias S10-S22. No procesa dominio vertical.
 * 
 * Principle: System delegates execution to UniversalAdapter after full validation.
 * Pattern: Maintain S22 horizontal-only, system-agnostic architecture.
 * 
 * Reference: SYSTEM-S23-EXECUTION-ORCHESTRATION-DESIGN.md Fase 3
 * Reference: SYSTEM-S22-POLICY-RUNTIME-INTEGRATION.md (flow: ...→ UniversalAdapter → L2 Consumer)
 */

import { ExecutionRequest } from '../models/ExecutionRequest';
import { ExecutionValidator } from './ExecutionValidator';
import { ExecutionOrchestrator } from './ExecutionOrchestrator';
import { ExecutionResult } from '../models/ExecutionResult';

export class ExecutionCoordinator {
  private validator: ExecutionValidator = new ExecutionValidator();
  private orchestrator: ExecutionOrchestrator = new ExecutionOrchestrator();

  /**
   * Ejecuta el flujo completo de coordinación: validar → orchestrator → result.
   * Este es el punto de entrada único para solicitudes de ejecución universales.
   */
  async coordinar(request: ExecutionRequest): Promise<ExecutionResult> {
    // Step 1: Validación preliminar con ExecutionValidator
    const validation = this.validator.validarEjecucion(request);
    if (!validation.valid) {
      // Retornar resultado fallido con razones de validación
      return {
        executionId: request.executionId,
        status: 'REJECTED',
        decision: 'DENY' as 'ALLOW' | 'DENY' | 'REVIEW',
        timestamp: new Date().toISOString(),
        reason: `Validación fallida: ${validation.reasons.join('; ')}`
      };
    }

    // Step 2: Ejecutar orchestrator completo
    const orchestratorResult = await this.orchestrator.coordinarEjecucion(request);
    
    // Step 3: Retornar resultado estandarizado
    return orchestratorResult;
  }

  /**
   * Prepara la llamada hacia UniversalAdapter validando dependencias primero.
   * Esta es la responsabilidad principal del coordinator: delegar y coordinar,
   * no procesar dominio.
   */
  async prepararLlamadaUniversalAdapter(request: ExecutionRequest): Promise<ExecutionResult> {
    // Validar que todas las dependencias existen antes de delegar
    const contextCheck = this.validator.validarContexto({
      contextId: request.contextId,
      identityId: request.consumerId,
      tenantId: request.consumerId,
      consumerId: request.consumerId,
      capabilityId: request.capabilityId
    });

    if (!contextCheck.valid) {
      return {
        executionId: request.executionId,
        status: 'FAILED',
        decision: 'DENY' as 'ALLOW' | 'DENY' | 'REVIEW',
        timestamp: new Date().toISOString(),
        reason: `Dependencias incompletas para UniversalAdapter: ${contextCheck.missing.join(', ')}`
      };
    }

    // Delegar al orchestrator completo
    return this.coordinar(request);
  }
}