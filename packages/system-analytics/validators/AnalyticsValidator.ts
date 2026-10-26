/*
 * AnalyticsValidator.ts — S47 Structure defined
 * Enforces bypassAuthorization: false, rejects vertical data
 */

export const AnalyticsValidator = {
  validateAnalyticsEvent(event: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check bypassAuthorization: false
    if (event.authorizationContext?.bypassAuthorization !== false) {
      errors.push('bypassAuthorization must be false');
    }

    // Check vertical contamination
    const verticalPatterns = /legal|medical|business|one/i;
    if (event.tenantContext && verticalPatterns.test(event.tenantContext.tenantId.tenantId.identityId)) {
      errors.push('Vertical tenant reference detected');
    }
    if (event.countryContext && verticalPatterns.test(event.countryContext.countryCode)) {
      errors.push('Vertical country reference detected');
    }

    // Check observer pattern
    if (event.observedBy && event.observedBy.observationData && event.observedBy.observationData.autonomous !== false) {
      errors.push('Autonomous execution detected - observer pattern violation');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  },

  validateMetric(metric: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check bypassAuthorization: false
    if (metric.authorizationContext?.bypassAuthorization !== false) {
      errors.push('bypassAuthorization must be false');
    }

    // Check scope is not vertical
    const verticalPatterns = /legal|medical|business|one/i;
    if (metric.scope && verticalPatterns.test(metric.scope)) {
      errors.push('Vertical scope detected');
    }

    // Check observer pattern
    if (metric.observedBy && metric.observedBy.observationData && metric.observedBy.observationData.autonomous !== false) {
      errors.push('Autonomous execution detected - observer pattern violation');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  },

  validateAnalyticsLifecycle(lifecycle: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check bypassAuthorization: false
    if (lifecycle.authorizationContext?.bypassAuthorization !== false) {
      errors.push('bypassAuthorization must be false');
    }

    // Check lifecycle state validity
    const validStates = ['DEFINED', 'VALIDATED', 'ACTIVE', 'OBSERVED', 'ARCHIVED'];
    if (!validStates.includes(lifecycle.state)) {
      errors.push('Invalid lifecycle state');
    }

    // Check observer pattern
    if (lifecycle.observedBy && lifecycle.observedBy.observationData && lifecycle.observedBy.observationData.autonomous !== false) {
      errors.push('Autonomous execution detected - observer pattern violation');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
};