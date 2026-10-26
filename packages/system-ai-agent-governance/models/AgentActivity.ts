/*
 * AgentActivity.ts - S50 System Global AI Agent Governance Foundation
 * Agent activity model — observation and traceability only
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47, S48, S49
 * Solo observación y trazabilidad, NO ejecuta acciones
 */

// S50 Agent Action Types
export type AgentActionType = 
  | 'CAPABILITY_CHECK'
  | 'STATE_TRANSITION'
  | 'PERMISSION_QUERY'
  | 'CONTEXT_CONSULTATION'
  | 'INTELLIGENCE_CONSUMPTION'
  | 'METRICS_OBSERVATION';

// Universal agent activity interface
export interface AgentActivity {
  // S11 Identity Universal
  activityId: {
    identityId: string;
    identityType: 'universal';
  };

  // Agent who performed the action
  agentId: {
    identityId: string;
    identityType: 'universal';
  };

  // Type of action performed
  actionType: AgentActionType;

  // Reference to the action or context
  actionReference: string; // ID of capability, context, intelligence, etc.

  // Context reference (S49 authorized context)
  contextReference: {
    memoryId: {
      identityId: string;
      identityType: 'universal';
    };
    authorizationLevel: 'S12_VERIFIED';
  };

  // Authorization reference
  authorizationReference: {
    s12Id: string;
    authorizedBy: {
      identityId: string;
      identityType: 'universal';
    };
    authorizationTimestamp: number;
  };

  // Timestamp of the action
  timestamp: number;

  // Observation only — no action directives
  observationData: {
    previousState?: string;
    newState?: string;
    autonomous: false; // HARD CONSTRAINT — observation only, no autonomous action
  };

  // Timestamps
  createdAt: number;
  updatedAt: number;
}

// Export type for external consumption
export type AgentActivityType = AgentActivity;