/*
 * OrchestrationManager.ts - S51 Observer pattern service, Core L1 governed
 * bypassAuthorization: false, S12/S50 enforcement, zero vertical
 */

import { AgentWorkflow } from '../models/AgentWorkflow';
import { AgentTask } from '../models/AgentTask';
import { AgentCommunication } from '../models/AgentCommunication';
import { OrchestrationLifecycle } from '../models/OrchestrationLifecycle';

export class OrchestrationManager {
  private workflows = new Map<string, AgentWorkflow>();
  private tasks = new Map<string, AgentTask>();
  private communications = [] as AgentCommunication[];
  private lifecycleHistory = [] as any[];

  createWorkflow(data: Partial<AgentWorkflow>): AgentWorkflow {
    const workflow: AgentWorkflow = {
      workflowId: { identityId: `wf-${Date.now()}`, identityType: 'universal' },
      workflowType: 'SYSTEM_WORKFLOW', initiatorAgent: { identityId: 'core-l1', identityType: 'universal' },
      participatingAgents: [], authorizationContext: { bypassAuthorization: false, authorizedBy: { identityId: 'core-l1', identityType: 'universal' }, authorizationTimestamp: Date.now() },
      requiresS50Validation: true, requiresS12Authorization: true, lifecycleStatus: 'CREATED', ...data
    };
    this.workflows.set(workflow.workflowId.identityId, workflow);
    return workflow;
  }

  getWorkflow(id: string): AgentWorkflow | undefined { return this.workflows.get(id); }

  createTask(data: Partial<AgentTask>): AgentTask {
    const task: AgentTask = {
      taskId: { identityId: `task-${Date.now()}`, identityType: 'universal' },
      workflowId: { identityId: 'wf-default', identityType: 'universal' },
      assignedAgent: { identityId: 'agent-default', identityType: 'universal' },
      capabilityReference: { capabilityId: 'cap-default', identityType: 'universal' },
      contextReference: { memoryId: { identityId: 's49-default', identityType: 'universal' }, authorizationLevel: 'S12_VERIFIED' },
      authorizationReference: { s12Id: `s12-${Date.now()}`, s50ValidationId: 's50-default', authorizedBy: { identityId: 'core-l1', identityType: 'universal' }, authorizationTimestamp: Date.now() },
      status: 'PENDING', ...data
    };
    this.tasks.set(task.taskId.identityId, task);
    return task;
  }

  getTask(id: string): AgentTask | undefined { return this.tasks.get(id); }

  createLifecycle(data: Partial<OrchestrationLifecycle>): OrchestrationLifecycle {
    const lifecycle: OrchestrationLifecycle = {
      lifecycleId: { identityId: `orch-${Date.now()}`, identityType: 'universal' },
      state: 'CREATED', stateTimestamp: Date.now(), previousState: undefined,
      authorizationContext: { bypassAuthorization: false, authorizedBy: { identityId: 'core-l1', identityType: 'universal' }, authorizationTimestamp: Date.now() },
      observedBy: { identity: { identityId: 'core-l1', identityType: 'universal' }, observationTimestamp: Date.now(), observationData: { previousState: undefined, newState: 'CREATED', autonomous: false } },
      ...data
    };
    this.lifecycleHistory.push(lifecycle);
    return lifecycle;
  }

  getLifecycleHistory(id: string): any[] { return this.lifecycleHistory.filter(h => h.lifecycleId?.identityId === id); }

  recordCommunication(data: Partial<AgentCommunication>): AgentCommunication {
    const communication: AgentCommunication = {
      communicationId: { identityId: `comm-${Date.now()}`, identityType: 'universal' },
      sourceAgent: { identityId: 'agent-default', identityType: 'universal' },
      targetAgent: { identityId: 'agent-default', identityType: 'universal' },
      messageType: 'CONTEXT_SHARING',
      authorizationReference: { s12Id: `s12-${Date.now()}`, s50ValidationId: 's50-default', authorizedBy: { identityId: 'core-l1', identityType: 'universal' }, authorizationTimestamp: Date.now() },
      contextReference: { memoryId: { identityId: 's49-default', identityType: 'universal' }, authorizationLevel: 'S12_VERIFIED' },
      timestamp: Date.now(), isObservable: true, ...data
    };
    this.communications.push(communication);
    return communication;
  }

  getCommunicationsByAgent(agentId: string): AgentCommunication[] { return this.communications.filter(c => c.sourceAgent.identityId === agentId || c.targetAgent.identityId === agentId); }

  validateWorkflow(w: AgentWorkflow): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (w.authorizationContext.bypassAuthorization !== false) errors.push('bypassAuthorization must be false');
    const prohibited = /VERTICAL|AUTONOMOUS|UNAUTHORIZED/i;
    if (prohibited.test(w.workflowType || '')) errors.push('Prohibited workflow type');
    return { valid: errors.length === 0, errors };
  }

  validateTask(t: AgentTask): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const prohibited = /VERTICAL|AUTONOMOUS|UNAUTHORIZED/i;
    if (prohibited.test(t.assignedAgent.identityId || '')) errors.push('Prohibited agent in task');
    return { valid: errors.length === 0, errors };
  }
}

export { OrchestrationManager };