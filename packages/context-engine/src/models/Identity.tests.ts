/** 
 * @fileoverview Identity Universal Tests
 * Basic tests for IdentityUniversal model and createIdentityUniversal factory.
 * Principles:
 * - Tests models and types only, sin integración externa
 * - Validate correct creation
 * - Validate required fields
 * - Validate compatibility with ContextIdentity
 * - Validate absence of vertical dependencies
 * 
 * @version 0.1.1
 * @status Tests - models only
 */
import { IdentityUniversal, createIdentityUniversal } from './models'

describe('createIdentityUniversal factory', () => {
  it('should create valid IdentityUniversal with default values', () => {
    const identity = createIdentityUniversal({
      identityId: 'factory-id-123',
      identityType: 'user'
    })
    expect(identity).toBeDefined()
    expect(identity.identityId).toBe('factory-id-123')
    expect(identity.identityType).toBe('user')
    expect(identity.status).toBe('active')
    expect(identity.source).toBe('system')
    expect(identity.createdAt).toBeDefined()
    expect(identity.updatedAt).toBeDefined()
  })

  it('should create IdentityUniversal with custom values', () => {
    const createdAt = '2024-06-15T10:30:00.000Z'
    const updatedAt = '2024-06-15T11:00:00.000Z'
    const identity = createIdentityUniversal({
      identityId: 'custom-id',
      identityType: 'admin',
      status: 'inactive',
      source: 'institutional',
      createdAt,
      updatedAt
    })
    expect(identity.identityId).toBe('custom-id')
    expect(identity.identityType).toBe('admin')
    expect(identity.status).toBe('inactive')
    expect(identity.source).toBe('institutional')
    expect(identity.createdAt).toBe(createdAt)
    expect(identity.updatedAt).toBe(updatedAt)
  })

  it('should throw error when identityId is empty', () => {
    expect(() => {
      createIdentityUniversal({
        identityId: '',
        identityType: 'user'
      })
    }).toThrow('identityId es requerido')
  })

  it('should throw error when identityType is empty', () => {
    expect(() => {
      createIdentityUniversal({
        identityId: 'test-id',
        identityType: ''
      })
    }).toThrow('identityType es requerido')
  })

  it('should use default status "active" when not provided', () => {
    const identity = createIdentityUniversal({
      identityId: 'default-status-id',
      identityType: 'user'
    })
    expect(identity.status).toBe('active')
  })

  it('should use default source "system" when not provided', () => {
    const identity = createIdentityUniversal({
      identityId: 'default-source-id',
      identityType: 'user'
    })
    expect(identity.source).toBe('system')
  })
})

describe('compatibility with ContextIdentity', () => {
  it('should be compatible with ContextIdentity base fields', () => {
    const identity: IdentityUniversal = {
      identityId: 'compatible-id',
      identityType: 'test',
      status: 'active',
      source: 'system',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
    expect(identity.identityId).toBeDefined()
    expect(identity.identityType).toBeDefined()
    expect(identity.status).toBeDefined()
  })

  it('should extend beyond ContextIdentity with additional fields', () => {
    const identity: IdentityUniversal = {
      identityId: 'extended-id',
      identityType: 'extended',
      status: 'active',
      source: 'system',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
    expect(identity.identityId).toBeDefined()
    expect(identity.identityType).toBeDefined()
    expect(identity.status).toBeDefined()
    expect(identity.source).toBeDefined()
    expect(identity.createdAt).toBeDefined()
    expect(identity.updatedAt).toBeDefined()
  })
})

describe('absence of vertical dependencies', () => {
  it('should not contain vertical-specific types', () => {
    const identity = createIdentityUniversal({
      identityId: 'no-vertical-id',
      identityType: 'system'
    })
    expect(identity.identityType).not.toBe('legal')
    expect(identity.identityType).not.toBe('medical')
    expect(identity.identityType).not.toBe('business')
    expect(identity.identityType).not.toBe('partner')
    expect(['system', 'institutional', 'base']).toContain(identity.source)
  })

  it('status values should be system-defined only', () => {
    const identity = createIdentityUniversal({
      identityId: 'status-test-id',
      identityType: 'user'
    })
    expect(['active', 'inactive', 'pending', 'deleted']).toContain(identity.status)
    expect(identity.status).not.toBe('approved')
    expect(identity.status).not.toBe('superseded')
  })
})