/**
 * Communication Interface - Abstracción interna para comunicación con Core L1.
 * Define la firma para enviar requests y recibir responses.
 * Permite futuro transporte (HTTP, RPC, sin proceso) sin cambiar la lógica del cliente.
 *
 * NOTA: Esta es una abstracción ONLY. No implementa conexión externa todavía.
 */
export interface CommunicationInterface {
  /** Envía una request a Core L1 y retorna una response.
   *  Sin implementación real en S10.3 - placeholder para futuras fases.
   */
  send<T>(request: Request): Promise<Response<T>>

  /** Cierra la conexión o recurso asociado.
   *  Sin implementación real en S10.3 - placeholder para futuras fases.
   */
  close(): Promise<void>
}

/** Comunicación interna en-proceso (S10.3).
 *  Implementación básica que permite testing y desarrollo sin Core L1 real.
 *  En futuras fases (S11+), esto podría migrar a HTTP/RPC adapter.
 */
export class InternalCommunication implements CommunicationInterface {
  private closed: boolean = false

  async send<T>(request: Request): Promise<Response<T>> {
    // En S10.3, esta es una operación simulada sin conexión real.
    // Retorna una response con estructura básica.
    return {
      id: request.id,
      success: true,
      result: null as T | null,
      error: null
    }
  }

  async close(): Promise<void> {
    this.closed = true
  }
}