/**
 * Core Client - Cliente de comunicación hacia Core L1.
 * Encapsula la conexión y estado con el Core.
 */
export interface CoreClient {
  /** Identificador único del cliente */
  clientId: string
  /** Estado actual de la conexión */
  status: ClientStatus
  /** Versión del cliente */
  version: string
  /** Configuración del cliente */
  config: CoreClientConfig
  /** Inicializa el cliente con configuración */
  initialize(config: CoreClientConfig): Promise<void>
  /** Obtiene el estado actual del cliente */
  getStatus(): ClientStatus
  /** Establece el estado actual del cliente */
  setStatus(status: ClientStatus): void
}

/** Estados del cliente disponibles. */
export const CLIENT_STATUSES = {
  DISCONNECTED: 'disconnected' as const,
  CONNECTING: 'connecting' as const,
  CONNECTED: 'connected' as const,
  DISCONNECTING: 'disconnecting' as const
} as const

export type ClientStatus = typeof CLIENT_STATUSES[keyof typeof CLIENT_STATUSES]

/** Estado inicial del Core Client. */
export const DEFAULT_CORE_CLIENT_STATUS = 'disconnected' as const
export const DEFAULT_CORE_CLIENT_VERSION = '0.2.0-next' as const

/** Implementación concreta del CoreClient */
export class CoreClientImpl implements CoreClient {
  public clientId: string
  public status: ClientStatus
  public version: string
  public config: CoreClientConfig

  constructor(clientId: string, config?: CoreClientConfig) {
    this.clientId = clientId
    this.config = config || {
      endpoint: '',
      coreVersion: '',
      timeout: 30000
    }
    this.status = DEFAULT_CORE_CLIENT_STATUS
    this.version = DEFAULT_CORE_CLIENT_VERSION
  }

  public async initialize(config: CoreClientConfig): Promise<void> {
    this.config = config
    this.status = 'connecting' as ClientStatus
    // Simulación de inicialización - no hay conexión real todavía
    await Promise.resolve()
    this.status = 'connected' as ClientStatus
  }

  public getStatus(): ClientStatus {
    return this.status
  }

  public setStatus(status: ClientStatus): void {
    this.status = status
  }
}