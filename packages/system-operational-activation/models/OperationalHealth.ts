# models - OperationalHealth.ts
/**
 * Operational health model for S36 Operational Activation.
 * Universal model only - no vertical data, no SDK, no gateway.
 * Observed by S34 Intelligence, governed by Core L1.
 */

export interface OperationalHealth {
  id: string;
  environmentId: string;
  version: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  metrics: {
    cpu?: number;
    memory?: number;
    latency?: number;
    errorRate?: number;
    requestRate?: number;
    throughput?: number;
  };
  lastCheck: string;
  healthySince?: string;
  dependencies: {
    [key: string]: 'healthy' | 'degraded' | 'unhealthy';
  };
  eventsThisPeriod: number;
  avgResponseTime?: number;
}