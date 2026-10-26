/*
 * AgentPermission.ts - S50 System Global AI Agent Governance Foundation
 * All authorization via S12 only, agent never possesses own authority
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47, S48, S49
 * Toda autorización pasa por S12. Un agente nunca posee autoridad propia.
 * Observer pattern only
 */

// S50 Agent Permission Model
export interface AgentPermission {
  // S11 Identity Universal
  permissionId: {
    identityId: string;
    identityType: 'universal';
  };

  // Associated agent
  agentId: {
    identityId: string;
    identityType: 'universal';
  };

  // Capability reference (S41)
  capabilityReference: {
    capabilityId: string;
    identityType: 'universal';
  };

  // Authorization policy (S12 enforcement)
  authorizationPolicy: {
    bypassAuthorization: false; // HARD CONSTRAINT
    authorizedBy: {
      identityId: string;
      identityType: 'universal';
    };
    authorizationTimestamp: number;
    expirationPolicy: 'IMMEDIATE' | 'TIME_BASED' | 'EVENT_BASED';
  };

  // Critical rule: An agent never possesses authority own authority
  // All authority derives from Core L1 via S12
  sourceOfAuthority: 'CORE_L1_S12'; // Hardcoded, never agent-owned

  // Timestamps
  createdAt: number;
  updatedAt: number;
}

// Export type for external consumption
export type AgentPermissionType = AgentPermission;