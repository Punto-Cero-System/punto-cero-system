# models - AdminProfile.ts
/**
 * Admin profile model for S37 Global Administration.
 * Universal model only - no vertical data, no SDK, no gateway.
 * Uses existing S11 Identity + S12 AuthorizationFoundation.
 * 5 profiles: Founder Administrator, System Operator, Regional Operator, Support Operator, Auditor.
 * All observed by S37, governed by Core L1 (S10-S23).
 */

export interface AdminProfile {
  id: string;
  profile: 'founder' | 'system_operator' | 'regional_operator' | 'support_operator' | 'auditor';
  identityId: string; // References11 reference
  authorizationId: string; //S12 reference
  status: 'active' | 'inactive' | 'suspended';
  created: string;
  lastModified: string;
  permissions: string[]; //Derived from S12 policies, observed only
}

export interface AdminSession {
  id: string;
  profileId: string;
  identityId: string;
  startedAt: string;
  lastActivity: string;
  status: 'active' | 'expired';
}