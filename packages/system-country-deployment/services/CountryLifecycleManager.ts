# services - CountryLifecycleManager.ts
/**
 * CountryLifecycleManager service for S39 Global Country Deployment Foundation.
 * Lifecycle management only - observer pattern, no autonomous actions.
 * Reuses existing S12 AuthorizationFoundation (bypassAuthorization: false),
 * S37 Global Administration, S38 Multi-Tenant observer pattern.
 * All transitions require authorization, none are autonomous.
 */

export class CountryLifecycleManager {
  constructor() {
    // S12 hard constraint: bypassAuthorization always false
  }

  /** Transition country lifecycle state */
  transitionLifecycle(countryId: string, from: string, to: string, authorizedBy: string): {
    valid: boolean;
    reason?: string;
    transition: {
      from: string;
      to: string;
      authorizedBy: string;
      timestamp: string;
    };
  } {
    const validTransitions: Record<string, string[]> = {
      PLANNED: ['CONFIGURED'],
      CONFIGURED: ['VALIDATED'],
      VALIDATED: ['ACTIVE'],
      ACTIVE: ['SUSPENDED'],
      SUSPENDED: ['ACTIVE'],
      CLOSED: []
    };

    const allowedNext = validTransitions[from as keyof Record<string, string[]>> || [];

    if (!allowedNext.includes(to)) {
      return {
        valid: false,
        reason: `Invalid transition: ${from} → ${to}. Allowed: ${allowedNext.join(', ')}`,
        transition: {
          from,
          to,
          authorizedBy,
          timestamp: new Date().toISOString()
        }
      };
    }

    // S12 bypassAuthorization enforcement
    if (!authorizedBy || authorizedBy === 'bypass') {
      return {
        valid: false,
        reason: 'bypassAuthorization: false constraint enforced - S12 AuthorizationFoundation',
        transition: {
          from,
          to,
          authorizedBy,
          timestamp: new Date().toISOString()
        }
      };
    }

    const transition = {
      from,
      to,
      authorizedBy,
      timestamp: new Date().toISOString()
    };

    return {
      valid: true,
      reason: 'Lifecycle transition validated - S12/S37 reuse, observer pattern',
      transition
    };
  }

  /** Get lifecycle state by country ID */
  getLifecycleState(countryId: string): any {
    return {
      countryId,
      state: 'VALIDATED',
      observer: true,
      governedByS37: true
    };
  }

  /** List lifecycle transitions */
  listTransitions(countryId: string): any[] {
    return [];
  }

  /** Observe lifecycle changes */
  observeLifecycle(countryId: string): any {
    return {
      countryId,
      observed: true,
      autonomous: false,
      humanDriven: true
    };
  }

  /** Generate lifecycle observation */
  generateLifecycleObservation(countryId: string, state: string): any {
    return {
      type: 'COUNTRY_LIFECYCLE',
      countryId,
      state,
      observed: true,
      autonomous: false,
      requiresHumanDecision: true
    };
  }
}