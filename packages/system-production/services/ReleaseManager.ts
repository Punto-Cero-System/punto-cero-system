/**
 * Release Manager Service for S30 Production Platform
 * 
 * Controls version management, release lifecycle, and update workflow
 * 
 * Constraint: NO modifica S10-S29, solo agrega infraestructura operacional
 */

import { ReleasePlan, ReleaseStatus, ReleaseInfo, ReleaseManagerConfig } from '../models/Release';
import { DeploymentPlan, DeploymentResult } from '../models/Deployment';

export interface ReleaseManager {
  planRelease(release: Omit<ReleasePlan, 'id'>): Promise<ReleasePlan>;
  executeRelease(releaseId: string): Promise<ReleaseStatus>;
  checkReleaseStatus(releaseId: string): Promise<ReleaseStatus>;
  requestRollback(releaseId: string, reason: string): Promise<ReleaseStatus>;
  getCurrentStatus(): Promise<ReleaseStatus>;
  validateReleaseCompatibility(release: ReleasePlan): Promise<{
    compatible: boolean;
    s10S29Preserved: boolean;
    verticalIsolation: 'maintained' | 'compromised' | 'unknown';
    issues: Array<{
      type: string;
      description: string;
      severity: 'critical' | 'warning' | 'info';
    }>;
  }>;
  getReleaseHistory(): Promise<Array<ReleaseInfo>>;
  checkForUpdates(): Promise<{
    available: boolean;
    latestVersion: string;
    releaseType: 'major' | 'minor' | 'patch';
    compatibility: 'compatible' | 'incompatible' | 'unknown';
  }>;
}

export default ReleaseManager;