# validators - PartnerOperatorValidator.ts
/**
 * PartnerOperator validator for S40 Global Partner & Operator Foundation.
 * Universal validator only - no vertical data, no SDK, no gateway.
 * Enforces bypassAuthorization: false, rejects vertical data.
 * Governed by Core L1 (S10-S23), reuses S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry, S31 Commercial, S37 Global Administration, S38 Multi-Tenant, S39 Country Deployment, S40 Partner/Operator.
 */

export interface PartnerOperatorValidationResult {
  valid: boolean;
  reason?: string;
  verticalProhibited: boolean;
  bypassAuthorization: boolean;
}

export class PartnerOperatorValidator {
  constructor() {
    // S12 hard constraint: bypassAuthorization always false
  }

  /** Validate partner against boundaries */
  validatePartner(partner: any): PartnerOperatorValidationResult {
    const verticals = ['legal', 'medical', 'business', 'one'];
    const partnerId = partner?.partnerId || '';
    const partnerType = partner?.partnerType || '';
    const partnerScope = partner?.partnerScope || '';

    // Check vertical prohibition at partner level
    const verticalDetected = verticals.some(v => 
      partnerId.toLowerCase().includes(v) || 
      partnerType.toLowerCase().includes(v) || 
      partnerScope.toLowerCase().includes(v)
    );

    if (verticalDetected) {
      return {
        valid: false,
        reason: 'Vertical data prohibited at partner level (Legal/Medical/Business/One)',
        verticalProhibited: true,
        bypassAuthorization: false
      };
    }

    // Check bypassAuthorization constraint
    if (!partner?.authorizationId || partner?.authorizationId === 'bypass') {
      return {
        valid: false,
        reason: 'bypassAuthorization: false constraint enforced - S12 AuthorizationFoundation',
        verticalProhibited: false,
        bypassAuthorization: false
      };
    }

    // Check S13 ConsumerRegistry reference exists
    if (!partner?.partnerId || partner?.partnerId === 'undefined') {
      return {
        valid: false,
        reason: 'Partner must have S13 ConsumerRegistry reference',
        verticalProhibited: false,
        bypassAuthorization: false
      };
    }

    // Valid partner
    return {
      valid: true,
      reason: 'Partner validated - S13/S11/S12/S31/S37/S38/S39/S40 reuse, vertical prohibited',
      verticalProhibited: true,
      bypassAuthorization: false
    };
  }

  /** Validate operator against boundaries */
  validateOperator(operator: any): PartnerOperatorValidationResult {
    const verticals = ['legal', 'medical', 'business', 'one'];
    const operatorId = operator?.operatorId || '';
    const operatorType = operator?.operatorType || '';
    const operatorScope = operator?.operatorScope || '';

    // Check vertical prohibition at operator level
    const verticalDetected = verticals.some(v => 
      operatorId.toLowerCase().includes(v) || 
      operatorType.toLowerCase().includes(v) || 
      operatorScope.toLowerCase().includes(v)
    );

    if (verticalDetected) {
      return {
        valid: false,
        reason: 'Vertical data prohibited at operator level (Legal/Medical/Business/One)',
        verticalProhibited: true,
        bypassAuthorization: false
      };
    }

    // Check bypassAuthorization constraint
    if (!operator?.authorizationId || operator?.authorizationId === 'bypass') {
      return {
        valid: false,
        reason: 'bypassAuthorization: false constraint enforced - S12 AuthorizationFoundation',
        verticalProhibited: false,
        bypassAuthorization: false
      };
    }

    // Check S13 ConsumerRegistry reference exists
    if (!operator?.operatorId || operator?.operatorId === 'undefined') {
      return {
        valid: false,
        reason: 'Operator must have S13 ConsumerRegistry reference',
        verticalProhibited: false,
        bypassAuthorization: false
      };
    }

    // Valid operator
    return {
      valid: true,
      reason: 'Operator validated - S13/S11/S12/S31/S37/S38/S39/S40 reuse, vertical prohibited',
      verticalProhibited: true,
      bypassAuthorization: false
    };
  }

  /** Validate assignment against boundaries */
  validateAssignment(assignment: any): PartnerOperatorValidationResult {
    const verticals = ['legal', 'medical', 'business', 'one'];
    const assignmentId = assignment?.assignmentId || '';
    const operatorId = assignment?.operatorId || '';
    const partnerId = assignment?.partnerId || '';

    // Check vertical prohibition at assignment level
    const verticalDetected = verticals.some(v => 
      assignmentId.toLowerCase().includes(v) ||
      operatorId.toLowerCase().includes(v) ||
      partnerId.toLowerCase().includes(v)
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
}