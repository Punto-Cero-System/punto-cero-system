/*
 * MemoryAccess.ts - S49 System Global AI Memory Foundation
 * Memory access validation, S11/S12/S13 governed, no direct access
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47, S48
 * NO acceso directo sin autorización, NO ejecuta acciones
 * Observer pattern only
 */

// S49 Allowed Access levels
export type AllowedAccess = 
  | 'S11_IDENTITY_VERIFIED'
  | 'S12_AUTHORIZATION_VERIFIED' 
  | 'S13_CONSUMER_REGISTRY_VERIFIED'
  | 'S47_ANALYTICS_CONTEXT'
  | 'S48_INTELLIGENCE_CONTEXT';

// Universal memory access interface
export interface MemoryAccess {
  // S11 Identity Universal
  accessId: {
    identityId: string;
    identityType: 'universal';
  };

  // Requesting identity
  requesterId: {
    identityId: string;
    identityType: 'universal';
  };

  // Authorized memory scope
  allowedScope: 'GLOBAL' | 'REGIONAL' | 'COUNTRY' | 'TENANT';

  // Authorization validation
  authorizationValidation: {
    bypassAuthorization: false; // HARD CONSTRAINT
    s12Verified: boolean;
    s11Verified: boolean;
    s13Verified: boolean;
    authorizedBy: {
      identityId: string;
      identityType: 'universal';
    };
    authorizationTimestamp: number;
  };

  // Allowed access level
  allowedAccess: AllowedAccess;

  // Memory being accessed
  targetMemoryId: {
    identityId: string;
    identityType: 'universal';
  };

  // Access decision
  accessGranted: boolean;

  // Access audit log
  accessAudit: {
    accessId: string;
    timestamp: number;
    granted: boolean;
    reason?: string;
    autonomous: false; // HARD CONSTRAINT — no autonomous access
  };

  // Timestamps
  createdAt: number;
  updatedAt: number;
}

// Export type for external consumption
export type MemoryAccessType = MemoryAccess;