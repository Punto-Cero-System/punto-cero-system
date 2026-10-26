/*
 * AgentWorkflow.ts - S51 System Global AI Agent Orchestration Foundation
 * Universal workflow coordination, Core-governed only, no vertical, no autonomous
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47, S48, S49, S50
 * NO flujos verticales, NO autonomía, toda coordinación por S12/S50
 * Observer pattern only
 */

// S51 Workflow Types (prohibited vertical/unauthorized types excluded)
export type WorkflowType = 
  | 'SYSTEM_WORKFLOW'
  | 'ANALYTICS_WORKFLOW' 
  | 'INTELLIGENCE_WORKFLOW'
  | 'OPERATIONS_WORKFLOW'
  | 'GOVERNANCE_WORKFLOW';

// Prohibited workflow types (vertical/unauthorized)
export const prohibitedWorkflowTypes: string[] = [
  'VERTICAL_WORKFLOW',
  'AUTONOMOUS_WORKFLOW',
  'UNAUTHORIZED_WORKFLOW';
];

// Universal workflow interface
export interface AgentWorkflow {
  // S11 Identity Universal
  workflowId: {
    identityId: string;
    identityType: 'universal';
  };

  // Workflow type classification (no vertical/unauthorized allowed)
  workflowType: WorkflowType;

  // Agent that initiated the workflow
  initiatorAgent: {
    identityId: string;
    identityType: 'universal';
  };

  // Participating agents (S50 validated)
  participatingAgents: {
    identityId: string;
    identityType: 'universal';
  }[];

  // Authorization context (S12/S50 enforcement)
  authorizationContext: {
    bypassAuthorization: false; // HARD CONSTRAINT
    authorizedBy: {
      identityId: string;
      identityType: 'universal';
    };
    authorizationTimestamp: number;
  };

  // Critical rule: No unauthorized workflows
  requiresS50Validation: boolean;
  requiresS12Authorization: boolean;

  // Lifecycle status
  lifecycleStatus: 'CREATED' | 'VALIDATED' | 'PLANNED' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'CLOSED';

  // Timestamps
  createdAt: number;
  updatedAt: number;
}

// Export type for external consumption
export type AgentWorkflowType = AgentWorkflow;