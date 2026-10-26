# SYSTEM-S12-DESIGN

## S12 Authorization Foundation - Design

**Date:** 2026-10-23
**Phase:** S12 Design
**Status:** In Progress
**S11.1:** APPROVED (Identity Universal)
**S11.2:** APPROVED (Tenant Foundation)
**S11.3:** CERTIFIED (Context Runtime)

---

### 2.1 Authorization Model

**Concept:** Represents an authorization decision with minimal system-owned fields.

**Fields:**
- `subject` - IdentityUniversal reference (identityId)
- `resource` - Resource identifier (string)
- `capability` - Capability Universal type (system-owned)
- `decision` - AuthorizationDecision type (allowed/denied/reason)

**Principles:**
- System-owned only (no vertical types)
- Compositional: Identity + Tenant + Context + Capability → Decision
- Minimal fields: only what's needed for access decision
- Reference-only: no operations, no persistence

**AuthorizationDecision union type:**
- `allowed` - Access granted
- `denied` - Access rejected with reason
- `reason` - Optional string explaining denial

---

### 2.2 Capability Universal

**Definition:** System-owned capability types that answer "what can this context do?"

**Allowed capability types (System-only):**
- `system.read` - Read system data
- `system.manage` - Manage system configuration
- `consumer.access` - Access consumer resources
- `tenant.manage` - Manage tenant scope

**Prohibited capability types (Vertical):**
- ❌ legal.case.edit
- ❌ medical.patient.read
- ❌ business.inventory.update
- ❌ One-specific operations

**Capability format:** `system.{action}` or `consumer.{resource}` or `tenant.{operation}`

**Validation:** Capability must be from the allowed System-only list. Any vertical-type capability is rejected at the model level.

---

### 2.3 AuthorizationContext

**Definition:** Context for authorization evaluation, composed from S11 foundations.

**Fields:**
- `contextId` - SystemContext contextId
- `identityId` - IdentityUniversal identityId
- `tenantId` - TenantUniversal tenantId
- `consumerId` - Optional consumer identifier

**Composition:**
```
IdentityUniversal (S11.1)
    │
    ├── identityId
    │
TenantUniversal (S11.2)
    │
    ├── tenantId
    │
ContextRuntime (S11.3)
    │
    ├── contextId
    │
Authorization Design (S12) ←─╮
                                │
                                ↓
                      AuthorizationContext
```

**Principles:**
- Built from certified S11 foundations
- No vertical data injection
- Reference-only, no persistence
- Composable for evaluation

---

### 2.4 AuthorizationEvaluator

**Definition:** Evaluates authorization request and produces AuthorizationDecision.

**Input:**
- `ContextRuntime` - Validated context from Identity + Tenant
- `Capability` - System-owned capability type
- `Resource` - Resource identifier string

**Output:**
- `AuthorizationDecision` - allowed/denied + reason

**Evaluation logic:**
1. Validate ContextRuntime has identityId and tenantId
2. Validate Capability is from System-only list
3. Check identity-tenancy relationship consistency
4. Return AuthorizationDecision based on system policy

**No implementation of:**
- ✅ No authentication logic
- ✅ No session management
- ✅ No business operation execution
- ✅ No external service calls
- ✅ No vertical permission types

**Example evaluation:**
```
Input:  ContextRuntime(contextId="ctx-123", identityId="id-1", tenantId="t-1"), 
        Capability="system.read", 
        Resource="system-config"

Output: AuthorizationDecision(
  decision = allowed,
  reason = "Identity id-1 in tenant t-1 has system.read capability"
)
```

---

### 2.5 Integration Flow

```
IdentityUniversal
        ↓
TenantUniversal
        ↓
ContextRuntime
        ↓
AuthorizationEvaluator
        ↓
AuthorizationDecision
```

**Validation steps:**
1. ✅ identity existente (identityId present in ContextRuntime)
2. ✅ tenant válido (tenantId present and consistent)
3. ✅ contexto válido (contextId, identityId, tenantId all present)
4. ✅ capability system-owned (from allowed list)
5. ✅ decision rendered (allowed/denied + reason)

**No vertical integration at any step.**

---

### 2.6 Design Principles Summary

| Principle | Description |
|-----------|-------------|
| System-owned only | All types and values defined within System boundary |
| Capability-only | No vertical-specific permissions or roles |
| Composable | Built from certified S11 foundations |
| Minimal fields | Only subject, resource, capability, decision |
| Reference-only | No sessions, no persistence, no operations |
| Forward-compatible | Designed for L2 consumer integration |
| No vertical integration | Only system/institutional/base types allowed |

---

### 2.7 Non-Goals (Explicitly Out of Scope)

- ❌ Authentication/authorization logic implementation
- ❌ Vertical-specific capability types (legal/medical/business/One)
- ❌ RBAC role definitions
- ❌ Session management
- ❌ Persistence or database integration
- ❌ Business logic or operations decision
- ❌ Modification of contracts 0.1.0
- ❌ SDK or gateway creation

---

### 2.8 Design Review

**All design criteria validated:**
- ✅ System-owned authorization model
- ✅ Capability Universal with System-only types
- ✅ AuthorizationContext composed from S11 foundations
- ✅ AuthorizationEvaluator with minimal input
- ✅ AuthorizationDecision with allowed/denied/reason
- ✅ No vertical types creeping in
- ✅ Compatible with IdentityUniversal (S11.1)
- ✅ Compatible with TenantUniversal (S11.2)
- ✅ Compatible with ContextRuntime (S11.3)
- ✅ No contract 0.1.0 modifications
- ✅ Ready for implementation phase

**Progression to S13 Implementation phase:** Ready upon approval.