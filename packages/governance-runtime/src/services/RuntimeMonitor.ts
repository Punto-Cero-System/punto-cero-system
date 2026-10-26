/**
 * SYSTEM-S21 GOVERNANCE RUNTIME
 * RuntimeMonitor - Observar estado operacional del runtime
 * 
 * Responsabilidad: monitorizar estado operacional en tiempo real, tracking por consumer
 * Integración: actualiza RuntimeState basado en eventos observados
 * No modifica ConsumerRegistry, ContextRuntime o CapabilityRuntime structures
 */

export class RuntimeMonitor {
  /**
   * Actualiza el estado operacional de un runtime instance
   * @param consumerId ID del consumer L2
   * @param newStatus nuevo estado operativo
   * @returns RuntimeState actualizado
   */
  static updateRuntimeState(
    consumerId: string,
    newStatus: 'ACTIVE' | 'INACTIVE' | 'DEGRADED' | 'SUSPENDED'
  ): RuntimeState {
    const lastActivity = new Date();
    
    return {
      runtimeId: 'runtime-' + consumerId,
      consumerId: consumerId,
      status: newStatus,
      lastActivity: lastActivity,
      health: this.determineHealth(newStatus)
    };
  }

  /**
   * Determina el estado de health basándose en el status operativo
   */
  private static determineHealth(status: 'ACTIVE' | 'INACTIVE' | 'DEGRADED' | 'SUSPENDED'): 'HEALTHY' | 'DEGRADED' | 'CRITICAL' {
    switch (status) {
      case 'ACTIVE': return 'HEALTHY';
      case 'INACTIVE': return 'HEALTHY'; // Inactive is not unhealthy, just inactive
      case 'DEGRADED': return 'DEGRADED';
      case 'SUSPENDED': return 'CRITICAL';
      default: return 'HEALTHY';
    }
  }

  /**
   * Observa el estado actual de un consumer runtime
   * @param consumerId ID del consumer a observar
   * @returns RuntimeState actual del consumer
   */
  static observeRuntimeState(consumerId: string): RuntimeState {
    // En implementación real, consultaría el RuntimeState storage
    // Por ahora retorna un estado por defecto basado en ConsumerRegistry
    return {
      runtimeId: 'runtime-' + consumerId,
      consumerId: consumerId,
      status: 'ACTIVE',
      lastActivity: new Date(),
      health: 'HEALTHY'
    };
  }
}