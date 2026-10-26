/**
 * Release Management Models for S30 Production Platform
 * 
 * Defines release lifecycle, version control, and update workflow management
 * 
 * Constraint: NO modifica S10-S29, solo agrega infraestructura operacional
 */

export interface ReleasePlan {
  /** Unique release plan identifier */
  id: string;
  /** Target version */
  version: string;
  /** Release type */
  releaseType: 'major' | 'minor' | 'patch' | 'hotfix';
  /** Release status */
  status: 'planned' | 'in-progress' | 'deployed' | 'rolled-back' | 'failed';
  /** Target environments */
  targetEnvironments: Array<'development' | 'staging' | 'production'>;
  /** Release timeline */
  timeline: {
    plannedAt: Date;
    startedAt?: Date;
    completedAt?: Date;
    rolledBackAt?: Date;
  };
  /** Release notes */
  releaseNotes: string;
  /** Rollback configuration */
  rollback: {
    enabled: boolean;
    triggerConditions: Array<string>;
    autoRollback: boolean;
  };
  /** Compatibility validation */
  compatibility: {
    s10S29Preserved: boolean;
    verticalIsolation: 'maintained' | 'compromised' | 'unknown';
    breakingChanges: Array<string>;
  };
  /** Approval requirements */
  approvals: {
    required: Array<'operations' | 'security' | 'operations-lead'>;
    obtained: Array<'operations' | 'security' | 'operations-lead'>;
    satisfied: boolean;
  };
}

export interface ReleaseStatus {
  /** Current active release */
  currentRelease: string;
  /** Release lifecycle stage */
  lifecycleStage: 'planning' | 'validated' | 'deploying' | 'validating' | 'completed' | 'rollback';
  /** Version history */
  versionHistory: Array<{
    version: string;
    deployedAt: Date;
    environment: string;
    status: 'success' | 'failed' | 'rolled-back';
    deployedBy: string;
  }>;
  /** Pending releases */
  pending: Array<{
    version: string;
    plannedAt: Date;
    requestedBy: string;
    status: 'pending' | 'approved' | 'rejected';
  }>;
}

export interface ReleaseManagerConfig {
  /** Default deployment timeout (seconds) */
  defaultTimeout: number;
  /** Maximum rollback attempts */
  maxRollbackAttempts: number;
  /** Health check required after deployment */
  requireHealthCheck: boolean;
  /** Minimum health check passes */
  minHealthCheckPasses: number;
  /** Observation window after deployment (seconds) */
  observationWindow: number;
  /** Update compatibility check with S10-S29 */
  checkS10S29Compatibility: boolean;
}