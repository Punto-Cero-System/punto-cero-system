# SYSTEM-S18-TENANT-EXTRACTION-DESIGN.md

## S18 Fase 4: Diseño de Extracción Controlada de Tenant/Organization

**Fecha:** 2026-10-23
**Status:** ✅ Complete - Diseño extracción definido, awaiting approval
**Previous:** SYSTEM-S18-TENANT-VALIDATION.md
**Next:** S18 Fase 5 - Implementación Controlada (pending approval)

### 1. Campos Extraíbles S18

| Campo | Origen | Destino | Validación |
|-------|--------|---------|-----------|
| **tenantId** | organization.py Legal | TenantUniversal System | ✅ Mapeo identity → tenant definido S18 Fase 2 |
| **tenantType** | organization.py Legal | TenantUniversal System | ✅ Enum: law_firm, legal_clinic, corporate_legal, individual |
| **tenantStatus** | organization.py Legal | TenantUniversal System | ✅ Enum: active, inactive, suspended, dissolved |
| **created_at** | organization.py Legal | TenantUniversal System | ✅ Metadata timestamp creación |
| **updated_at** | organization.py Legal | TenantUniversal System | ✅ Metadata timestamp actualización |

**Total campos extraíbles:** 5 campos tenant universales

### 2. Campos Prohibidos S18

| Campo | Razón No Migrar | Destino |
|-------|-----------------|---------|
| **name** | Nombre firma jurídica, bufete, estudio - 100% legal domain | Legal - NO migrar |
| **jurisdiction** | Jurisdicción legal aplicación por caso/firma | Legal - NO migrar |
| **firm_type** | Tipo firma: boutique, grande, individual | Legal - NO migrar |
| **established_date** | Fecha fundación organización legal | Legal - NO migrar |
| **lawyer_count** | Número abogados en firma | Legal - NO migrar |
| **client_count** | Número clientes activos firma | Legal - NO migrar |
| **case_count** | Número casos activos firma | Legal - NO migrar |
| **address** | Dirección física firma | Legal - NO migrar |
| **contact_email** | Email contacto firma (diferente a user.email) | Legal - NO migrar |

**Total campos prohibidos:** 9 campos organization jurídica

### 3. Orden Extracción S18

| Paso | Campo | Dependencia | Validación |
|------|-------|-------------|-----------|
| **S18-step1** | tenantId | Ninguna (primera fase tenant) | Validar unicidad global pre-extraction |
| **S18-step2** | tenantType | S18-step1 completado | Validar enum values contra S11.2 certified |
| **S18-step3** | tenantStatus | S18-step2 completado | Validar enum values contra business rules |
| **S18-step4** | created_at | S18-step3 completado | Validar formato DateTime consistente |
| **S18-step5** | updated_at | S18-step4 completado | Validar formato DateTime consistente |
| **S18-step6** | Mapping identity → tenant | Todos fields anterior completados | Validar integridad referencial identityId → tenantId |

**Dependencies Graph:**
```
S18-step1 (tenantId) 
    │
    ▼
S18-step2 (tenantType) 
    │
    ▼
S18-step3 (tenantStatus) 
    │
    ▼
S18-step4 (created_at) 
    │
    ▼
S18-step5 (updated_at) 
    │
    ▼
S18-step6 (identity → tenant mapping) 
```

### 4. Riesgos Extracción S18

| Riesgo | Probabilidad | Impacto | Descripción | Mitigación |
|--------|-------------|---------|-------------|-----------|
| **Pérdida estructura organización Legal** | Media | Alto | Si organization.py se modifica accidentalmente | Backup completo pre-S18; organization.py sin cambios estructurales |
| **Quebra Identity → Tenant mapping** | Media | Alto | Si mapping identityId → tenantId incorrecto | Matriz S18 Fase 2 define explícito; tests integración identidad |
| **Conflicto tenantId uniqueness** | Baja | Alto | Si tenantId existentes entran en conflicto | Validar unicidad global pre-S18; scheme generation definido |
| **Isolación tenant break** | Baja | Crítico | Si multi-tenant isolation System-wide se pierde | TenantUniversal S11.2 certified; tests isolation pre/post-S18 |
| **Legal consumer break** | Media | Alto | Si Legal consumer L2 status afectado | Legal organization.py sin cambios; validación Legal suite post-S18 |
| **Conflcto con IdentityUniversal S17.2** | Baja | Medio | Si fields overlap con identityFields ya migrados | Mapping identityId única por tenant; validación compatibilidad S17.2+S18 |

### 5. Rollback S18

| Componente | Procedure Rollback | Status |
|------------|-------------------|--------|
| **organization.py Legal** | `git checkout S18-pre-extraction -- organization.py` | ✅ Listo |
| **TenantUniversal System** | `git revert S18-tenant-migration` o restore backup | ✅ Listo |
| **Identity → Tenant mapping** | `npm run rollback -- identity-tenant-mapping` | ✅ Listo |
| **Base datos Legal** | Snapshot pre-S18 restauración | ✅ Listo (disponible) |

**Rollback testeado:** ✅ Sí - procedure documentada pattern S16/Fase A, validada pre-S18.

### 5. S18 Fase 4 Cierre

✅ Diseño extracción completado
✅ 5 campos extraíbles definidos (tenantId, tenantType, tenantStatus, created_at, updated_at)
✅ 9 campos prohibidos definidos (name, jurisdiction, firm_type, established_date, lawyer_count, client_count, case_count, address, contact_email)
✅ Orden extracción stepwise definido con dependencies
✅ Riesgos identificados con mitigaciones
✅ Rollback procedure documentado y testeable
✅ Lista para aprobación S18 Fase 5

**Siguiente paso:** S18 Fase 5 - Implementación Controlada. Ejecutar extracción S18 step1-step6 con validación en cada paso. Esperar aprobación oficial antes iniciar.

---