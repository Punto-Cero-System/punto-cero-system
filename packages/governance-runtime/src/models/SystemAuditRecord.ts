/**
 * SYSTEM-S21 GOVERNANCE RUNTIME
 * SystemAuditRecord - Modelo de trazabilidad universal
 * 
 * Record created is immutable; audit trail sin lógica vertical
 */

export interface SystemAuditRecord {
  auditId: string;              // UUID - identificador único System
  eventId: string;              // UUID - reference GovernanceEvent eventId
  actorType: 'identity_universal' | 'tenant_universal' | 'context_runtime' | 'capability_runtime' | 'authorization_foundation' | 'universal_adapter' | 'governance_runtime'; // System-agnostic type
  action: 'capability_registry_insert' | 'capability_resolution' | 'context_validation' | 'authorization_decision' | 'event_registration' | 'state_transition'; // System-agnostic action
  timestamp: Date;              // DateTime - marca de tiempo System
  result: 'SUCCESS' | 'FAILURE' | 'REVIEW_PENDING'; // Enum system-only
}