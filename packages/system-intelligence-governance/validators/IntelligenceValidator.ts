/*
 * IntelligenceValidator.ts - S48 Enforcer
 * bypassAuthorization: false, rejects vertical data, observer pattern only
 * NO ejecuta acciones, NO modifica consumidores, NO administra tenants/países/operadores
 */
export class IntelligenceValidator {
  // Validate intelligence model
  static validateIntelligence(m) {
    const errors = [];
    if (m.authorizationContext.bypassAuthorization !== false) errors.push(`bypassAuthorization must be false`);
    const prohibitedTypes = /LEGAL|MEDICAL|BUSINESS|PRODUCT|AI/i;
    if (prohibitedTypes.test(m.intelligenceType)) errors.push(`vertical intelligence type detected: ${m.intelligenceType}`);
    const validLifecycle = ['DEFINED', 'TRAINED', 'VALIDATED', 'AVAILABLE', 'OBSERVED', 'RETIRED'];
    if (!validLifecycle.includes(m.lifecycle)) errors.push(`invalid lifecycle: ${m.lifecycle}`);
    if (typeof m.confidenceLevel !== 'number' || m.confidenceLevel < 0 || m.confidenceLevel > 100) errors.push(`confidenceLevel must be 0-100`);
    return { valid: errors.length === 0, errors };
  }

  // Validate knowledge context
  static validateContext(c) {
    const errors = [];
    if (c.authorizationRequirement?.includes('S12') && c.authorizationRequirement.bypassAuthorization !== false) errors.push(`bypassAuthorization must be false`);
    const prohibitedScopes = /LEGAL|MEDICAL|BUSINESS|ONE/i;
    if (prohibitedScopes.test(c.scope)) errors.push(`vertical context scope detected: ${c.scope}`);
    if (!['UNVALIDATED', 'VALIDATED', 'VALIDATION_PENDING', 'ARCHIVED'].includes(c.validationStatus)) errors.push(`invalid validationStatus: ${c.validationStatus}`);
    return { valid: errors.length === 0, errors };
  }

  // Validate recommendation model
  static validateRecommendation(r) {
    const errors = [];
    if (r.authorizationRequirement.bypassAuthorization !== false) errors.push(`bypassAuthorization must be false`);
    const prohibitedDirectives = /execute|run|decide|implement|autonomico|automatic/i;
    if (prohibitedDirectives.test(r.recommendationContent.insight)) errors.push(`recommendation contains prohibited action directive`);
    const validStatuses = ['CREATED', 'VALIDATED', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'ARCHIVED'];
    if (!validStatuses.includes(r.status)) errors.push(`invalid status: ${r.status}`);
    if (typeof r.confidence !== 'number' || r.confidence < 0 || r.confidence > 100) errors.push(`confidence must be 0-100`);
    return { valid: errors.length === 0, errors };
  }

  // Validate lifecycle transition
  static validateLifecycleTransition(from, to) {
    const validTransitions = {
      DEFINED: ['TRAINED', 'RETIRED'],
      TRAINED: ['VALIDATED', 'RETIRED'],
      VALIDATED: ['AVAILABLE', 'RETIRED'],
      AVAILABLE: ['OBSERVED', 'RETIRED'],
      OBSERVED: ['RETIRED'],
    };
    return validTransitions[from]?.includes(to) || false;
  }

  // Check zero vertical contamination
  static checkZeroVertical(data) {
    const prohibitedPatterns = ['legal', 'medical', 'business', 'one', 'vertical'];
    const issues = [];
    for (const pattern of prohibitedPatterns) {
      if (typeof data === 'object' && data !== null) {
        const keys = Object.keys(data).filter(k => k.toLowerCase().includes(pattern));
        if (keys.length > 0) issues.push(`found ${pattern} related keys: ${keys.join(', ')}`);
      } else if (typeof data === 'string' && data.toLowerCase().includes(pattern)) {
        issues.push(`found ${pattern} in data`);
      }
    }
    return { zeroVertical: issues.length === 0, issues };
  }
}