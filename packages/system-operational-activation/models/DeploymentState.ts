# models - DeploymentState.ts
/**
 * Deployment state model for S36 Operational Activation.
 * Universal model only - no vertical data, no SDK, no gateway.
 * Observed by S34 Intelligence, governed by Core L1.
 */

export interface DeploymentState {
  id: string;
  environmentId: string;
  releaseVersion: string;
  status: 'deployed' | 'rollingback' | 'rolledback' | 'failed';
  startedAt: string;
  completedAt?: string;
  rollbackId?: string;
  metadata: {
    deployedBy: string;
    checksum: string;
    notes?: string;
  };
}

export interface OperationalHealth {
  environmentId: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  metrics: {
    cpu?: number;
    memory?: number;
    latency?: number;
    errorRate?: number;
  };
  lastCheck: string;
  healthySince?: string;
  issues?: string[];
}