/** 
 * SystemOperator - S29 Operations Layer
 * Responsibility: Administer global configuration, L2 consumers, System state visualization
 * Constraint: NO vertical logic (Legal/Medical/Business/One)
 * Constraint: Reuses certified S10-S28 components, reads-only interaction
 */
export interface SystemOperator {
  /** List connected L2 consumer types (counts only, no vertical data) */
  listConnectedConsumers(): { Legal: number; Medical: number; Business: number; One: number };
  
  /** Get System configuration (universal parameters only) */
  getConfiguration(): SystemConfiguration;
  
  /** Get current System status */
  getStatus(): SystemStatus;
  
  /** Perform health check (verifies S10-S28 integrity, zero modifications, vertical isolation) */
  healthCheck(): HealthCheckResult;
  
  /** Register a new L2 consumer (contract-based only, no logic addition) */
  registerConsumer(type: ConsumerType): boolean;
  
  /** Unregister an L2 consumer */
  unregisterConsumer(type: ConsumerType): boolean;
}

/** Consumer type enumeration (read-only, certified S10-S28 types) */
export type ConsumerType = 'Legal' | 'Medical' | 'Business' | 'One';

/** Consumer status (read-only status, no vertical data) */
export interface ConsumerStatus {
  type: ConsumerType;
  connected: boolean;
  registeredAt: string; // ISO date string
  contractVersion: string; // S10-S27 contract reference
}

/** Health check result (verification only, no modification) */
export interface HealthCheckResult {
  overall: 'HEALTHY' | 'DEGRADED' | 'UNHEALTHY';
  coreIntegrity: 'INTACT' | 'MODIFIED' | 'UNKNOWN';
  verticalIsolation: 'MAINTAINED' | 'BREACH' | 'UNKNOWN';
  lastAudit: string; // ISO date
  components: {
    [key: string]: 'CERTIFIED' | 'PENDING' | 'FAILED';
  };
}