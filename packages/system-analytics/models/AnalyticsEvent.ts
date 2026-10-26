/*
 * AnalyticsEvent.ts — S47 System Global Analytics Foundation
 * Universal event observation, no real money, no vertical analysis
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46
 * Observer pattern only, no autonomous execution
 * NO calcula impuestos, NO maneja dinero real, NO facturación fiscal
 * NO analiza Legal, Medical, Business, One
 * NO crea dashboards verticales
 * NO reemplaza sistemas consumidores
 */

// Universal analytics event type
export type AnalyticsEventType = 'state-change' | 'allocation' | 'transition' | 'observation' | 'validation' | 'metric' | 'aggregation';

// Analytics event — observational only, no real money
export interface AnalyticsEvent {
  // S11 Identity Universal
  eventId: {
    identityId: string;
    identityType: 'universal';
  };

  // Source layer where event originated
  sourceLayer: 'L1' | 'L2' | 'L3' | 'L4';

  // Source component that generated the event
  sourceComponent: string; // e.g., 'SettlementManager', 'SettlementAllocationManager', 'SettlementEntry'

  // Timestamp of event generation
  timestamp: number;

  // Correlation ID for tracking across systems
  correlationId: string;

  // Authorization context (S12 enforcement)
  authorizationContext: {
    bypassAuthorization: false; // HARD CONSTRAINT
    authorizedBy: {
      identityId: string;
      identityType: 'universal';
    };
    authorizationTimestamp: number;
  };

  // Tenant context (optional, S38 reuse)
  tenantContext?: {
    tenantId: {
      identityId: string;
      identityType: 'universal';
    };
    tenantScope: 'multi' | 'single';
  };

  // Country context (optional, S39 reuse)
  countryContext?: {
    countryCode: string;
    countryName: string;
    territoryScope: 'global' | 'regional' | 'country';
    isVisibleToCountry: boolean;
  };

  // Event type classification
  eventType: AnalyticsEventType;

  // Observation data (optional — for state changes, transitions)
  observationData?: {
    previousState?: 'pending' | 'processing' | 'completed' | 'closed';
    newState?: 'pending' | 'processing' | 'completed' | 'closed';
    autonomous: false; // HARD CONSTRAINT — no autonomous execution
  };

  // Metric references (optional — links to Metric model)
  metricRef?: {
    metricId: {
      identityId: string;
      identityType: 'universal';
    };
    metricType: 'event-count' | 'state-duration' | 'participation-rate' | 'transition-rate' | 'custom';
  };

  // Observer pattern tracking
  observedBy?: {
    identity: {
      identityId: string;
      identityType: 'universal';
    };
    observationTimestamp: number;
    observationData: {
      previousState?: 'pending' | 'processing' | 'completed' | 'closed';
      newState?: 'pending' | 'processing' | 'completed' | 'closed';
      autonomous: false; // HARD CONSTRAINT
    };
  };
}

// Export type for external consumption
export type AnalyticsEventInterface = AnalyticsEvent;