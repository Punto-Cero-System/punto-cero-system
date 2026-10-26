/**
 * ExecutionResult - S23 Execution Orchestration Foundation
 * 
 * Resultado estandarizado de cualquier operación evaluada por el System,
 * sin contexto vertical. Enum system-agnostic: ALLOW|DENY|REVIEW.
 * 
 * Reference: SYSTEM-S23-EXECUTION-ORCHESTRATION-DESIGN.md Fase 2
 * Reference: SYSTEM-S22-POLICY-RUNTIME-DESIGN.md (pattern S22 decision system-agnostic)
 */

export interface ExecutionResult {
  /** Identificador de la ejecución */
  executionId: string;
  /** Status de la ejecución */
  status: 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'FAILED';
  /** Decision del System (system-agnostic enum) */
  decision: 'ALLOW' | 'DENY' | 'REVIEW';
  /** Marca de tiempo ISO 8601 */
  timestamp: string;
  /** Razón de la decisión (opcional, puede ser vacío si decision es definitivo) */
  reason?: string;
}