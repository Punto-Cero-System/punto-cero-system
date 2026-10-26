# models - AdminSession.ts
/**
 * Admin session model for S37 Global Administration.
 * Universal model only - no vertical data, no SDK, no gateway.
 * Uses existing S11 Identity + S12 AuthorizationFoundation.
 * Short-lived sessions, observed by S37, governed by Core L1.
 */

export interface AdminSession {
  id: string;
  profile: 'founder' | 'system_operator' | 'regional_operator' | 'support_operator' | 'auditor';
  identityId: string; //S11 reference
  authorizationRef: string; //S12 reference
  startedAt: string;
  expiresAt: string;
  status: 'active' | 'expired';
  scope: 'observe' | 'recommend'; //S37 scope limitation
}