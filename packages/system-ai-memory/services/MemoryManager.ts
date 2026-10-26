/*
 * MemoryManager.ts - S49 Observer pattern service, Core L1 governed
 * bypassAuthorization: false enforcement, observer pattern, zero vertical
 * NO ejecuta acciones, NO toma decisiones, NO aprendizaje autónomo
 * Observa y conserva memoria autorizada
 */

import { MemoryEntry } from '../models/MemoryEntry';
import { ContextRelationship } from '../models/ContextRelationship';
import { MemoryLifecycle } from '../models/MemoryLifecycle';
import { MemoryAccess } from '../models/MemoryAccess';

export class MemoryManager {
  private entries = new Map<string, MemoryEntry>();
  private relationships = new Map<string, ContextRelationship>();
  private history = [] as any[];

  // Create memory entry
  createMemoryEntry(data: Partial<MemoryEntry>): MemoryEntry {
    const entry: MemoryEntry = {
      memoryId: { identityId: `mem-${Date.now()}`, identityType: 'universal' },
      memoryType: 'SYSTEM_CONTEXT',
      sourceReference: { sourceId: 'core-l1', sourceType: 'L1', sourceTimestamp: Date.now() },
      authorizationContext: { bypassAuthorization: false, authorizedBy: { identityId: 'core-l1', identityType: 'universal' }, authorizationTimestamp: Date.now() },
      contextScope: 'GLOBAL',
      lifecycleStatus: 'CREATED',
      retentionPolicy: 'MEDIUM_TERM',
      relatedMemories: [],
      ...data
    };

    this.entries.set(entry.memoryId.identityId, entry);
    this.recordObserver(entry.memoryId.identityId);
    
    // Record observer pattern
    this.recordObserver({
      observerId: entry.authorizationContext.authorizedBy,
      observedOperationId: entry.memoryId.identityId,
      observationType: 'memory-entry-creation',
      observationTimestamp: Date.now(),
      observationData: { previousState: undefined, newState: 'CREATED', autonomous: false }
    });

    return entry;
  }

  // Get memory entry by ID
  getMemoryEntry(id: string): MemoryEntry | undefined {
    return this.entries.get(id);
  }

  // Create context relationship
  createContextRelationship(data: Partial<ContextRelationship>): ContextRelationship {
    const relationship: ContextRelationship = {
      relationshipId: { identityId: `rel-${Date.now()}`, identityType: 'universal' },
      sourceMemory: { memoryId: { identityId: `mem-src-${Date.now()}`, identityType: 'universal' }, memoryType: 'SYSTEM_CONTEXT' },
      targetMemory: { memoryId: { identityId: `mem-tgt-${Date.now()}`, identityType: 'universal' }, memoryType: 'SYSTEM_CONTEXT' },
      relationType: 'EVENT_REFERENCE',
      authorizationRequirement: { bypassAuthorization: false, authorizedBy: { identityId: 'core-l1', identityType: 'universal' }, authorizationTimestamp: Date.now() },
      validationStatus: 'UNVALIDATED',
      ...data
    };

    this.relationships.set(relationship.relationshipId.identityId, relationship);
    this.recordObserver(relationship.relationshipId.identityId);
    
    // Record observer pattern
    this.recordObserver({
      observerId: relationship.authorizationRequirement.authorizedBy,
      observedOperationId: relationship.relationshipId.identityId,
      observationType: 'context-relationship-creation',
      observationTimestamp: Date.now(),
      observationData: { previousState: undefined, newState: 'UNVALIDATED', autonomous: false }
    });

    return relationship;
  }

  // Get context relationship by ID
  getContextRelationship(id: string): ContextRelationship | undefined {
    return this.relationships.get(id);
  }

  // Record observer pattern event
  private recordObserver(o: any): void {
    const key = o.observedOperationId;
    this.history.push({
      operationId: key,
      type: o.observationType,
      observerId: o.observerId?.identityId || 'unknown',
      timestamp: o.observationTimestamp,
      data: o.observationData,
      autonomous: o.observationData?.autonomous || false
    });
  }

  // Get observers for an operation
  getObservers(id: string): any[] {
    return this.history.filter(h => h.operationId === id);
  }

  // Get all entries
  getAllEntries(): MemoryEntry[] {
    return Array.from(this.entries.values());
  }

  // Get all relationships
  getAllRelationships(): ContextRelationship[] {
    return Array.from(this.relationships.values());
  }

  // Get history
  getHistory(): any[] {
    return this.history;
  }

  // Validate memory entry
  validateMemoryEntry(m: MemoryEntry): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (m.authorizationContext.bypassAuthorization !== false) errors.push('bypassAuthorization must be false');
    const prohibited = /USER_PRIVATE|LEGAL|MEDICAL|BUSINESS|VERTICAL/i;
    if (prohibited.test(m.memoryType)) errors.push('Vertical/personal memory type detected');
    const validStatus = ['CREATED', 'VALIDATED', 'AVAILABLE', 'USED', 'ARCHIVED', 'RETIRED'];
    if (!validStatus.includes(m.lifecycleStatus)) errors.push('Invalid lifecycle status');
    if (typeof m.retentionPolicy !== 'string') errors.push('Invalid retention policy');
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  // Validate context relationship
  validateRelationship(r: ContextRelationship): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (r.authorizationRequirement.bypassAuthorization !== false) errors.push('bypassAuthorization must be false');
    const prohibited = /USER_PRIVATE|LEGAL|MEDICAL|BUSINESS|VERTICAL/i;
    if (prohibited.test(r.sourceMemory.memoryType) || prohibited.test(r.targetMemory.memoryType)) errors.push('Vertical/personal memory in relationship');
    const validStatus = ['UNVALIDATED', 'VALIDATED', 'VALIDATION_PENDING', 'ARCHIVED'];
    if (!validStatus.includes(r.validationStatus)) errors.push('Invalid validation status');
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// Export the class
export { MemoryManager };