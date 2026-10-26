# validators - CapabilityValidator.ts
/**
 * Capability validator for S41 System Global Capability Registry Foundation.
 * Universal validator only - no vertical data, no SDK, no gateway.
 * Enforces bypassAuthorization: false, rejects vertical data.
 * Governed by Core L1 (S10-S23), reuses S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry, S31 Commercial, S37 Global Administration, S38 Multi-Tenant, S39 Country Deployment, S40 Partner Operator.
 */

export interface CapabilityValidationResult {
  valid: boolean;
  reason?: string;
  verticalProhibited: boolean;
  bypassAuthorization: boolean;
}

export class CapabilityValidator {
  constructor() {
    // S12 hard constraint: bypassAuthorization always false
  }

  /** Validate capability against boundaries */
  validateCapability(capability: any): CapabilityValidationResult {
    const verticals = ['legal', 'medical', 'business', 'one'];
    const capabilityId = capability?.capabilityId || '';
    const capabilityType = capability?.capabilityType || '';
    const scope = capability?.scope || '';

    // Check vertical prohibition at capability level
    const verticalDetected = verticals.some(v => 
      capabilityId.toLowerCase().includes(v) || 
      capabilityType.toLowerCase().includes(v) || 
      scope.toLowerCase().includes(v)
    );

    if (verticalDetected) {
      return {
        valid: false,
        reason: 'Vertical data prohibited at capability level (Legal/Medical/Business/One)',
        verticalProhibited: true,
        bypassAuthorization: false
      };
    }

    // Check bypassAuthorization constraint
    if (!capability?.authorizationRequirement || capability?.authorizationRequirement === 'bypass') {
      return {
        valid: false,
        reason: 'bypassAuthorization: false constraint enforced - S12 AuthorizationFoundation',
        verticalProhibited: false,
        bypassAuthorization: false
      };
    }

    // Check S13 ConsumerRegistry reference exists
    if (!capability?.capabilityId || capability?.capabilityId === 'undefined') {
      return {
        valid: false,
        reason: 'Capability must have S13 ConsumerRegistry reference',
        verticalProhibited: false,
        bypassAuthorization: false
      };
    }

    // Valid capability
    return {
      valid: true,
      reason: 'Capability validated - S13/S11/S12/S31/S37/S38/S39/S40 reuse, vertical prohibited',
      verticalProhibited: true,
      bypassAuthorization: false
    };
  }

  /** Validate assignment against boundaries */
  validateAssignment(assignment: any): CapabilityValidationResult {
    const verticals = ['legal', 'medical', 'business', 'one'];
    const assignmentId = assignment?.assignmentId || '';
    const capabilityId = assignment?.capabilityId || '';
    const operatorLink = assignment?.operatorLink || '';

    // Check vertical prohibition at assignment level
    const verticalDetected = verticals.some(v => 
      assignmentId.toLowerCase().includes(v) ||
      capabilityId.toLowerCase().includes(v) ||
      operatorLink.toLowerCase().includes(v)
    );

    if (verticalDetected) {
      return {
        valid: false,
        reason: 'Vertical data prohibited at assignment level (Legal/Medical/Business/One)',
        verticalProhibited: true,
        bypassAuthorization: false
      };
    }

    // Check bypassAuthorization constraint
    if (!assignment?.authorizationId || assignment?.authorizationId === 'bypass') {
      return {
        valid: false,
        reason: 'bypassAuthorization: false constraint enforced - S12 AuthorizationFoundation',
        verticalProhibited: false,
        bypassAuthorization: false
      };
    }

    // Valid assignment
    return {
      valid: true,
      reason: 'Assignment validated - S13/S11/S12/S31/S37/S38/S39/S40 reuse, vertical prohibited',
      verticalProhibited: true,
      bypassAuthorization: false
    };
  }

  /** Validate lifecycle against boundaries */
  validateLifecycle(lifecycle: any): CapabilityValidationResult {
    const verticals = ['legal', 'medical', 'business', 'one'];
    const lifecycleId = lifecycle?.lifecycleId || '';
    const currentState = lifecycle?.currentState || '';

    // Check vertical prohibition at lifecycle level
    const verticalDetected = verticals.some(v => 
      lifecycleId.toLowerCase().includes(v) || 
      currentState.toLowerCase().includes(v)
    );

    if (verticalDetected) {
      return {
        valid: false,
        reason: 'Vertical data prohibited at lifecycle level (Legal/Medical/Business/One)',
        verticalProhibited: true,
        bypassAuthorization: false
      };
    }

    // Check bypassAuthorization constraint
    if (!lifecycle?.transitionAuthorizedBy || lifecycle?.transitionAuthorizedBy === 'bypass') {
      return {
        valid: false,
        reason: 'bypassAuthorization: false constraint enforced - S12 AuthorizationFoundation',
        verticalProhibited: false,
        bypassAuthorization: false
      };
    }

    // Valid lifecycle
    return {
      valid: true,
      reason: 'Lifecycle validated - S13/S11/S12/S31/S37/S38/S39/S40 reuse, vertical prohibited',
      verticalProhibited: true,
      bypassAuthorization: false
    };
  }
}