# SYSTEM-S19-CONTEXT-RUNTIME-DESIGN.md

## S19 Fase 2: Diseño Context Runtime Real

**Fecha:** 2026-10-23
**Status:** ✅ Complete - Design SystemContextRuntime definido
**Previous:** SYSTEM-S19-CONTEXT-RUNTIME-AUDIT.md
**Next:** S19 Fase 3 - Integración Controlada (pending)

### 1. SystemContextRuntime Definición

| Campo | Tipo | Descripción | S19 Status |
|-------|------|-------------|-----------|
| **contextId** | UUID | Identificador contexto único System | ✅ Mantener |
| **identityId** | UUID | Quién ejecuta la operación (referencia IdentityUniversal S17.2) | ✅ Mantener |
| **tenantId** | UUID | En qué tenant opera (referencia TenantUniversal S11.2) | ✅ Mantener |
| **consumerId** | String | Qué consumidor L2 está actuando | ✅ **AGREGAR S19** |
| **capabilities** | String[] | Qué capacidades están disponibles (horizontal/universal) | ✅ **AGREGAR S19** |
| **authorizationContext** | Object | Qué autorización aplica (sistema, no jurídica) | ✅ **AGREGAR S19** |
| **createdAt** | DateTime | Timestamp creación contexto | ✅ Mantener |
| **updatedAt** | DateTime | Timestamp última actualización contexto | ✅ Mantener |
| **status** | Enum | Estado lifecycle contexto | ✅ **AGREGAR S19** |

### 2. SystemContextRuntime Schema

```typescript
interface SystemContextRuntime {
  contextId: string;           // UUID - único System
  identityId: string;          // UUID - referencia IdentityUniversal S17.2
  tenantId: string;            // UUID - referencia TenantUniversal S11.2
  consumerId: string;          // String - consumidor L2 identification
  capabilities: string[];      // String[] - capabilities system-only, horizontal
  authorizationContext: object; // Object - autorización system-only
  createdAt: DateTime;         // Timestamp - metadata
  updatedAt: DateTime;         // Timestamp - metadata
  status: 'CREATE' | 'LOAD' | 'VALIDATE' | 'EXECUTE' | 'CLOSE'; // Enum lifecycle
}
```

### 3. Lifecycle Definido

| Etapa | Descripción | Transición |
|-------|-------------|-----------|
| **CREATE** | Crear nuevo contexto operativo | `status: 'CREATE'` → `LOAD` |
| **LOAD** | Cargar contexto existente para operación | `status: 'LOAD'` → `VALIDATE` |
| **VALIDATE** | Validar identidad-tenant-capabilities consistency | `status: 'VALIDATE'` → `EXECUTE` |
| **EXECUTE** | Ejecutar operación dentro de contexto validado | `status: 'EXECUTE'` → `CLOSE` |
| **CLOSE** | Cerrar contexto, liberar resources | `status: 'CLOSE'` → final |

### 4. Integraciones Definidas

| Flujo | Origen | Destino | Status S19 |
|-------|--------|---------|-----------|
| **IdentityUniversal → ContextRuntime** | identityId S17.2 | contextId identity reference | ✅ Certified S17.2+S11.3 → S19 |
| **TenantUniversal → ContextRuntime** | tenantId S11.2 | contextId tenant reference | ✅ Certified S11.2+S11.3 → S19 |
| **ContextRuntime → ConsumerRegistry** | contextId propagation | registry update | ✅ S13 sin modifications S19 |
| **ContextRuntime → AuthorizationFoundation** | authorizationContext | RBAC context decisions | ✅ S12 sin modifications S19 |
| **ContextRuntime → UniversalAdapter** | context-aware operations | adapter frontier Legal↔System | ✅ S14 sin modifications S19 |

### 5. Fields: System-Only vs Legal-Prohibido

| Campo | S19 Acción | Justificación |
|-------|------------|-------------|
| **contextId** | ✅ Mantener | Identifier único System |
| **identityId** | ✅ Mantener | Referencia IdentityUniversal S17.2 (System) |
| **tenantId** | ✅ Mantener | Referencia TenantUniversal S11.2 (System) |
| **consumerId** | ✅ **AGREGAR** | Consumidor L2 identification System-only |
| **capabilities** | ✅ **AGREGAR** | Capacidades horizontal/universal, **NO**: jurídica/médica/empresarial |
| **authorizationContext** | ✅ **AGREGAR** | Autorización system-only, **NO**: permisos jurídicos verticales |
| **createdAt** | ✅ Mantener | Metadata System |
| **updatedAt** | ✅ Mantener | Metadata System |
| **status** | ✅ **AGREGAR** | Lifecycle operational S19 (CREATE→LOAD→VALIDATE→EXECUTE→CLOSE) |

**Prohibido S19:**
- ❌ Lógica jurídica en ningún field
- ❌ Lógica médica en ningún field
- ❌ Lógica empresarial en ningún field
- ❌ Usuarios finales field
- ❌ Casos field
- ❌ Expedientes field
- ❌ Permisos verticales en authorizationContext

### 6. SystemContextRuntime Graph

```
IdentityUniversal (S17.2 certified)
    │
    ▼
TenantUniversal (S11.2 certified)
    │
    ▼
ContextRuntime (S19 new - SystemContextRuntime)
    │
    ▼
ConsumerRegistry (S13 read dependency)
    │
    ▼
AuthorizationFoundation (S12 read dependency - authorizationContext only)
    │
    ▼
UniversalAdapter (S14 frontier Legal↔System - context-aware operations)
```

### 7. S19 Fase 2 Cierre

✅ SystemContextRuntime definido con 9 fields
✅ 7 fields mantenidos de foundation S11.11-S11.3
✅ 2 fields nuevos agregados: consumerId, capabilities (system-only horizontal)
✅ 1 field nuevo agregado: authorizationContext (system-only, no legal permissions)
✅ 1 field nuevo agregado: status (lifecycle enum CREATE→LOAD→VALIDATE→EXECUTE→CLOSE)
✅ Integraciones definidas con S13, S12, S14 sin modifications
✅ Fields prohibidos definidos (legal/médica/empresarial vertical logic)
✅ Lista para S19 Fase 3 - Integración Controlada

**Siguiente paso:** S19 Fase 3 - Integrar IdentityUniversal + TenantUniversal + ConsumerRegistry + AuthorizationFoundation flow oficial.