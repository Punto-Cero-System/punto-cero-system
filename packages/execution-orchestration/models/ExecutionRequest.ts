/**
 * ExecutionRequest - S23 Execution Orchestration Foundation
 * 
 * Solicitud universal de ejecución sin referencias a dominios verticales.
 * Horizontal-only: PolicyContext solo contiene referencias S22 PolicyType enum.
 * System-agnostic: No caso, paciente, documento legal o transacción business.
 * 
 * Reference: SYSTEM-S23-EXECUTION-ORCHESTRATION-DESIGN.md Fase 2
 * Reference: SYSTEM-S22-POLICY-RUNTIME-DESIGN.md (pattern S22)
 */

export interface ExecutionRequest {
  /** Identificador único de la ejecución */
  executionId: string;
  /** Identificador del contexto (ContextRuntime S11.3 read dependency) */
  contextId: string;
  /** Identificador del consumidor (TenantUniversal S11.2+S18.1 read dependency) */
  consumerId: string;
  /** Identificador de la capability (CapabilityRuntime S20 read dependency) */
  capabilityId: string;
  /** Contexto de política (PolicyRuntime S22 horizontal-only) */
  policyContext: {
    policyId: string;
    policyType: 'ACCESS' | 'EXECUTION' | 'CONTEXT' | 'GOVERNANCE';
    evaluationResult?: 'ALLOW' | 'DENY' | 'REVIEW';
    decisionReason?: string;
  };
  /** Fecha y hora de la solicitud */
  requestedAt: string;
}