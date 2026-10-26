/**
 * SYSTEM-S21 GOVERNANCE RUNTIME
 * AuditService - Crear trazabilidad universal
 * 
 * Responsabilidad: crear y mantener audit trail universal sin conocer lógica vertical
 * Integración: recibe GovernanceRecord desde GovernanceRecorder, persiste en storage System
 */

export class AuditService {
  /**
   * Crea un record de audit a partir de un GovernanceEvent
   * @param eventId ID del evento governance
   * @param actorType tipo de actor que realizó la acción
   * @param action acción realizada
   * @param result resultado de la acción
   * @returns SystemAuditRecord creado
   */
  static createAuditRecord(
    eventId: string,
    actorType: string,
    action: string,
    result: 'SUCCESS' | 'FAILURE' | 'REVIEW_PENDING'
  ): SystemAuditRecord {
    return {
      auditId: this.generateAuditId(),
      eventId: eventId,
      actorType: this.validateActorType(actorType),
      action: this.validateAction(action),
      timestamp: new Date(),
      result: result
    };
  }

  /**
   * Valida que el actorType sea un valor del enum pre-defined
   */
  private static validateActorType(actorType: string): string {
    const validTypes: string[] = [
      'identity_universal',
      'tenant_universal',
      'context_runtime',
      'capability_runtime',
      'authorization_foundation',
      'universal_adapter',
      'governance_runtime'
    ];
    return validTypes.includes(actorType) ? actorType : 'governance_runtime';
  }

  /**
   * Valida que la acción sea un valor del enum pre-defined
   */
  private static validateAction(action: string): string {
    const validActions: string[] = [
      'capability_registry_insert',
      'capability_resolution',
      'context_validation',
      'authorization_decision',
      'event_registration',
      'state_transition'
    ];
    return validActions.includes(action) ? action : 'event_registration';
  }

  /**
   * Genera un auditId único System-owned
   */
  private static generateAuditId(): string {
    return 'audit-' + Math.random().toString(36).substr(2, 9);
  }
}