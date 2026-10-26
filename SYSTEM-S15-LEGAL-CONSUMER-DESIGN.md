# SYSTEM-S15-LEGAL-CONSUMER-DESIGN.md

## S15 — First L2 Consumer Connection: Legal Consumer Design

**Date:** 2026-10-23
**Phase:** S15 - Fase 2: Diseño del Consumer Profile Legal
**Status:** In Progress
**Based on:** SYSTEM-S15-LEGAL-CONSUMER-AUDIT.md

### 1. LegalConsumerProfile Definition

The `LegalConsumerProfile` defines the L2 consumer connection point with System Core. It contains only universal fields - no vertical legal logic.

#### 1.1 Profile Structure

| Field | Type | Description |
|-------|------|-------------|
| `consumerId` | string | Unique Legal consumer identifier |
| `consumerType` | `'legal'` | Declared type - System knows type but not vertical logic |
| `version` | string | Compatible version (e.g., `0.1.0`) |
| `declaredCapabilities` | string[] | Capabilities Legal declares it needs from System |
| `requiredContracts` | string[] | Contracts required from contracts 0.1.0 |
| `status` | `'pending' \| 'active' \| 'inactive'` | Connection status |

#### 1.2 Example LegalConsumerProfile

```json
{
  "consumerId": "legal-001",
  "consumerType": "legal",
  "version": "0.1.0",
  "declaredCapabilities": [
    "identity",
    "tenant",
    "context",
    "authorization",
    "legal.documents",
    "legal.cases"
  ],
  "requiredContracts": [
    "contract-0.1.0"
  ],
  "status": "pending"
}
```

#### 1.3 Declared Capabilities Breakdown

**Universal Capabilities (System provides, Legal declares):**
- `identity` - Universal identity management (S11.1)
- `tenant` - Universal tenancy (S11.2)
- `context` - Universal context propagation (S11.3)
- `authorization` - Universal authorization decisions (S12)

**Exclusively Legal Capabilities (Legal declares, System routes):**
- `legal.documents` - Legal document handling (opaque routing only)
- `legal.cases` - Legal case management (opaque routing only)

### 2. System Registration of Capabilities

#### 2.1 What System Registers

| Capability | Source | Integration Point |
|------------|--------|-------------------|
| `identity` | S11.1 IdentityUniversal | ConsumerRegistry |
| `tenant` | S11.2 TenantUniversal | ConsumerRegistry |
| `context` | S11.3 ContextRuntime | ContextEngine |
| `authorization` | S12 AuthorizationFoundation | Authorization check |
| `contracts` | contracts 0.1.0 | Contract validation |

#### 2.2 What System NEVER Registers (Never)

| Capability | Reason |
|------------|--------|
| `legal.documents` | Vertical legal data - never in System |
| `legal.cases` | Vertical legal data - never in System |
| `legal.processes` | Vertical legal data - never in System |
| `legal.billing` | Vertical legal data - never in System |
| `legal.clients` | Vertical legal data - never in System |

#### 2.3 Capability Routing Mechanism

```
Legal declares: [identity, tenant, context, authorization, legal.documents, legal.cases]

System registers (universal only):     [identity, tenant, context, authorization]
System routes opaque (no interpretation): [legal.documents, legal.cases]

UniversalAdapter executes:
  validateConsumer() → ConsumerRegistry S13
  validateContext() → ContextEngine S11.3
  checkAuthorization() → AuthorizationFoundation S12
  executeCapability() → routes through Core Client
```

### 3. Legal Responsibilities That Remain in Legal

| Responsibility | Location | Reason |
|----------------|----------|--------|
| `casos jurídicos` | Legal | Exclusive legal domain |
| `documentos legales` | Legal | Exclusive legal domain |
| `abogados` | Legal | Exclusive legal domain |
| `clientes jurídicos` | Legal | Exclusive legal domain |
| `expedientes` | Legal | Exclusive legal domain |
| `procesos legales` | Legal | Exclusive legal domain |
| `facturación jurídica` | Legal | Exclusive legal domain |

### 4. LegalConsumerProfile Constraints

| Constraint | Status | Evidence |
|------------|--------|----------|
| ❌ No legal models in System | ✅ Pass | Only consumerType = "legal" |
| ❌ No legal database access | ✅ Pass | Through UniversalAdapter only |
| ❌ No legal business logic | ✅ Pass | Only declarative capabilities |
| ❌ No vertical integration | ✅ Pass | UniversalAdapter neutral |
| ❌ System knows legal internals | ✅ Pass | Only declared capabilities |
| ✅ contracts 0.1.0 used | ✅ Pass | Required contracts list |
| ✅ ConsumerRegistry S13 | ✅ Pass | Consumer validation |
| ✅ Authorization S12 | ✅ Pass | Auth checks |
| ✅ ContextRuntime S11.3 | ✅ Pass | Context propagation |

### 5. S15 Fase 2 Design Summary

**LegalConsumerProfile created with:**
- ✅ consumerId: unique Legal consumer identifier
- ✅ consumerType: "legal" (System knows type, not logic)
- ✅ version: "0.1.0" (contracts version)
- ✅ declaredCapabilities: mixed universal + Legal declarations
- ✅ requiredContracts: ["contract-0.1.0"]
- ✅ status: "pending" (waiting S15 integration)

**Key Principle:** `System registra capacidades. System NO ejecuta lógica jurídica.`

**Profile validated against S14 foundation:**
- ✅ ConsumerRegistry S13 operational
- ✅ UniversalAdapter S14 operational
- ✅ AuthorizationFoundation S12 operational
- ✅ ContextRuntime S11.3 operational
- ✅ contracts 0.1.0 intacto

### 6. S15 Fase 2 Closure

**S15 Fase 2 (Diseño) is complete when:**
- LegalConsumerProfile defined with universal fields only
- Declared capabilities distinguished: universal vs Legal
- System registration mechanism defined (not implementation)
- Legal responsibilities confirmed to remain in Legal
- Profile ready for Fase 3 integration preparation

**Current Status:** ✅ S15 Fase 2 Complete

**Next Phase:** S15 Fase 3 — Preparación de Integración