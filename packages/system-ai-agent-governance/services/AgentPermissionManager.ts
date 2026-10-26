/*
 * AgentPermissionManager.ts - S50 Observer pattern service, Core L1 governed
 * All authorization via S12 only, bypassAuthorization: false enforcement
 * Observer pattern only, no autonomous permission changes
 */

import { AgentPermission } from '../models/AgentPermission';
import { validateAgentPermission } from '../validators/AgentValidator';

export class AgentPermissionManager {
  private permissions = new Map<string, AgentPermission>();

  // Create agent permission (all via S12)
  createAgentPermission(data: Partial<AgentPermission>): AgentPermission {
    const permission: AgentPermission = {
      permissionId: { identityId: `perm-${Date.now()}`, identityType: 'universal' },
      agentId: { identityId: `agent-${Date.now()}`, identityType: 'universal' },
      capabilityReference: { capabilityId: 'cap-default', identityType: 'universal' },
      authorizationPolicy: { 
        bypassAuthorization: false, 
        authorizedBy: { identityId: 'core-l1', identityType: 'universal' }, 
        authorizationTimestamp: Date.now(), 
        expirationPolicy: 'IMMEDIATE' 
      },
      sourceOfAuthority: 'CORE_L1_S12',
      ...data
    };

    this.permissions.set(permission.permissionId.identityId, permission);
    return permission;
  }

  // Get permission by ID
  getAgentPermission(id: string): AgentPermission | undefined {
    return this.permissions.get(id);
  }

  // Validate permission
  validatePermission(p: AgentPermission): { valid: boolean; errors: string[] } {
    return validateAgentPermission(p);
  }

  // Get all permissions
  getAllPermissions(): AgentPermission[] {
    return Array.from(this.permissions.values());
  }
}

export { AgentPermissionManager };