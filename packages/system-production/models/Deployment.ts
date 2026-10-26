/**
 * Deployment Models for S30 Production Platform
 * 
 * Defines deployment configuration, release management, and rollback mechanisms
 * 
 * Constraint: NO modifica S10-S29, solo agrega infraestructura operacional
 */

export interface DeploymentPlan {
  /** Unique deployment plan identifier */
  id: string;
  /** Deployment configuration */
  config: DeploymentConfig;
  /** Target environments */
  targets: Array<{
    environment: string;
    namespace: string;
    replicas: number;
  }>;
  /** Deployment schedule */
  schedule?: {
    startTime: Date;
    timeout: number;
  };
  /** Pre-deployment validation */
  preValidation: {
    healthChecks: Array<keyof HealthCheckTarget>;
    requiredApprovals: number;
    satisfied: boolean;
  };
  /** Post-deployment validation */
  postValidation: {
    healthChecks: Array<keyof HealthCheckTarget>;
    requiredPass: number;
    passed: number;
    satisfied: boolean;
  };
  /** Rollback state */
  rollback: {
    enabled: boolean;
    triggerConditions: Array<string>;
    lastTriggered?: Date;
  };
}

export interface DeploymentResult {
  /** Deployment plan ID */
  planId: string;
  /** Status */
  status: 'success' | 'partial' | 'failed';
  /** Deployed environments */
  deployed: Array<{
    environment: string;
    success: boolean;
    error?: string;
  }>;
  /** Execution timeline */
  timeline: {
    startedAt: Date;
    completedAt?: Date;
    durationMs?: number;
  };
  /** Validation results */
  validation: {
    overall: 'passed' | 'failed';
    checks: Array<{
      name: string;
      result: 'pass' | 'fail';
      detail?: string;
    }>;
  };
}

export interface DeploymentStatus {
  /** Current deployment ID */
  currentDeployment: string;
  /** Overall deployment status */
  overallStatus: 'idle' | 'deploying' | 'paused' | 'rollback' | 'completed' | 'failed';
  /** Active deployments */
  active: Array<{
    id: string;
    environment: string;
    progress: number; // 0-100
    status: 'pending' | 'in-progress' | 'completed' | 'failed';
  }>;
  /** History of recent deployments */
  history: Array<{
    id: string;
    environment: string;
    version: string;
    status: 'success' | 'failed' | 'rolled-back';
    completedAt: Date;
  }>;
}