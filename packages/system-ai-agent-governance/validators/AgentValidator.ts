/*
 * AgentValidator.ts - S50 Enforces bypassAuthorization: false, rejects vertical/autonomous agents
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47, S48, S49
 * NO verticales, NO autonomía propia, S12 mandatory
 */

// S50 Prohibited agent types
export const prohibitedAgentTypes: string[] = [
  'LEGAL_AGENT',
  'MEDICAL_AGENT', 
  'BUSINESS_AGENT',
  'VERTICAL_AGENT',
  'AUTONOMOUS_AGENT';
];

// S50 Validation: Agent Identity
export function validateAgentIdentity(a: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (a.authorizationContext?.bypassAuthorization !== false) errors.push('bypassAuthorization must be false');
  if (a.sourceOfAuthority !== 'CORE_L1_S12') errors.push('sourceOfAuthority must be CORE_L1_S12');
  
  const prohibited = /LEGAL|MEDICAL|BUSINESS|VERTICAL|AUTONOMOUS/i;
  if (prohibited.test(a.agentType || '')) errors.push('Prohibited agent type detected');
  
  const validStatus = ['REGISTERED', 'VALIDATED', 'AVAILABLE', 'ACTIVE', 'SUSPENDED', 'RETIRED'];
  if (!validStatus.includes(a.lifecycleStatus)) errors.push('Invalid lifecycle status');
  
  if (a.agentId?.identityType !== 'universal') errors.push('agentId must have identityType: universal');
  if (!a.agentId?.identityId) errors.push('agentId must have identityId');
  
  return { valid: errors.length === 0, errors };
}

// S50 Validation: Agent Permission
export function validateAgentPermission(p: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (p.authorizationPolicy?.bypassAuthorization !== false) errors.push('bypassAuthorization must be false');
  if (p.sourceOfAuthority !== 'CORE_L1_S12') errors.push('sourceOfAuthority must be CORE_L1_S12');
  
  const prohibited = /LEGAL|MEDICAL|BUSINESS|VERTICAL|AUTONOMOUS/i;
  if (prohibited.test(p.agentId?.identityId || '')) errors.push('Prohibited agent in permission');
  
  return { valid: errors.length === 0, errors };
}

// S50 Validation: Agent Lifecycle State
export function validateAgentLifecycleState(state: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  const validStates = ['REGISTERED', 'VALIDATED', 'AVAILABLE', 'ACTIVE', 'SUSPENDED', 'RETIRED'];
  if (!validStates.includes(state)) errors.push('Invalid agent lifecycle state');
  
  return { valid: errors.length === 0, errors };
}

// S50 Validation: Agent Action Type
export function validateAgentActionType(action: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  const validActions = ['CAPABILITY_CHECK', 'STATE_TRANSITION', 'PERMISSION_QUERY', 'CONTEXT_CONSULTATION', 'INTELLIGENCE_CONSUMPTION', 'METRICS_OBSERVATION'];
  if (!validActions.includes(action)) errors.push('Invalid agent action type');
  
  return { valid: errors.length === 0, errors };
}

// S50 Validation: Transition validity
export function validateAgentTransition(from: string, to: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  const validTransitions: any = {
    REGISTERED: ['VALIDATED', 'RETIRED'],
    VALIDATED: ['AVAILABLE', 'RETIRED'],
    AVAILABLE: ['ACTIVE', 'SUSPENDED', 'RETIRED'],
    ACTIVE: ['SUSPENDED', 'RETIRED'],
    SUSPENDED: ['ACTIVE', 'RETIRED']
  };
  
  const allowed = validTransitions[from];
  if (!allowed) errors.push('Invalid source state');
  else if (!allowed.includes(to)) errors.push(`Invalid transition from ${from} to ${to}`);
  
  return { valid: errors.length === 0, errors };
}

export { validateAgentIdentity, validateAgentPermission, validateAgentLifecycleState, validateAgentActionType, validateAgentTransition };