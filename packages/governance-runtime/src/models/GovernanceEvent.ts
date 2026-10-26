/**
 * SYSTEM-S21 GOVERNANCE RUNTIME
 * GovernanceEvent - Modelo universal de evento operativo
 * 
 * EventType horizontal-only: CREATE, UPDATE, EXECUTE, VALIDATE, FAILURE, CLOSE
 * Sin lógica vertical - system-agnostic fields only
 */

export interface GovernanceEvent {
  eventId: string;              // UUID - identificador único System
  eventType: 'CREATE' | 'UPDATE' | 'EXECUTE' | 'VALIDATE' | 'FAILURE' | 'CLOSE'; // Enum horizontal-only
  consumerId: string;           // String - referencia ConsumerRegistry S13
  tenantId: string;             // String - referencia TenantUniversal S11.2
  contextId: string;            // UUID - referencia ContextRuntime S11.3
  capabilityId: string;         // UUID - referencia CapabilityUniversal S20
  timestamp: Date;              // DateTime - marca de tiempo System
  status: 'pending' | 'completed' | 'cancelled' | 'failed'; // Enum system-only
}