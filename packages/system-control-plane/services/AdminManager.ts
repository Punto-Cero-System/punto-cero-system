/**
 * Admin Manager Service for S32 Administration & Control Plane Foundation
 * 
 * Manages System administrator profiles and operator lifecycle
 * 
 * Constraint: NO lógica vertical, solo administración System universal
 */

import { SystemAdminProfile } from '../models/SystemAdminProfile';

export interface AdminManagerConfig {
  /** Default profile status */
  defaultStatus: 'ACTIVE' | 'SUSPENDED' | 'DEPROACTIVATED';
  /** Enable profile suspension auto-logging */
  autoAuditSuspension: boolean;
  /** Maximum active profiles per identity */
  maxActiveProfiles: number;
}

export interface AdminManager {
  /** Create a new admin profile */
  createProfile(profile: Omit<SystemAdminProfile, 'createdAt' | 'updatedAt'>): Promise<SystemAdminProfile>;
  
  /** Get admin profile by ID */
  getProfile(adminId: string): Promise<SystemAdminProfile | null>;
  
  /** List all active profiles */
  listActiveProfiles(): Promise<Array<SystemAdminProfile>>;
  
  /** Update admin profile */
  updateProfile(adminId: string, updates: Partial<SystemAdminProfile>): Promise<SystemAdminProfile | null>;
  
  /** Suspend an admin profile */
  suspendProfile(adminId: string, reason: string): Promise<SystemAdminProfile | null>;
  
  /** Reactivate a suspended profile */
  reactivateProfile(adminId: string): Promise<SystemAdminProfile | null>;
  
  /** Deactivate a profile permanently */
  deactivateProfile(adminId: string, reason: string): Promise<SystemAdminProfile | null>;
  
  /** Validate admin profile permissions */
  validateProfilePermissions(adminId: string, requiredPermissions: Array<string>): Promise<{
    valid: boolean;
    missingPermissions: Array<string>;
    profile: SystemAdminProfile | null;
  }>;
}

export default AdminManager;