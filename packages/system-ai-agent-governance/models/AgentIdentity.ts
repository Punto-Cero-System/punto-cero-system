/*
 * AgentIdentity.ts - S50 System Global AI Agent Governance Foundation
 * Universal agent identity, Core-governed only, no vertical, no autonomous
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47, S48, S49
 * NO agentes verticales, NO autonomía propia, toda autorización por S12
 * Observer pattern only
 */

// S50 Agent Types (prohibited vertical/autonomous types excluded)
export type AgentType = 
  | 'SYSTEM_AGENT'
  | 'ANALYTICS_AGENT' 
  | 'INTELLIGENCE_AGENT'
  | 'OPERATIONS_AGENT'
  | 'GOVERNANCE_AGENT';

// Prohibited agent types (vertical/autonomous)
export const prohibitedAgentTypes: string[] = [
  'LEGAL_AGENT',
  'MEDICAL_AGENT', 
  'BUSINESS_AGENT',
  'VERTICAL_AGENT',
  'AUTONOMOUS_AGENT';
];

// Universal agent identity interface
export interface AgentIdentity {
  // S11 Identity Universal
  agentId: {
    identityId: string;
    identityType: 'universal';
  };

  // Agent type classification (no vertical/autonomous allowed)
  agentType: AgentType;

  // Owner context (who registered the agent)
  ownerContext: {
    identityId: string;
    identityType: 'universal';
    registrationTimestamp: number;
  };

  // Current lifecycle status
  lifecycleStatus: 'REGISTERED' | 'VALIDATED' | 'AVAILABLE' | 'ACTIVE' | 'SUSPENDED' | 'RETIRED';

  // Authorization context (S12 enforcement)
  authorizationContext: {
    bypassAuthorization: false; // HARD CONSTRAINT
    authorizedBy: {
      identityId: string;
      identityType: 'universal';
    };
    authorizationTimestamp: number;
  };

  // Critical rule: An agent never possesses authority own authority
  // All authority derives from Core L1 via S12
  sourceOfAuthority: 'CORE_L1_S12'; // Hardcoded, never 'agent_own'

  // Capability scope reference (S41)
  capabilityScope: string; // references S41 Capability Registry entry identityId

  // Timestamps
  createdAt: number;
  updatedAt: number;
}

// Export type for external consumption
export type AgentIdentityType = AgentIdentity;