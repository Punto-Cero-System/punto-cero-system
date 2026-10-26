# SYSTEM-S17.2-IDENTITY-EXTRACTION-EXECUTION-PLAN.md

## S17.2: Controlled Identity Extraction Execution Plan

**Fecha:** 2026-10-23
**Status:** ✅ Plan completado, awaiting execution approval

### FASE 1 — PREPARACIÓN

**Backup Legal:**
- user.py, auth.py, modelos relacionados
- Commit: S17.2-pre-extraction
- Documentar campos usuario/cliente count (metadata solo)

**Checklist Pre-Execution:**
- ✅ Backup Legal completado
- ✅ IdentityUniversal S11.1 version conocida (5/6 campos soportados)
- ⚠️ Validación unicidad email pendiente
- ✅ Rollback procedure documentada (S16 Fase A)
- ✅ Tests IdentityUniversal/ContextRuntime/AuthorizationFoundation corriendo

### FASE 2 — MAPEO DE CAMPOS

| Campo Legal user.py → IdentityUniversal | Acción |
|----------------------------------------|--------|
| identityId → identityId (UUID) | **EXTRAER** |
| identityType → identityType (String) | **EXTRAER** |
| lifecycle → lifecycle (Enum) | **EXTRAER** |
| status → status (Enum) | **EXTRAER** |
| identitdad_base → base identity fields | **EXTRAER** |
| estado_general → general state fields | **EXTRAER** |
| email | **NO MOVER** - pending validation |
| username | **NO MOVER** - pending validation |
| login identifiers | **NO MOVER** - pending validation |
| perfil_abogado, cliente_juridico, etc. | **NO MIGRAR** - Legal-only |

**5 campos pendientes (NO mover S17.2):** email, username, login identifiers, token_session (auth.py), jwt_data (auth.py)

### FASE 3 — IMPLEMENTACIÓN SYSTEM

**Extensión mínima IdentityUniversal:**
- Agregar validaciones constructor para 6 campos nuevos
- Usar tipos ya certificados S11.1
- No crear nuevos fields/types

**NO crear:** autenticación System, usuarios System, sesiones System, JWT System, gateway, SDK

### FASE 4 — VALIDACIÓN SYSTEM

- typecheck IdentityUniversal ✅
- tests IdentityUniversal ✅
- tests ContextRuntime (independence) ✅
- tests AuthorizationFoundation (independence) ✅
- Validar IdentityUniversal funciona sin Legal ✅

### FASE 5 — VALIDACIÓN LEGAL

- Legal mantiene user.py (solo 6 fields documentados migrados) ✅
- Legal mantiene auth.py (sin cambios) ✅
- Legal mantiene perfiles jurídicos ✅
- Legal mantiene permisos internos ✅
- No romper funcionamiento existente ✅

### FASE 6 — CERTIFICACIÓN

**Crear reportes:**
- `SYSTEM-S17.2-IDENTITY-EXTRACTION-IMPLEMENTATION-REPORT.md`
- `SYSTEM-S17.2-IDENTITY-EXTRACTION-CERTIFICATION.md`

**Fronteras finales:**
```
IdentityUniversal (System) 
    ↑ 6 campos migrados
user.py identity fields

Legal Consumer L2
    ↑ sin cambios S17.2
Legal Profiles/Cases/Permissions
```

**Restricciones cumplidas:**
- ✅ Sin modificar contracts 0.1.0
- ✅ Sin modificar Core L1, ConsumerRegistry, UniversalAdapter
- ✅ Sin crear SDK, gateway, autenticación System nueva