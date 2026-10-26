/*
 * AgentCommunication.ts - S51 System Global AI Agent Orchestration Foundation
 * Controlled, observable communication only, NO private communication
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47, S48, S49, S50
 * Comunicación controlada y observable, NO comunicación privada fuera del Core
 */

// S51 Communication Type
export type CommunicationType = 
  | 'CONTEXT_SHARING'
  | 'INTELLIGENCE_DISCUSSION'
  | 'STATUS_UPDATE'
  | 'TASK_DELEGATION'
  | 'COORDINATION_REQUEST';

// Universal communication interface
export interface AgentCommunication {
  // S11 Identity Universal
  communicationId: {
    identityId: string;
    identityType: 'universal';
  };

  // Source agent (must be S50-registered and validated)
  sourceAgent: {
    identityId: string;
    identityType: 'universal';
  };

  // Target agent (must be S50-registered and validated)
  targetAgent: {
    identityId: string;
    identityType: 'universal';
  };

  // Type of communication
  messageType: CommunicationType;

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

  // Communication context reference (S49 authorized)
  contextReference: {
    memoryId: {
      identityId: string;
      identityType: 'universal';
    };
    authorizationLevel: 'S12_VERIFIED';
  };

  // Timestamp
  timestamp: number;

  // Critical rule: All communication is observable
  // No private communication outside Core governance
  isObservable: boolean;
}

// Export type for external consumption
export type AgentCommunicationType = AgentCommunication;