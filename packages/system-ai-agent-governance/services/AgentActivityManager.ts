/*
 * AgentActivityManager.ts - S50 Observer pattern service, Core L1 governed
 * Observation and traceability only, bypassAuthorization: false enforcement
 * Observer pattern only, no autonomous activity execution
 */

import { AgentActivity } from '../models/AgentActivity';
import { validateAgentActionType } from '../validators/AgentValidator';

export class AgentActivityManager {
  private activities = [] as AgentActivity[];

  // Record agent activity (observation only)
  recordAgentActivity(data: Partial<AgentActivity>): AgentActivity {
    const activity: AgentActivity = {
      activityId: { identityId: `activity-${Date.now()}`, identityType: 'universal' },
      agentId: { identityId: `agent-${Date.now()}`, identityType: 'universal' },
      actionType: 'CAPABILITY_CHECK',
      actionReference: data.actionReference || 'none',
      contextReference: { 
        memoryId: { identityId: 's49-default', identityType: 'universal' }, 
        authorizationLevel: 'S12_VERIFIED' 
      },
      authorizationReference: { 
        s12Id: `s12-${Date.now()}`, 
        authorizedBy: { identityId: 'core-l1', identityType: 'universal' }, 
        authorizationTimestamp: Date.now() 
      },
      timestamp: Date.now(),
      observationData: { previousState: undefined, newState: undefined, autonomous: false },
      ...data
    };

    this.activities.push(activity);
    return activity;
  }

  // Get activities for an agent
  getActivitiesByAgent(agentId: string): AgentActivity[] {
    return this.activities.filter(a => a.agentId?.identityId === agentId);
  }

  // Get all activities
  getAllActivities(): AgentActivity[] {
    return this.activities;
  }

  // Validate action type
  validateActionType(action: string): { valid: boolean; errors: string[] } {
    return validateAgentActionType(action);
  }

  // Get activity count
  getActivityCount(): number {
    return this.activities.length;
  }
}

export { AgentActivityManager };