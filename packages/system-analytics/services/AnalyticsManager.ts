/*
 * AnalyticsManager.ts — S47 Observer pattern service, Core L1 governed
 * bypassAuthorization: false enforcement, observer pattern, zero vertical
 */

import { AnalyticsEvent } from '../models/AnalyticsEvent';
import { Metric } from '../models/Metric';

export class AnalyticsManager {
  private events = new Map<string, AnalyticsEvent>();
  private metrics = new Map<string, Metric>();
  private history = [] as any[];

  createEvent(data: Partial<AnalyticsEvent>): AnalyticsEvent {
    const event: AnalyticsEvent = {
      eventId: { identityId: `event-${Date.now()}`, identityType: 'universal' },
      sourceLayer: 'L3', sourceComponent: 'AnalyticsManager', timestamp: Date.now(),
      correlationId: `corr-${Date.now()}`, authorizationContext: { bypassAuthorization: false, authorizedBy: { identityId: 'core-l1', identityType: 'universal' }, authorizationTimestamp: Date.now() }, eventType: 'observation',
    };
    this.events.set(event.eventId.identityId, event);
    this.recordObserver(event.eventId.identityId);
    return event;
  }

  getEvent(id: string): AnalyticsEvent | undefined { return this.events.get(id); }

  createMetric(data: Partial<Metric>): Metric {
    const metric: Metric = { metricId: { identityId: `metric-${Date.now()}`, identityType: 'universal' }, metricType: 'event-count', scope: 'global', aggregationRule: 'count', lifecycle: 'DEFINED', timestamp: Date.now(), value: 0, unit: 'events', correlationId: data.correlationId || `corr-${Date.now()}`, authorizationContext: { bypassAuthorization: false, authorizedBy: { identityId: 'core-l1', identityType: 'universal' }, authorizationTimestamp: Date.now() }, };
    this.metrics.set(metric.metricId.identityId, metric);
    this.recordObserver(metric.metricId.identityId);
    return metric;
  }

  getMetric(id: string): Metric | undefined { return this.metrics.get(id); }

  updateMetricLifecycle(id: string, newState: string, auth: { bypassAuthorization: false }): { success: boolean; metric?: Metric; error?: string } {
    if (auth.bypassAuthorization !== false) return { success: false, error: 'bypass must be false' };
    const metric = this.metrics.get(id);
    if (!metric) return { success: false, error: 'not found' };
    const valid = metric.lifecycle === 'DEFINED' && newState === 'VALIDATED' || metric.lifecycle === 'VALIDATED' && newState === 'ACTIVE' || metric.lifecycle === 'ACTIVE' && newState === 'OBSERVED' || metric.lifecycle === 'OBSERVED' && newState === 'ARCHIVED';
    if (!valid) return { success: false, error: 'invalid transition' };
    metric.lifecycle = newState as any;
    this.recordObserver(id);
    this.metrics.set(id, metric);
    return { success: true, metric };
  }

  private recordObserver(opId: string): void { this.history.push({ operationId: opId, type: 'observation', timestamp: Date.now() }); }

  getObservers(id: string): any[] { return this.history.filter(h => h.operationId === id); }

  getAllEvents(): AnalyticsEvent[] { return Array.from(this.events.values()); }

  getAllMetrics(): Metric[] { return Array.from(this.metrics.values()); }

  getHistory(): any[] { return this.history; }

  validateMetric(m: Metric): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (m.authorizationContext.bypassAuthorization !== false) errors.push('bypass must be false');
    if (!['global', 'regional', 'country', 'tenant'].includes(m.scope)) errors.push('Invalid scope');
    const verticalPatterns = /legal|medical|business|one/i;
    if (verticalPatterns.test(m.scope)) errors.push('Vertical scope detected');
    return { valid: errors.length === 0, errors };
  }
}