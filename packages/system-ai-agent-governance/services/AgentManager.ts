/*
 * AgentManager.ts - S50 Observer pattern service, Core L1 governed
 * bypassAuthorization: false, S12 enforcement, zero vertical
 */

import { AgentIdentity } from '../models/AgentIdentity';
import { AgentPermission } from '../models/AgentPermission';
import { AgentLifecycle } from '../models/AgentLifecycle';
import { AgentActivity } from '../models/AgentActivity';

export class AgentManager {
  private identities = new Map<string, AgentIdentity>();
  private permissions = new Map<string, AgentPermission>();

  registerAgentIdentity(data: Partial<AgentIdentity>): AgentIdentity {
    const identity: AgentIdentity = {
      agentId: { identityId: `agent-${Date.now()}`, identityType: 'universal' },
      agentType: 'SYSTEM_AGENT', ownerContext: { identityId: 'core-l1', identityType: 'universal', registrationTimestamp: Date.now() },
      lifecycleStatus: 'REGISTERED', authorizationContext: { bypassAuthorization: false, authorizedBy: { identityId: 'core-l1', identityType: 'universal' }, authorizationTimestamp: Date.now() },
      sourceOfAuthority: 'CORE_L1_S12', capabilityScope: '', ...data
    };
    this.identities.set(identity.agentId.identityId, identity);
    return identity;
  }

  getAgentIdentity(id: string): AgentIdentity | undefined { return this.identities.get(id); }

  createAgentPermission(data: Partial<AgentPermission>): AgentPermission {
    const permission: AgentPermission = {
      permissionId: { identityId: `perm-${Date.now()}`, identityType: 'universal' },
      agentId: { identityId: `agent-${Date.now()}`, identityType: 'universal' },
      capabilityReference: { capabilityId: 'cap-default', identityType: 'universal' },
      authorizationPolicy: { bypassAuthorization: false, authorizedBy: { identityId: 'core-l1', identityType: 'universal' }, authorizationTimestamp: Date.now(), expirationPolicy: 'IMMEDIATE' },
      sourceOfAuthority: 'CORE_L1_S12', ...data
    };
    this.permissions.set(permission.permissionId.identityId, permission);
    return permission;
  }

  getAgentPermission(id: string): AgentPermission | undefined { return this.permissions.get(id); }

  validateAgentIdentity(a: AgentIdentity): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (a.authorizationContext.bypassAuthorization !== false) errors.push('bypassAuthorization must be false');
    if (a.sourceOfAuthority !== 'CORE_L1_S12') errors.push('sourceOfAuthority must be CORE_L1_S12');
    return { valid: errors.length === 0, errors };
  }

  validateAgentPermission(p: AgentPermission): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (p.authorizationPolicy.bypassAuthorization !== false) errors.push('bypassAuthorization must be false');
    if (p.sourceOfAuthority !== 'CORE_L1_S12') errors.push('sourceOfAuthority must be CORE_L1_S12');
    return { valid: errors.length === 0, errors };
  }
}

export { AgentManager };