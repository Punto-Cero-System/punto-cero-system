/*
 * OrchestrationValidator.ts - S51 Enforces bypassAuthorization: false, rejects vertical/unauthorized
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47, S48, S49, S50
 * NO verticales, NO autonomía, S12/S50 mandatory
 */

// S51 Prohibited workflow types
export const prohibitedWorkflowTypes: string[] = [
  'VERTICAL_WORKFLOW',
  'AUTONOMOUS_WORKFLOW',
  'UNAUTHORIZED_WORKFLOW';
];

// S51 Validation: Workflow
export function validateWorkflow(w: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (w.authorizationContext?.bypassAuthorization !== false) errors.push('bypassAuthorization must be false');
  const prohibited = /VERTICAL|AUTONOMOUS|UNAUTHORIZED/i;
  if (prohibited.test(w.workflowType || '')) errors.push('Prohibited workflow type detected');
  
  if (w.requiresS50Validation !== true) errors.push('requiresS50Validation must be true');
  if (w.requiresS12Authorization !== true) errors.push('requiresS12Authorization must be true');
  
  if (w.initiatorAgent?.identityType !== 'universal') errors.push('initiatorAgent must have identityType: universal');
  if (w.participatingAgents?.some((a: any) => a.identityType !== 'universal')) errors.push('participatingAgents must have identityType: universal');
  
  return { valid: errors.length === 0, errors };
}

// S51 Validation: Task
export function validateTask(t: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (t.authorizationReference?.s12Id?.length === 0) errors.push('s12Id cannot be empty');
  if (t.authorizationReference?.s50ValidationId?.length === 0) errors.push('s50ValidationId cannot be empty');
  
  const prohibited = /VERTICAL|AUTONOMOUS|UNAUTHORIZED/i;
  if (prohibited.test(t.assignedAgent?.identityId || '')) errors.push('Prohibited agent in task');
  
  if (t.contextReference?.authorizationLevel !== 'S12_VERIFIED') errors.push('context authorizationLevel must be S12_VERIFIED');
  
  return { valid: errors.length === 0, errors };
}

// S51 Validation: Communication
export function validateCommunication(c: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (c.isObservable !== true) errors.push('isObservable must be true (no private communication outside Core)');
  
  const prohibited = /VERTICAL|AUTONOMOUS|UNAUTHORIZED/i;
  if (prohibited.test(c.sourceAgent?.identityId || '')) errors.push('Prohibited source agent');
  if (prohibited.test(c.targetAgent?.identityId || '')) errors.push('Prohibited target agent');
  
  return { valid: errors.length === 0, errors };
}

// S51 Validation: Orchestration State
export function validateOrchestrationState(state: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  const validStates = ['CREATED', 'VALIDATED', 'PLANNED', 'RUNNING', 'PAUSED', 'COMPLETED', 'CLOSED'];
  if (!validStates.includes(state)) errors.push('Invalid orchestration state');
  
  return { valid: errors.length === 0, errors };
}

// S51 Validation: Transition validity
export function validateOrchestrationTransition(from: string, to: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  const validTransitions: any = {
    CREATED: ['VALIDATED', 'CLOSED'],
    VALIDATED: ['PLANNED', 'CLOSED'],
    PLANNED: ['RUNNING', 'CLOSED'],
    RUNNING: ['PAUSED', 'COMPLETED', 'CLOSED'],
    PAUSED: ['RUNNING', 'COMPLETED', 'CLOSED']
  };
  
  const allowed = validTransitions[from];
  if (!allowed) errors.push('Invalid source state');
  else if (!allowed.includes(to)) errors.push(`Invalid transition from ${from} to ${to}`);
  
  return { valid: errors.length === 0, errors };
}

export { validateWorkflow, validateTask, validateCommunication, validateOrchestrationState, validateOrchestrationTransition };