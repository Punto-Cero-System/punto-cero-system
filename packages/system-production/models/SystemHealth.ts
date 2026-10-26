/**
 * System Health Models for S30 Production Platform
 * 
 * Defines system health monitoring, status reporting, and operational metrics
 * 
 * Constraint: NO modifica S10-S29, solo agrega infraestructura operacional
 */

export interface SystemHealthReport {
  /** Report unique identifier */
  id: string;
  /** Report generation timestamp */
  generatedAt: Date;
  /** Overall system health rating */
  overallHealth: 'optimal' | 'healthy' | 'degraded' | 'critical';
  /** Component-level health summaries */
  componentSummaries: Array<ComponentSummary>;
  /** Active alerts */
  activeAlerts: Array<ActiveAlert>;
  /** Performance metrics snapshot */
  metrics: HealthMetrics;
  /** Dependency status */
  dependencyStatus: DependencyStatus;
  /** S10-S29 certification preservation flag */
  s10S29Preserved: boolean;
}

export interface ComponentSummary {
  /** Component identifier */
  component: string;
  /** Health status */
  status: 'healthy' | 'degraded' | 'unhealthy';
  /** Last health check timestamp */
  lastCheck: Date;
  /** S10-S29 preservation status */
  certifiedPreserved: boolean;
}

export interface ActiveAlert {
  /** Alert unique identifier */
  id: string;
  /** Alert severity */
  severity: 'info' | 'warning' | 'critical';
  /** Alert category */
  category: 'deployment' | 'health' | 'security' | 'performance' | 'runtime';
  /** Alert message */
  message: string;
  /** Alert timestamp */
  timestamp: Date;
  /** Auto-resolve enabled */
  autoResolve: boolean;
  /** Resolution timestamp (if resolved) */
  resolvedAt?: Date;
}

export interface HealthMetrics {
  /** CPU utilization percentage */
  cpuUsage: number;
  /** Memory utilization percentage */
  memoryUsage: number;
  /** Active request count */
  activeRequests: number;
  /** Error rate percentage */
  errorRate: number;
  /** Request latency (ms) */
  averageLatency: number;
  /** Request throughput (req/sec) */
  throughput: number;
  /** Uptime (seconds) */
  uptime: number;
}

export interface DependencyStatus {
  /** S10-S29 packages status */
  certifiedPackages: Map<string, 'healthy' | 'degraded' | 'unhealthy'>;
  /** External dependencies status */
  external: Map<string, 'healthy' | 'degraded' | 'unhealthy' | 'unknown'>;
  /** Last dependency check */
  lastChecked: Date;
}

export interface HealthCheckResult {
  /** Health check identifier */
  id: string;
  /** Health check status */
  status: 'healthy' | 'degraded' | 'unhealthy';
  /** Detailed result message */
  detail: string;
  /** Timestamp of check */
  checkedAt: Date;
  /** S10-S29 preservation verified */
  certified: boolean;
}