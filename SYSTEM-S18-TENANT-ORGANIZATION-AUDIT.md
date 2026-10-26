# SYSTEM-S18-TENANT-ORGANIZATION-AUDIT.md

## S18 Fase 1: Auditoría de Tenant/Organization Actual

**Fecha:** 2026-10-23
**Status:** ✅ Complete - Auditoría completada

### 1. organization.py en Legal

| Campo | Clasificación | Acción S18 |
|-------|---------------|------------|
| id (UUID) | System candidate | **EXTRAER** - tenantId |
| name (String) | Legal domain | **NO MIGRAR** - nombre firma |
| jurisdiction (String) | Legal domain | **NO MIGRAR** - jurisdicción |
| firm_type (String) | Legal domain | **NO MIGRAR** - tipo firma |
| established_date (Date) | Legal domain | **NO MIGRAR** - fecha fundación |
| lawyer_count (Integer) | Legal domain | **NO MIGRAR** - cuenta abogados |
| client_count (Integer) | Legal domain | **NO MIGRAR** - cuenta clientes |
| case_count (Integer) | Legal domain | **NO MIGRAR** - cuenta casos |
| address (Object) | Legal domain | **NO MIGRAR** - dirección física |
| contact_email (String) | Legal domain | **NO MIGRAR** - email firma |
| status (Enum) | System candidate | **EXTRAER** - tenantStatus |
| created_at (DateTime) | System candidate | **EXTRAER** - metadata |
| updated_at (DateTime) | System candidate | **EXTRAER** - metadata |

### 2. Clasificación Resumida

| Grupo | Campos | Acción |
|-------|--------|--------|
| **EXTRAER a System** | tenantId, tenantType, tenantStatus, organization identity universal, relationship Identity → Tenant | **S18 Fase 2-3** |
| **NO MIGRAR (Legal)** | nombre firma, jurisdiction, firm_type, established_date, lawyer_count, client_count, case_count, address, contact_email, roles internos, permisos jurídicos | **S18 maintain** |

### 3. Hallazgos Clave

- ✅ organization.py es 100% legal domain - sin fields universales puros
- ✅ TenantUniversal S11.2 ya certificado en System - modelo objetivo S18
- ✅ Sin modelo tenant-universal previo en Legal - S18 define boundary ownership
- ✅ identity → tenant mapping necesario - S18 Fase 2 define explícito
- ✅ 13+ campos organization-only permanecerán en Legal

### 4. Riesgos Principales

| Riesgo | Impacto | Mitigación |
|--------|---------|-----------|
| Pérdida estructura organización | Alto | Backup pre-S18; organization.py sin cambios |
| Quebra Identity → Tenant mapping | Alto | Matriz ownership S18 define mapping; tests integración |
| Conflicto tenantId uniqueness | Alto | Validar unicidad global pre-S18 |
| Isolación tenant break | Crítico | TenantUniversal S11.2 certified; tests isolation |
| Legal consumer break | Alto | Legal organization.py sin cambios; validación suite post-S18 |

### 5. Recomendaciones

1. ✅ Backup organization.py Legal completado
2. ✅ Validar TenantUniversal S11.2 coverage (tenantId, tenantType, tenantStatus)
3. ⚠️ Documentar mapping identity → tenant antes implementación
4. ✅ Rollback procedure documentada (pattern S16/Fase A)

**Siguiente paso:** S18 Fase 2 - Matriz Ownership definitivos.