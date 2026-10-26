/*
 * IntelligenceManager.ts - S48 Observer pattern service
 * bypassAuthorization: false, zero vertical, Core L1 governed
 * NO ejecuta acciones, NO modifica consumidores
 */
export class IntelligenceManager {
  models = new Map();
  contexts = new Map();
  recommendations = new Map();
  history = [];

  createIntelligence(d) {
    const m = { intelligenceId: { identityId: `intel-${Date.now()}`, identityType: `universal` }, intelligenceType: `GLOBAL`, sourceContext: { sourceId: `core-l1`, sourceType: `L1`, sourceTimestamp: Date.now() }, authorizationContext: { bypassAuthorization: false, authorizedBy: { identityId: `core-l1`, identityType: `universal` }, authorizationTimestamp: Date.now() }, lifecycle: `DEFINED`, confidenceLevel: 0, observedEvents: [], contextData: {}, ...d };
    this.models.set(m.intelligenceId.identityId, m);
    this.recordObserver(m.intelligenceId.identityId);
    return m;
  }

  getIntelligence(id) { return this.models.get(id); }

  createKnowledgeContext(d) {
    const c = { contextId: { identityId: `ctx-${Date.now()}`, identityType: `universal` }, scope: `GLOBAL`, sourceId: { identityId: `ctx-src-${Date.now()}`, identityType: `universal` }, validationStatus: `UNVALIDATED`, authorizationRequirement: `S12_REQUIRED`, contextData: {}, ...d };
    this.contexts.set(c.contextId.identityId, c);
    this.recordObserver(c.contextId.identityId);
    return c;
  }

  getKnowledgeContext(id) { return this.contexts.get(id); }

  createRecommendation(d) {
    const r = { recommendationId: { identityId: `rec-${Date.now()}`, identityType: `universal` }, sourceIntelligence: { intelligenceId: { identityId: `intel-${Date.now()}`, identityType: `universal` }, intelligenceType: `GLOBAL` }, confidence: 0, status: `CREATED`, authorizationRequirement: { bypassAuthorization: false, authorizedBy: { identityId: `core-l1`, identityType: `universal` }, authorizationTimestamp: Date.now() }, recommendationContent: { insight: `Insight generado - observación y recomendación solamente. No ejecuciones automáticas.` }, contextData: {}, ...d };
    this.recommendations.set(r.recommendationId.identityId, r);
    this.recordObserver(r.recommendationId.identityId);
    return r;
  }

  getRecommendation(id) { return this.recommendations.get(id); }

  updateRecommendationStatus(id, status, auth) {
    if (auth.bypassAuthorization !== false) return { success: false, error: `bypass must be false` };
    const rec = this.recommendations.get(id);
    if (!rec) return { success: false, error: `not found` };
    rec.status = status;
    this.recordObserver(id);
    this.recommendations.set(id, rec);
    return { success: true, recommendation: rec };
  }

  recordObserver(opId) { this.history.push({ operationId: opId, type: `observation`, timestamp: Date.now() }); }

  getObservers(id) { return this.history.filter(h => h.operationId === id); }

  getAllIntelligence() { return Array.from(this.models.values()); }

  getAllKnowledgeContexts() { return Array.from(this.contexts.values()); }

  getAllRecommendations() { return Array.from(this.recommendations.values()); }

  getHistory() { return this.history; }

  validateIntelligence(m) {
    const errors = [];
    if (m.authorizationContext.bypassAuthorization !== false) errors.push(`bypass must be false`);
    return { valid: errors.length === 0, errors };
  }

  validateContext(c) {
    const errors = [];
    if (c.authorizationRequirement?.includes(`S12`) && c.authorizationRequirement.bypassAuthorization !== false) errors.push(`bypass must be false`);
    return { valid: errors.length === 0, errors };
  }

  validateRecommendation(r) {
    const errors = [];
    if (r.authorizationRequirement.bypassAuthorization !== false) errors.push(`bypass must be false`);
    return { valid: errors.length === 0, errors };
  }
}