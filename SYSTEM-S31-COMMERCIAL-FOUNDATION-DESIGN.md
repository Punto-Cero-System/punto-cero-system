# SYSTEM-S31 — COMMERCIAL FOUNDATION

## Phase 2: Design — COMPLETE

**Constraint**: NO vertical logic (Legal/Medical/Business/One) | **S31**: Universal commercial foundation only  
**S31 convierte a Punto Cero System en plataforma administrable comercialmente**  
**S31 NO convierte al System en una aplicación vertical**  

---

### 1. SYSTEMPLAN MODEL

| Field | Type | Description |
|-------|------|-------------|
| planId | string | Identificador único del plan |
| name | string | Nombre del plan (universal, sin verticales) |
| type | string | Tipo de plan (universal codes only) |
| status | string | Status del plan (ACTIVE, INACTIVE, ARCHIVED) |
| countryAvailability | Array<string> | países habilitados (codigos ISO universales) |
| currencySupport | Array<string> | monedas soportadas (codigos ISO universales) |

**NO incluir**:
- usuarios finales verticales
- clientes jurídicos
- pacientes
- inventarios

**Example planType values**: 'STANDARD', 'PREMIUM', 'ENTERPRISE' (universal, no vertical-specific)

---

### 2. SYSTEMLICENSE MODEL

| Field | Type | Description |
|-------|------|-------------|
| licenseId | string | Identificador único de licencia |
| consumerId | string | ID del consumidor L2 |
| planId | string | Referencia al plan System |
| startDate | date | Fecha de inicio |
| endDate | date | Fecha de fin |
| status | string | ESTATE: ACTIVE, SUSPENDED, EXPIRED, CANCELLED |

**Responsabilidades**:
- System emite y controla licencias
- L2 Consumer usa la licencia dentro de su dominio
- Validación: consumerId existe en ConsumerRegistry S13

---

### 3. COMMERCIALACCOUNT MODEL

| Field | Type | Description |
|-------|------|-------------|
| accountId | string | Identificador único de cuenta comercial |
| tenantId | string | ID del tenant (S11.2) |
| consumerId | string | ID del consumidor L2 |
| country | string | país ISO code (universal) |
| currency | string | moneda ISO code (universal) |
| status | string | ACTIVE, SUSPENDED, CLOSED |

**Validaciones**:
- country debe ser código ISO universal (no vertical-specific)
- currency debe ser código ISO universal (no vertical-specific)
- consumerId debe existir en ConsumerRegistry S13

---

### 4. SUBSCRIPTIONSTATE MODEL

| Estado | Descripción |
|--------|-------------|
| ACTIVE | Suscripción activa, servicios disponibles |
| SUSPENDED | Suspendida temporalmente (por mora, mantenimiento) |
| EXPIRED | Suscripción expirada (fecha fin pasada) |
| CANCELLED | Cancelada permanentemente |

**Transiciones**:
- ACTIVE → SUSPENDED (por mora o petición)
- SUSPENDED → ACTIVE (reactivación)
- ACTIVE → EXPIRED (fecha fin alcanzada)
- CANCELLED (no tiene retorno, cuenta cerrada)

---

### 5. COMMERCIAL FOUNDATION FLOW

```
IdentityUniversal S11.1
    ↓
TenantUniversal S11.2
    ↓
ConsumerRegistry S13
    ↓
Commercial Foundation (S31) ← NEW
    ↓
Billing Foundation S26++
    ↓
System Operations S29
    ↓
System Production S30
    ↓
L2 Consumer
```

#### Commercial Foundation Responsibilities

| Area | S31 Responsibility | L2 Consumer |
|------|-------------------|-------------|
| Plan administration | ✅ Manage System plans | ❌ No vertical logic |
| License control | ✅ Issue/renew/suspend licenses | ❌ No vertical logic |
| Commercial account management | ✅ Manage account structure | ❌ No vertical data |
| Subscription lifecycle | ✅ Manage states (ACTIVE/SUSPENDED/EXPIRED/CANCELLED) | ❌ L2 manages their processes |
| Country/currency validation | ✅ Universal codes only | ❌ No vertical codes |
| Billing integration | ✅ S31 framework + S26++ points | ❌ L2 manages their billing |
| Consumer processes | ❌ NO | ✅ L2 manages their processes |

---

### 6. DESIGN DECLARATION

**S31 Phase 2: DESIGN COMPLETE** — 4 universal models designed (SystemPlan, SystemLicense, CommercialAccount, SubscriptionState), commercial flow defined, boundaries established with L2 Consumers.

**S31 Constraints Honored**:
- ✅ NO vertical logic added (Legal/Medical/Business/One)
- ✅ NO certified S10-S30 components modified
- ✅ Code universal only (L1/System-level)
- ✅ NO new SDK publicly created
- ✅ NO new Gateway externally created
- ✅ NO new authentication system
- ✅ NO contract breaking (S10-S30 preserved)
- ✅ Verticales siguen siendo consumidores L2

**Design Date**: 2026-10-24  
**Result**: ✅ READY FOR PHASE 3 (ARCHITECTURE)

**End of S31 Phase 2: Design**