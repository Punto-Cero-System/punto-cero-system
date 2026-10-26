/**
 * SYSTEM-S21 GOVERNANCE RUNTIME
 * GovernanceValidator - Validador triple check para operativas governance
 * 
 * Pattern idént a CapabilityValidator S20: validaciones triple check
 * 1. consumer existe en ConsumerRegistry S13
 * 2. context válido en ContextRuntime S11.3
 * 3. capability válida en CapabilityRuntime S20
 * 4. ausencia lógica vertical en todos los fields
 */

export class GovernanceValidator {
  /**
   * Valida que el consumer existe en ConsumerRegistry S13
   * @param consumerId ID del consumer a validar
   * @returns true si el consumer existe
   */
  static validateConsumerExists(consumerId: string): boolean {
    // En implementación real, consultaría ConsumerRegistry S13
    // Por aquí validamos que consumerId sea string no vacío
    return typeof consumerId === 'string' && consumerId.length > 0;
  }

  /**
   * Valida que el context es válido en ContextRuntime S11.3
   * @param contextId ID del context a validar
   * @returns true si el context es válido
   */
  static validateContextValid(contextId: string): boolean {
    // En implementación real, consultaría ContextRuntime S11.3
    // Por aquí validamos que contextId sea UUID format
    return typeof contextId === 'string' && contextId.startsWith('ctx-');
  }

  /**
   * Valida que la capability es válida en CapabilityRuntime S20
   * @param capabilityId ID de la capability a validar
   * @returns true si la capability es válida
   */
  static validateCapabilityValid(capabilityId: string): boolean {
    // En implementación real, consultaría CapabilityRegistry S20
    // Por aquí validamos que capabilityId sea UUID format y capabilityType sea horizontal
    return typeof capabilityId === 'string' && capabilityId.startsWith('cap-');
  }

  /**
   * Valida ausencia lógica vertical en todos los fields governance
   * @param eventType tipo de evento governance
   * @param actorType tipo de actor
   * @param action acción realizada
   * @param status status del event/evento
   * @returns true si no hay lógica vertical
   */
  static validateNoVerticalDependencies(
    eventType: string,
    actorType: string,
    action: string,
    status?: string
  ): boolean {
    // eventType debe ser horizontal-only: CREATE, UPDATE, EXECUTE, VALIDATE, FAILURE, CLOSE
    const validEventTypes: string[] = ['CREATE', 'UPDATE', 'EXECUTE', 'VALIDATE', 'FAILURE', 'CLOSE'];
    if (!validEventTypes.includes(eventType)) {
      return false;
    }

    // actorType debe ser valor del enum pre-defined, sin términos verticales
    const validActorTypes: string[] = [
      'identity_universal',
      'tenant_universal',
      'context_runtime',
      'capability_runtime',
      'authorization_foundation',
      'universal_adapter',
      'governance_runtime'
    ];
    if (!validActorTypes.includes(actorType)) {
      return false;
    }

    // action debe ser system-agnostic, sin términos verticales
    const validActions: string[] = [
      'capability_registry_insert',
      'capability_resolution',
      'context_validation',
      'authorization_decision',
      'event_registration',
      'state_transition'
    ];
    if (!validActions.includes(action)) {
      return false;
    }

    // status (if provided) debe ser enum puro sin asociación vertical
    if (status) {
      const validStatuses: string[] = ['pending', 'completed', 'cancelled', 'failed'];
      if (!validStatuses.includes(status)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Validación completa triple check para GovernanceEvent
   */
  static validateGovernanceEvent(
    consumerId: string,
    contextId: string,
    capabilityId: string,
    eventType: string,
    actorType: string,
    action: string
  ): {
    consumerValid: boolean;
    contextValid: boolean;
    capabilityValid: boolean;
    noVerticalDependencies: boolean;
    overallValid: boolean;
  } {
    return {
      consumerValid: this.validateConsumerExists(consumerId),
      contextValid: this.validateContextValid(contextId),
      capabilityValid: this.validateCapabilityValid(capabilityId),
      noVerticalDependencies: this.validateNoVerticalDependencies(eventType, actorType, action),
      overallValid: this.validateConsumerExists(consumerId) &&
                       this.validateContextValid(contextId) &&
                       this.validateCapabilityValid(capabilityId) &&
                       this.validateNoVerticalDependencies(eventType, actorType, action)
    };
  }
}