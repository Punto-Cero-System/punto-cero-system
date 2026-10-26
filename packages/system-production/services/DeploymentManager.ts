/**
 * Deployment Manager Service for S30 Production Platform
 * 
 * Manages deployment processes, version control, and rollback mechanisms
 * 
 * Constraint: NO modifica S10-S29, solo agrega infraestructura operacional
 */

import { DeploymentPlan, DeploymentResult, DeploymentStatus, DeploymentConfig } from '../models/Deployment';
import { ReleaseInfo } from '../models/Release';
import { SystemHealthReport, ComponentSummary, ActiveAlert, HealthMetrics, HealthCheckResult, DependencyStatus } from '../models/SystemHealth';
import { EnvironmentConfig } from '../models/Environment';

export interface DeploymentManagerConfig {
  /** Default deployment timeout (seconds) */
  defaultTimeout: number;
  /** Maximum rollback attempts */
  maxRollbackAttempts: number;
  /** Enable auto-detection of deployment failures */
  autoDetectFailures: boolean;
  /** Health check required post-deployment */
  requireHealthCheck: boolean;
  /** Minimum health check passes */
  minHealthCheckPasses: number;
}

export interface DeploymentManager {
  /** Plan a new deployment */
  planDeployment(plan: DeploymentPlan): Promise<DeploymentResult>;
  
  /** Execute a deployment plan */
  executeDeployment(planId: string): Promise<DeploymentResult>;
  
  /** Check deployment status */
  checkDeploymentStatus(planId: string): Promise<DeploymentStatus>;
  
  /** Request rollback of a deployment */
  requestRollback(planId: string, reason: string): Promise<DeploymentResult>;
  
  /** Get overall deployment status */
  getOverallStatus(): Promise<DeploymentStatus>;
  
  /** Validate deployment compatibility with S10-S29 */
  validateDeploymentCompatibility(plan: DeploymentPlan): Promise<{
    compatible: boolean;
    issues: Array<{
      type: string;
      description: string;
      severity: 'critical' | 'warning' | 'info';
    }>;
  }>;
  
  /** Record deployment event for audit */
  recordDeploymentEvent(event: {
    type: 'plan' | 'execute' | 'rollback' | 'status-check';
    planId: string;
    environment: string;
    result: 'success' | 'failed';
    timestamp: Date;
    operator: string;
  }): Promise<void>;
}

export default DeploymentManager;