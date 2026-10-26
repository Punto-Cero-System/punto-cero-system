/*
 * Metric.ts — S47 System Global Analytics Foundation
 * Universal metric representation, observational only, no real money
 * Reuses: S11, S12, S13, S31, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46
 * Scopes: GLOBAL | REGIONAL | COUNTRY | TENANT (NO vertical: LEGAL, MEDICAL, BUSINESS, ONE)
 * Observer pattern only, no autonomous execution
 * NO calcula impuestos, NO maneja dinero real, NO facturación fiscal
 * NO analiza Legal, Medical, Business, One
 */

// Metric types allowed (no vertical scopes)
export type MetricType = 
  | 'event-count'
  | 'state-duration' 
  | 'participation-rate'
  | 'transition-rate'
  | 'custom';

// Metric scope — no vertical allowed
export type MetricScope = 'global' | 'regional' | 'country' | 'tenant';

// Metric lifecycle — 5 states with observer pattern
export type MetricLifecycleState = 
  | 'DEFINED'
  | 'VALIDATED' 
  | 'ACTIVE'
  | 'OBSERVED'
  | 'ARCHIVED';

// Valid transitions for metric lifecycle
export const validMetricTransitions: {
  DEFINED: ['VALIDATED', 'ARCHIVED'];
  VALIDATED: ['ACTIVE', 'ARCHIVED'];
  ACTIVE: ['OBSERVED', 'ARCHIVED'];
  OBSERVED: ['ARCHIVED'];
} = {
  DEFINED: ['VALIDATED', 'ARCHIVED'],
  VALIDATED: ['ACTIVE', 'ARCHIVED'],
  ACTIVE: ['OBSERVED', 'ARCHIVED'],
  OBSERVED: ['ARCHIVED'];
};

// Universal metric interface — observational only
export interface Metric {
  // S11 Identity Universal
  metricId: {
    identityId: string;
    identityType: 'universal';
  };

  // Metric type classification
  metricType: MetricType;

  // Scope — GLOBAL, REGIONAL, COUNTRY, TENANT (NO vertical)
  scope: MetricScope;

  // Aggregation rule — how the metric value was computed
  aggregationRule: 'sum' | 'average' | 'count' | 'max' | 'min' | 'observation';

  // Lifecycle state
  lifecycle: MetricLifecycleState;

  // Timestamp when metric was recorded
  timestamp: number;

  // Metric value
  value: number;

  // Unit of measurement
  unit: string;

  // Correlation ID for tracking
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

  // Observer pattern tracking
  observedBy?: {
    identity: {
      identityId: string;
      identityType: 'universal';
    };
    observationTimestamp: number;
    observationData: {
      previousState: MetricLifecycleState;
      newState: MetricLifecycleState;
      autonomous: false; // HARD CONSTRAINT
    };
  };
}

// Export type for external consumption
export type MetricInterface = Metric;