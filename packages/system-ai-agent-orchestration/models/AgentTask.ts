/*
 * AgentTask.ts - S51 System Global AI Agent Orchestration Foundation
 * Task model, all tasks require S50/S12 validation, observation only
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47, S48, S49, S50
 * Toda tarea requiere validación S50/S12. Observación y trazabilidad.
 */

// S51 Communication Types
export type CommunicationType = 
  | 'CONTEXT_SHARING'
  | 'INTELLIGENCE_DISCUSSION'
  | 'STATUS_UPDATE'
  | 'TASK_DELEGATION'
  | 'COORDINATION_REQUEST';

// Universal task interface
export interface AgentTask {
  // S11 Identity Universal
  taskId: {
    identityId: string;
    identityType: 'universal';
  };

  // Associated workflow
  workflowId: {
    identityId: string;
    identityType: 'universal';
  };

  // Assigned agent (must be S50-validated)
  assignedAgent: {
    identityId: string;
    identityType: 'universal';
  };

  // Capability reference (S41)
  capabilityReference: {
    capabilityId: string;
    identityType: 'universal';
  };

  // Context reference (S49 authorized)
  contextReference: {
    memoryId: {
      identityId: string;
      identityType: 'universal';
    };
    authorizationLevel: 'S12_VERIFIED';
  };

  // Authorization reference (S12/S50)
  authorizationReference: {
    s12Id: string;
    s50ValidationId: string;
    authorizedBy: {
      identityId: string;
      identityType: 'universal';
    };
    authorizationTimestamp: number;
  };

  // Task status
  status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'PAUSED' | 'CANCELLED';

  // Timestamps
  createdAt: number;
  assignedAt?: number;
  completedAt?: number;
}

// Export type for external consumption
export type AgentTaskType = AgentTask;