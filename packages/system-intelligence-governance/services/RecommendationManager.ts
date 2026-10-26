/*
 * RecommendationManager.ts - S48 Recommendation management, observer pattern
 * bypassAuthorization: false, never executes actions, zero vertical
 */
export class RecommendationManager {
  recommendations = new Map();
  history = [];

  createRecommendation(d) {
    const r = { recommendationId: { identityId: `rec-${Date.now()}`, identityType: `universal` }, sourceIntelligence: { intelligenceId: { identityId: `intel-${Date.now()}`, identityType: `universal` }, intelligenceType: `GLOBAL` }, confidence: 0, status: `CREATED`, authorizationRequirement: { bypassAuthorization: false, authorizedBy: { identityId: `core-l1`, identityType: `universal` }, authorizationTimestamp: Date.now() }, recommendationContent: { insight: `Insight generado - observación y recomendación solamente. No ejecuciones automáticas.` }, ...d };
    this.recommendations.set(r.recommendationId.identityId, r);
    this.recordObserver(r.recommendationId.identityId);
    return r;
  }

  getRecommendation(id) { return this.recommendations.get(id); }

  updateStatus(id, status, auth) {
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

  getAll() { return Array.from(this.recommendations.values()); }

  getHistory() { return this.history; }

  validateRecommendation(r) {
    const errors = [];
    if (r.authorizationRequirement.bypassAuthorization !== false) errors.push(`bypass must be false`);
    const prohibited = /execute|run|decide|implement|autonomico|automatic/i;
    if (prohibited.test(r.recommendationContent.insight)) errors.push(`prohibited directive`);
    return { valid: errors.length === 0, errors };
  }
}