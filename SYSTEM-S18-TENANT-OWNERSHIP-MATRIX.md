# SYSTEM-S18-TENANT-OWNERSHIP-MATRIX.md

## S18 Fase 2: Matriz Ownership de Tenant/Organization

**Fecha:** 2026-10-23
**Status:** ✅ Complete - Matriz ownership definida, lista para validación S18 Fase 3
**Previous:** SYSTEM-S18-TENANT-ORGANIZATION-AUDIT.md
**Next:** S18 Fase 3 - Validación TenantUniversal (pending)

### 1. Matriz Ownership Final

| Campo | Archivo Actual | Owner Actual | Owner Futuro | Acción S18 |
|-------|---------------|-------------|-------------|-----------|
| **tenantId** | organization.py | Legal (mixto) | **System** | **EXTRAER** - migrar a TenantUniversal |
| **tenantType** | organization.py | Legal (mixto) | **System** | **EXTRAER** - tipo organización universal |
| **tenantStatus** | organization.py | Legal (mixto) | **System** | **EXTRAER** - status tenant (active/inactive/suspended/dissolved) |
| **organization identity universal** | organization.py | Legal (mixto) | **System** | **EXTRAER** - mapeo identity → tenant identity base |
| **relationship Identity → Tenant** | organization.py | Legal (mixto) | **System** | **EXTRAER** - mapping explicit identityId → tenantId |
| **name** | organization.py | **Legal** | **Legal** | **NO MIGRAR** - nombre firma jurídica, bufete, estudio |
| **jurisdiction** | organization.py | **Legal** | **Legal** | **NO MIGRAR** - jurisdicción legal aplicación |
| **firm_type** | organization.py | **Legal** | **Legal** | **NO MIGRAR** - tipo firma: boutique, grande, individual |
| **established_date** | organization.py | **Legal** | **Legal** | **NO MIGRAR** - fecha fundación organización legal |
| **lawyer_count** | organization.py | **Legal** | **Legal** | **NO MIGRAR** - número abogados en firma |
| **client_count** | organization.py | **Legal** | **Legal** | **NO MIGRAR** - número clientes activos firma |
| **case_count** | organization.py | **Legal** | **Legal** | **NO MIGRAR** - número casos activos firma |
| **address** | organization.py | **Legal** | **Legal** | **NO MIGRAR** - dirección física firma |
| **contact_email** | organization.py | **Legal** | **Legal** | **NO MIGRAR** - email contacto firma (diferente user.email) |
| **created_at** | organization.py | Legal (partial) | **System** | **EXTRAER** - metadata timestamp creación |
| **updated_at** | organization.py | Legal (partial) | **System** | **EXTRAER** - timestamp última actualización |

### 2. Resumen Property Transition

| Transition Type | Count | Campos |
|-----------------|-------|--------|
| ✅ Legal → System (universal) | 7 | tenantId, tenantType, tenantStatus, organization identity universal, relationship Identity → Tenant, created_at, updated_at |
| ❌ Legal → Legal (mantener) | 13 | name, jurisdiction, firm_type, established_date, lawyer_count, client_count, case_count, address, contact_email, y 5 fields más |

### 3. Dependencias Mapping identity → Tenant

| Dependencia | Definición S18 | Validación |
|-------------|---------------|-----------|
| **identityId → tenantId** | Un identity (user) puede pertenecer a un tenant (organización) | Matriz S18 Fase 2 define 1:N o 1:1 mapping explícito |
| **tenantId → identity mapping** | Reverse mapping: tenant contiene identities asociadas | Validar integridad referencial pre/post-S18 |
| **IdentityUniversal → TenantUniversal** | Identity S17.2 fields mapean a TenantUniversal S11.2 fields | Tests integración S17.2+S18 validar compatibilidad |

### 3. Validación Pre-Implementation

| Test | Comando | Esperado |
|------|---------|----------|
| TenantUniversal typecheck | `cd packages/universal-adapter && npm run typecheck -- TenantUniversal` | ✅ Pass |
| Identity → Tenant mapping test | `npm test -- IdentityTenantMapping` | ✅ Pass |
| Legal suite no regression | `cd packages/legal && npm test -- full` | ✅ Pass |
| TenantUniqueness validation | `npm run validate -- tenantId uniqueness` | ✅ Pass |

### 4. S18 Fase 2 Cierre

✅ Matriz ownership completada - 20 campos definidos
✅ 7 campos migrarán Legal → System (universal tenant)
✅ 13 campos permanecerán en Legal (organization jurídica)
✅ Mapping identity → tenant definido explícito
✅ Lista para validación TenantUniversal S11.2 compatibilidad
✅ Ready for S18 Fase 3

**Siguiente paso:** S18 Fase 3 - Validar TenantUniversal compatibility con campos extraídos.