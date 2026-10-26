/** 
 * @fileoverview Tenant Universal Tests
 * Basic tests for TenantUniversal model and createTenantUniversal factory.
 * Principles:
 * - Tests models and types only, sin integración externa
 * - Validate correct creation
 * - Validate required fields
 * - Validate compatibility with IdentityUniversal
 * - Validate absence of vertical dependencies
 * 
 * @version 0.1.1
 * @status Tests - models only
 */
import { TenantUniversal, createTenantUniversal } from './models'

describe('TenantUniversal structure', () => {
  it('should have all required fields', () => {
    const tenant: TenantUniversal = {
      tenantId: 'test-tenant-123',
      tenantType: 'user',
      status: 'active',
      identityId: 'identity-456',
      source: 'system',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
    expect(tenant.tenantId).toBe('test-tenant-123')
    expect(tenant.tenantType).toBe('user')
    expect(tenant.status).toBe('active')
    expect(tenant.identityId).toBe('identity-456')
    expect(tenant.source).toBe('system')
    expect(tenant.createdAt).toBeDefined()
    expect(tenant.updatedAt).toBeDefined()
  })
})

describe('createTenantUniversal factory', () => {
  it('should create valid TenantUniversal with default values', () => {
    const tenant = createTenantUniversal({
      tenantId: 'factory-tenant-123',
      tenantType: 'user',
      identityId: 'identity-456'
    })
    expect(tenant).toBeDefined()
    expect(tenant.tenantId).toBe('factory-tenant-123')
    expect(tenant.tenantType).toBe('user')
    expect(tenant.status).toBe('active')
    expect(tenant.identityId).toBe('identity-456')
    expect(tenant.source).toBe('system')
    expect(tenant.createdAt).toBeDefined()
    expect(tenant.updatedAt).toBeDefined()
  })

  it('should create TenantUniversal with custom values', () => {
    const tenant = createTenantUniversal({
      tenantId: 'custom-tenant',
      tenantType: 'admin',
      status: 'inactive',
      identityId: 'custom-identity',
      source: 'institutional',
      createdAt: '2024-06-15T10:30:00.000Z',
      updatedAt: '2024-06-15T11:00:00.000Z'
    })
    expect(tenant.tenantId).toBe('custom-tenant')
    expect(tenant.tenantType).toBe('admin')
    expect(tenant.status).toBe('inactive')
    expect(tenant.identityId).toBe('custom-identity')
    expect(tenant.source).toBe('institutional')
    expect(tenant.createdAt).toBe('2024-06-15T10:30:00.000Z')
    expect(tenant.updatedAt).toBe('2024-06-15T11:00:00.000Z')
  })

  it('should throw error when tenantId is empty', () => {
    expect(() => createTenantUniversal({ tenantId: '', tenantType: 'user', identityId: 'id' })).toThrow('tenantId es requerido')
  })

  it('should throw error when tenantType is empty', () => {
    expect(() => createTenantUniversal({ tenantId: 't', tenantType: '', identityId: 'id' })).toThrow('tenantType es requerido')
  })

  it('should throw error when identityId is empty', () => {
    expect(() => createTenantUniversal({ tenantId: 't', tenantType: 'u', identityId: '' })).toThrow('identityId es requerido')
  })

  it('should use default status active when not provided', () => {
    const t = createTenantUniversal({ tenantId: 's', tenantType: 'u', identityId: 'i' })
    expect(t.status).toBe('active')
  })

  it('should use default source system when not provided', () => {
    const t = createTenantUniversal({ tenantId: 's', tenantType: 'u', identityId: 'i' })
    expect(t.source).toBe('system')
  })
})

describe('compatibility with IdentityUniversal', () => {
  it('should reference IdentityUniversal via identityId', () => {
    const t: TenantUniversal = { tenantId: 'c', tenantType: 't', status: 'a', identityId: 'i', source: 's', createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' }
    expect(t.identityId).toBeDefined()
  })

  it('should extend beyond basic fields with system-defined values', () => {
    const t: TenantUniversal = { tenantId: 'extended-tenant', tenantType: 'extended', status: 'active', identityId: 'identity-extended', source: 'system', createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' }
    expect(t.tenantId).toBeDefined()
    expect(t.tenantType).toBeDefined()
    expect(t.status).toBeDefined()
    expect(t.identityId).toBeDefined()
    expect(t.source).toBeDefined()
    expect(t.createdAt).toBeDefined()
    expect(t.updatedAt).toBeDefined()
  })
})

describe('absence of vertical dependencies', () => {
  it('should not contain vertical-specific types', () => {
    const t = createTenantUniversal({ tenantId: 'nv', tenantType: 's', identityId: 'i' })
    expect(t.tenantType).not.toBe('legal')
    expect(t.tenantType).not.toBe('medical')
    expect(t.tenantType).not.toBe('business')
    expect(t.tenantType).not.toBe('partner')
    expect(['system', 'institutional', 'base']).toContain(t.source)
  })

  it('status values should be system-defined only', () => {
    const t = createTenantUniversal({ tenantId: 'st', tenantType: 'u', identityId: 'i' })
    expect(['active', 'inactive', 'pending', 'deleted']).toContain(t.status)
    expect(t.status).not.toBe('approved')
    expect(t.status).not.toBe('superseded')
  })
})