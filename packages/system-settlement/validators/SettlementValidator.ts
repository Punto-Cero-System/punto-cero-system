/*
 * SettlementValidator.ts -- S46 Structure defined
 * Enforces bypassAuthorization: false, rejects vertical data
 */

export const SettlementValidator = {
  validateSettlementEntry(settlement: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check bypassAuthorization: false
    if (settlement.settlementAuthorizedBy?.bypassAuthorization !== false) {
      errors.push('bypassAuthorization must be false');
    }

    // Check vertical contamination (no Legal/Medical/Business/One)
    const verticalPatterns = /legal|medical|business|one/i;
    if (settlement.tenantId && verticalPatterns.test(settlement.tenantId.tenantId.identityId)) {
      errors.push('Vertical tenant reference detected');
    }
    if (settlement.countryId && verticalPatterns.test(settlement.countryId.countryCode)) {
      errors.push('Vertical country reference detected');
    }
    if (settlement.operatorRef && verticalPatterns.test(settlement.operatorRef.operatorId.identityId)) {
      errors.push('Vertical operator reference detected');
    }

    // Check no real money/economic context
    const realPatterns = /real|money|cash|bank/i;
    if (settlement.economicSettlementContext && settlement.economicSettlementContext.some((c: string) => realPatterns.test(c))) {
      errors.push('Real money/economic context detected');
    }

    // Check observer pattern
    if (settlement.observedBy && settlement.observedBy.length === 0) {
      errors.push('No observers recorded - observer pattern required');
    }

    // Check S11 Identity format
    if (settlement.settlementEntryId && !settlement.settlementEntryId.identityId) {
      errors.push('S11 Identity missing identityId');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
};