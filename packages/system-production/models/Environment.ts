/**
 * Environment Management Models for S30 Production Platform
 * 
 * Defines environment structure and state for Development, Staging, Production
 * 
 * Constraint: NO modifica S10-S29, solo agrega infraestructura operacional
 */

export interface EnvironmentConfig {
  /** Environment name */
  name: 'development' | 'staging' | 'production';
  /** Environment version */
  version: string;
  /** Configuration variables */
  variables: Map<string, string>;
  /** Secret references (names only, values from secret management) */
  secrets: Map<string, string>;
  /** Environment isolation level */
  isolationLevel: 'namespace' | 'tenant' | 'organization';
  /** Deployment target */
  deploymentTarget: string;
  /** Health check configuration */
  healthChecks: HealthCheckConfig;
  /** Update lifecycle state */
  updateState: UpdateState;
}

export interface HealthCheckConfig {
  /** Health check interval in seconds */
  interval: number;
  /** Health check timeout in seconds */
  timeout: number;
  /** Maximum retry attempts */
  maxRetries: number;
  /** Critical health checks (failure triggers alert) */
  critical: Array<keyof HealthCheckTarget>;
}

export interface HealthCheckTarget {
  /** Check identifier */
  id: string;
  /** Check type */
  type: 'api' | 'database' | 'cache' | 'external' | 'custom';
  /** Check configuration */
  config: Record<string, unknown>;
}

export interface DeploymentConfig {
  /** Deployment version */
  version: string;
  /** Deployment type */
  type: 'initial' | 'update' | 'rollback';
  /** Release notes */
  releaseNotes?: string;
  /** Rollback target version */
  rollbackTarget?: string;
  /** Canary deployment flag */
  canary: boolean;
  /** Blue-green deployment flag */
  blueGreen: boolean;
}

export interface ReleaseInfo {
  /** Release version */
  version: string;
  /** Release date */
  date: Date;
  /** Deployed by */
  deployedBy: string;
  /** Deployment environment */
  environment: EnvironmentConfig['name'];
  /** Status */
  status: 'pending' | 'deployed' | 'rolled-back' | 'failed';
  /** Release notes */
  releaseNotes: string;
}

export interface UpdateState {
  /** Current update version */
  currentVersion: string;
  /** Latest available version */
  latestVersion: string;
  /** Update status */
  status: 'up-to-date' | 'update-available' | 'update-in-progress' | 'update-failed';
  /** Last update check */
  lastCheck: Date;
  /** Update compatibility status with S10-S29 */
  compatibility: 'compatible' | 'incompatible' | 'unknown';
}

export interface SystemHealthStatus {
  /** Overall system health */
  overall: 'healthy' | 'degraded' | 'unhealthy';
  /** Component health statuses */
  components: Map<string, ComponentHealth>;
  /** Timestamp of last check */
  lastChecked: Date;
  /** Health check version */
  checkVersion: string;
}

export interface ComponentHealth {
  /** Component identifier */
  id: string;
  /** Component health */
  health: 'healthy' | 'degraded' | 'unhealthy';
  /** Detailed status message */
  message: string;
  /** Timestamp of last status update */
  lastUpdated: Date;
}