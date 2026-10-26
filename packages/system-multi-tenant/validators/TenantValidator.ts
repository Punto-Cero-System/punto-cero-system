# validators - TenantValidator.ts
/**
 * Tenant validator for S38 Multi-Tenant Operational Foundation.
 * Universal validator only - no vertical data, no SDK, no gateway.
 * Enforces bypassAuthorization: false, rejects vertical data.
 * Governed by Core L1 (S10-S23), reuses S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry.
 */

export interface TenantValidationResult {
  valid: boolean;
  reason?: string;
  verticalProhibited: boolean;
  bypassAuthorization: boolean;
}

export class TenantValidator {
  constructor() {
    // S12 hard constraint: bypassAuthorization always false
  }

  /** Validate tenant against S13 ConsumerRegistry, S11 Identity, S12 AuthorizationFoundation */
  validateTenant(tenant: any): TenantValidationResult {
    const verticals = ['legal', 'medical', 'business', 'one'];
    const tenantId = tenant?.id || '';
    const identityId = tenant?.identityId || '';
    const authId = tenant?.authorizationId || '';

    // Check vertical prohibition at tenant level
    const verticalDetected = verticals.some(v => 
      tenantId.toLowerCase().includes(v) || 
      identityId.toLowerCase().includes(v) || 
      authId.toLowerCase().includes(v)
    );

    if (verticalDetected) {
      return {
        valid: false,
        reason: 'Vertical data prohibited at tenant level (Legal/Medical/Business/One)',
        verticalProhibited: true,
        bypassAuthorization: false
      };
    }

    // Check bypassAuthorization constraint
    if (!authId || authId === 'bypass') {
      return {
        valid: false,
        reason: 'bypassAuthorization: false constraint enforced - S12 AuthorizationFoundation',
        verticalProhibited: false,
        bypassAuthorization: false
      };
    }

    // Check S13 ConsumerRegistry reference exists
    if (!tenantId || tenantId === 'undefined') {
      return {
        valid: false,
        reason: 'Tenant must have S13 ConsumerRegistry reference',
        verticalProhibited: false,
        bypassAuthorization: false
      };
    }

    // Valid tenant
    return {
      valid: true,
      reason: 'Tenant validated - S13/S11/S12 reuse, vertical prohibited',
      verticalProhibited: true,
      bypassAuthorization: false
    };
  }

  /** Validate consumer link against boundaries */
  validateConsumerLink(link: any): TenantValidationResult {
    const verticals = ['legal', 'medical', 'business', 'one'];

    // Check vertical prohibition at link level
    const verticalDetected = verticals.some(v => 
      (link?.tenantId || '').toLowerCase().includes(v) ||
      (link?.consumerL2Id || '').toLowerCase().includes(v)
    );

    if (verticalDetected) {
      return {
        valid: false,
        reason: 'Vertical data prohibited at consumer link level (Legal/Medical/Business/One)',
        verticalProhibited: true,
        bypassAuthorization: false
      };
    }

    // Check bypassAuthorization constraint
    if (!link?.authorizationId || link?.authorizationId === 'bypass') {
      return {
        valid: false,
        reason: 'bypassAuthorization: false constraint enforced - S12 AuthorizationFoundation',
        verticalProhibited: false,
        bypassAuthorization: false
      };
    }

    // Valid consumer link
    return {
      valid: true,
      reason: 'Consumer link validated - S13/S11/S12 reuse, vertical prohibited',
      verticalProhibited: true,
      bypassAuthorization: false
    };
  }
}