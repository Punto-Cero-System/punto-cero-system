# models - Tenant.ts
/**
 * Tenant model for S38 Multi-Tenant Operational Foundation.
 * Universal model only - no vertical data, no SDK, no gateway.
 * Reuses existing S13 ConsumerRegistry, S11 Identity, S12 AuthorizationFoundation.
 * Tenant identification only, no new tenants created, observer pattern only.
 */

export interface Tenant {
  id: string; // S13 ConsumerRegistry reference
  identityId: string; // S11 Identity reference
  authorizationId: string; // S12 AuthorizationFoundation reference
  status: 'active' | 'inactive' | 'suspended';
  created: string;
  lastModified: string;
  commercialS31Ref?: string; // S31 Commercial Foundation reference
  controlPlaneS32Ref?: string; // S32 Control Plane reference
  intelligenceS34Ref?: string; // S34 Intelligence reference
  adminS37Ref?: string; // S37 Global Administration reference
  verticalProhibited: boolean; // Hard constraint enforced
}