import { CapabilityUniversal, AuthorizationDecision } from './Authorization'
import { AuthorizationEvaluator, AuthorizationEvaluation } from './AuthorizationEvaluator'
import { IdentityUniversal, createIdentityUniversal } from '../Identity/models'
import { TenantUniversal, createTenantUniversal } from '../models/Tenant'
import { SystemContext, createContextRuntime } from '../models/ContextRuntime'

describe('CapabilityUniversal', () => {
  it('allows system-owned capabilities', () => {
    const valid: CapabilityUniversal[] = [
      'system.read', 'system.manage', 'consumer.access', 'tenant.manage'
    ]
    valid.forEach(cap => expect(cap).toBeDefined())
  })
})

describe('AuthorizationDecision', () => {
  it('allows decision:allowed', () => {
    const d: AuthorizationDecision = { decision: 'allowed' }
    expect(d.decision).toBe('allowed')
  })
  it('allows decision:allowed:withReason', () => {
    const d: AuthorizationDecision = { decision: 'allowed', reason: 'ok' }
    expect(d.decision).toBe('allowed')
    expect(d.reason).toBe('ok')
  })
  it('requires decision:denied:withReason', () => {
    const d: AuthorizationDecision = { decision: 'denied', reason: 'nope' }
    expect(d.decision).toBe('denied')
    expect(d.reason).toBe('nope')
  })
})

describe('AuthorizationEvaluator', () => {
  const evaluator = new AuthorizationEvaluator()

  it('allows valid evaluation', () => {
    const identity = createIdentityUniversal({ identityId: 'id-1', identityType: 'user', status: 'active', source: 'system' })
    const tenant = createTenantUniversal({ tenantId: 't-1', tenantType: 'user', status: 'active', identityId: 'id-1', source: 'system' })
    const context = createContextRuntime(identity, tenant)

    const evaluation: AuthorizationEvaluation = {
      context: {
        contextId: context.contextId,
        identityId: identity.identityId,
        tenantId: tenant.tenantId,
        consumerId: context.consumerId
      },
      capability: 'system.read',
      resource: 'res'
      }

    const result = evaluator.evaluate(evaluation)
    expect(result.decision).toBe('allowed')
  })

  it('denies missing identityId', () => {
    expect(() => {
      evaluator.evaluate({
        context: { contextId: 'c', identityId: '', tenantId: 't', consumerId: undefined } as any,
        capability: 'system.read',
        resource: 'r'
      })
    }).toThrow()
  })

  it('denies missing tenantId', () => {
    expect(() => {
      evaluator.evaluate({
        context: { contextId: 'c', identityId: 'id', tenantId: '', consumerId: undefined } as any,
        capability: 'system.read',
        resource: 'r'
      })
    }).toThrow()
  })

  it('denies invalid capability', () => {
    expect(() => {
      evaluator.evaluate({
        context: { contextId: 'c', identityId: 'id', tenantId: 't', consumerId: undefined } as any,
        capability: 'legal.case.edit' as any,
        resource: 'r'
      })
    }).toThrow()
  })

  it('denies empty resource', () => {
    expect(() => {
      evaluator.evaluate({
        context: { contextId: 'c', identityId: 'id', tenantId: 't', consumerId: undefined } as any,
        capability: 'system.read',
        resource: ''
      })
    }).toThrow()
  })
})
