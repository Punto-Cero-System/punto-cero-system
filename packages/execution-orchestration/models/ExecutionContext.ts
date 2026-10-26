/**
 * ExecutionContext - S23 Execution Orchestration Foundation
 * 
 * Contexto completo para evaluación orchestrator, manteniendo la frontera
 * System ↔ L2 Consumers sin conocimiento vertical.
 * 
 * Reference: SYSTEM-S23-EXECUTION-ORCHESTRATION-DESIGN.md Fase 2
 * Reference: SYSTEM-S22-POLICY-RUNTIME-DESIGN.md (pattern S22 read dependencies)
 */

export interface ExecutionContext {
  /** Identificador del contexto (ContextRuntime S11.3) */
  contextId: string;
  /** Identificador de identidad (IdentityUniversal S17.2 read dependency) */
  identityId: string;
  /** Identificador de tenant (TenantUniversal S11.2+S18.1 read dependency) */
  tenantId: string;
  /** Identificador del consumidor L2 (TenantUniversal S11.2+S18.1 read dependency) */
  consumerId: string;
  /** Identificador de capability (CapabilityRuntime S20 read dependency) */
  capabilityId: string;
}