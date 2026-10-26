/**
 * Health Monitor Service for S30 Production Platform
 * 
 * Verifies operational state, monitors health checks, and reports system status
 * 
 * Constraint: NO modifica S10-S29, solo agrega infraestructura operacional
 */

import { SystemHealthReport, ComponentSummary, ActiveAlert, HealthMetrics, HealthCheckResult, DependencyStatus } from '../models/SystemHealth';

export interface HealthMonitorConfig {
  /** Health check interval (seconds) */
  checkInterval: number;
  /** Critical health check threshold */
  criticalThreshold: number;
  /** Warning health check threshold */
  warningThreshold: number;
  /** Enable continuous monitoring */
  continuousMonitoring: boolean;
  /** S10-S29 preservation verification */
  verifyCertifiedState: boolean;
}

export interface HealthMonitor {
  /** Perform comprehensive system health check */
  checkHealth(): Promise<SystemHealthReport>;
  
  /** Check individual component health */
  checkComponent(componentId: string): Promise<ComponentSummary>;
  
  /** Retrieve current active alerts */
  getActiveAlerts(): Promise<Array<ActiveAlert>>;
  
  /** Retrieve health metrics snapshot */
  getMetrics(): Promise<HealthMetrics>;
  
  /** Validate S10-S29 certification preservation */
  verifyCertifiedStatePreservation(): Promise<{
    preserved: boolean;
    details: Array<{
      component: string;
      status: 'preserved' | 'compromised';
      evidence: string;
    }>;
  }>;
  
  /** Check dependency health */
  checkDependencies(): Promise<DependencyStatus>;
  
  /** Generate health check report */
  generateReport(): Promise<{
    id: string;
    overallHealth: 'optimal' | 'healthy' | 'degraded' | 'critical';
    timestamp: Date;
    summary: string;
    recommendations: Array<string>;
  }>;
}

export default HealthMonitor;