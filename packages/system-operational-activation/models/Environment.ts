# models - Environment.ts
/**
 * Environment model for S36 Operational Activation.
 * Universal model only - no vertical data, no SDK, no gateway.
 * Observed by S34 Intelligence, governed by Core L1.
 */

export interface Environment {
  id: string;
  name: 'development' | 'staging' | 'production';
  version: string;
  status: 'active' | 'inactive' | 'maintenance';
  created: string;
  lastModified: string;
}

export interface DeploymentState {
  environmentId: string;
  releaseVersion: string;
  status: 'deployed' | 'rollingback' | 'rolledback' | 'failed';
  startedAt: string;
  completedAt?: string;
  rollbackId?: string;
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
}