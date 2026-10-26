# SYSTEM-S13-CONsumerRegistry-DESIGN.md

## S13 Consumer Registry L2 Design

### 2.1 Consumer - Minimal Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `consumerId` | string | Unique identifier for the consumer within System | `consumer-001` |
| `consumerType` | string | Type of consumer - legal/medical/business/One | `legal` |
| `consumerName` | string | Human-readable name for the consumer | `LegalDocs` |
| `status` | string | Current status of the consumer | `active` |
| `version` | string | Consumer version declaration | `0.1.0` |
| `registered`registeredregistered` | datetime | When the consumer was registered | `2026-10-23T10:00:00Z` |
| `capabilities` | string[] | Declarative capabilities the consumer claims | `["legal.documents", "legal.filings"]` |

### 2.2 ConsumerCapability - Declarative Representation

Capabilities are **declarations only** - they state what the consumer CAN access, but System does not implement the business logic.

| Capability Pattern | Example | Description |
|-------------------|---------|-------------|
| `legal.documents` | `legal.documents` | Consumer declares it can access legal documents |
| `legal.filings` | `legal.filings` | Consumer declares it can file legal documents |
| `medical.records` | `medical.records` | Consumer declares it can access medical records |
| `medical.prescriptions` | `medical.prescriptions` | Consumer declares it can access prescriptions |
| `business.inventory` | `business.inventory` | Consumer declares it can access business inventory |
| `business.orders` | `business.orders` | Consumer declares it can access orders |
| `one.profile` | `one.profile` | Consumer declares it can access One profile |

**Key Principle:** `System validates the declaration; vertical implements the logic.`

### 2.3 Consumer Registration Flow

```
Identity (S11.1)           Tenant (S11.2)           ContextRuntime (S11.3)
    │                        │                        │
    ├── identityId           ├── tenantId             ├── contextId
    │                        │                        │
Authorization (S12)        │                        │
    │                        │                        │
    └── capability           │                        │
                               │                        │
Consumer Registry (S13)    │                        │
    │   consumerId          │                        │
    │   │                   │                        │
    │   ├── consumerType   │                        │
    │   ├── consumerName   │                        │
    │   ├── status         │                        │
    │   ├── version        │                        │
    │   ├── registeredAt   │                        │
    │   └── capabilities   │                        │
    │                       │                        │
    └── validateConsumer() └──────────────────────────────┘
```

### 2.4 Validation Rules (S13)

| Rule | Description | Source |
|------|-------------|--------|
| `identityId` present | Consumer must have identity reference | S11.1 |
| `tenantId` present | Consumer must have tenant reference | S11.2 |
| `contextId` present | Consumer must have context reference | S11.3 |
| `consumerType` valid | Must be one of: legal/medical/business/One | System-owned |
| `capabilities` not empty | Consumer must declare capabilities | S12 |
| No vertical logic | Capabilities are read-only declarations | System policy |

### 2.5 Architectural Principles Principles

```
┌─────────────────────────────────────────────────────────────────┐
│  SYSTEM (S13 - Consumer Registry L2)                            │
│                                                                 │
│  +------------------+     +---------------------+              │
│  |  Consumer Model  |     |  ConsumerRegistry     |              │
│  |  consumerId→     |     |  registerConsumer()→|              │
│  |  consumerType→   |     |  getConsumer()→     |              │
│  |  consumerName→   |     |  validateConsumer()→|              │
│  |  status→         |     |  listConsumers()→   |              │
│  |  version→        |     |                     |              │
│  |  registeredAt→   |     +---------------------+              │
│  |  capabilities→   │                ↑                    │
│  +------------------+                │                    │
│           │                        │                    │
│           └────────────────────────┘                    │
│                 │                                       │
│              Identity (S11.1)                       │
│              Tenant (S11.2)                        │
│              ContextRuntime (S11.3)                │
│              AuthorizationFoundation (S12)         │
└─────────────────────────────────────────────────────────────────┘

**Constraints:**
- ✅ No vertical integration inside registry
- ✅ No modification of contracts 0.1.0
- ✅ Consumer types: legal/medical/business/One (decl-only)
- ✅ Capabilities: declarative only, no logic
- ✅ Composable from certified S11 foundations
- ✅ System-owned only, no vertical ownership