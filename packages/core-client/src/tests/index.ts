/** Tests básicos para core-client S10.3 */
/* eslint-env mocha */

import { CoreClient, CoreClientImpl, CLIENT_STATUSES, DEFAULT_STATUS, VERSION } from '../index'
import { Request, Response } from '../types'
import { validateRequestCompatibility, validateResponseCompatibility } from '../validators/contract'
import { InternalCommunication } from '../communication/interface'

describe('Core Client S10.3 - Basic Tests', () => {
  describe('Version y exports', () => {
    it('debe tener la versión correcta', () => {
      expect(VERSION).toBe('0.2.0-next')
    })

    it('debe tener STATUS por defecto', () => {
      expect(DEFAULT_STATUS).toBe('disconnected')
    })
  })

  describe('CoreClient', () => {
    let client: CoreClient

    beforeEach(() => {
      client = new CoreClientImpl('test-client-1')
    })

    it('debe crear cliente con estado disconnected', () => {
      expect(client.getStatus()).toBe('disconnected')
    })

    it('debe inicializar cliente', async () => {
      const config = {
        endpoint: 'http://core-l1:8080',
        coreVersion: '1.0.0',
        timeout: 30000
      }
      await client.initialize(config)
      expect(client.getStatus()).toBe('connected')
      expect(client.config).toEqual(config)
    })

    it('debe establecer y obtener status', () => {
      ;(client as any).setStatus('connecting')
      expect(client.getStatus()).toBe('connecting')
    })

    it('debe tener CLIENT_STATUSES definidos', () => {
      expect(CLIENT_STATUSES).toHaveProperty('DISCONNECTED')
      expect(CLIENT_STATUSES).toHaveProperty('CONNECTING')
      expect(CLIENT_STATUSES).toHaveProperty('CONNECTED')
      expect(CLIENT_STATUSES).toHaveProperty('DISCONNECTING')
    })
  })

  describe('Request y Response', () => {
    it('debe crear un Request válido', () => {
      const request: Request = {
        id: 'req-001',
        operation: 'test-operation',
        context: { key: 'value' },
        payload: { data: 123 }
      }
      expect(request.id).toBe('req-001')
      expect(request.operation).toBe('test-operation')
    })

    it('debe crear un Response válido', () => {
      const response: Response<string> = {
        id: 'resp-001',
        success: true,
        result: 'success-data',
        error: null
      }
      expect(response.id).toBe('resp-001')
      expect(response.success).toBe(true)
      expect(response.result).toBe('success-data')
      expect(response.error).toBeNull()
    })

    it('debe crear un Response con error', () => {
      const error: { code: string; message: string } = { code: 'ERR_CONNECTION', message: 'Failed' }
      const response: Response = {
        id: 'resp-002',
        success: false,
        result: null,
        error: error
      }
      expect(response.success).toBe(false)
      expect(response.error).toEqual(error)
    })
  })

  describe('Validación de contrato', () => {
    describe('validateRequestCompatibility', () => {
      it('debe validar request con todos los campos', () => {
        const request = {
          id: 'req-001',
          operation: 'test',
          context: {},
          payload: {}
        }
        const result = validateRequestCompatibility(request)
        expect(result.valid).toBe(true)
        expect(result.errors).toHaveLength(0)
      })

      it('debe fallar request sin operation', () => {
        const request = {
          id: 'req-001',
          context: {},
          payload: {}
        } as any
        const result = validateRequestCompatibility(request)
        expect(result.valid).toBe(false)
        expect(result.errors.some((e: any) => e.code === 'ERR_CONTRACT_REQUIRED')).toBe(true)
      })

      it('debe fallar request sin context', () => {
        const request = {
          id: 'req-001',
          operation: 'test',
          payload: {}
        } as any
        const result = validateRequestCompatibility(request)
        expect(result.valid).toBe(false)
        expect(result.errors.some((e: any) => e.code === 'ERR_CONTRACT_REQUIRED')).toBe(true)
      })
    })

    describe('validateResponseCompatibility', () => {
      it('debe validar response con todos los campos', () => {
        const response = {
          id: 'resp-001',
          success: true,
          result: 'data',
          error: null
        }
        const result = validateResponseCompatibility(response)
        expect(result.valid).toBe(true)
        expect(result.errors).toHaveLength(0)
      })

      it('debe fallar response sin id', () => {
        const response = {
          success: true,
          result: 'data',
          error: null
        } as any
        const result = validateResponseCompatibility(response)
        expect(result.valid).toBe(false)
        expect(result.errors.some((e: any) => e.code === 'ERR_CONTRACT_REQUIRED')).toBe(true)
      })
    })
  })

  describe('Comunicación interna', () => {
    it('debe crear comunicación interna', () => {
      const comm = new InternalCommunication()
      expect(comm).toBeInstanceOf(InternalCommunication)
    })

    it('debe simular send en comunicación interna', async () => {
      const comm = new InternalCommunication()
      const request: Request = {
        id: 'req-001',
        operation: 'test',
        context: {},
        payload: {}
      }
      const response = await comm.send(request)
      expect(response.id).toBe('req-001')
      expect(response.success).toBe(true)
    })
  })
})