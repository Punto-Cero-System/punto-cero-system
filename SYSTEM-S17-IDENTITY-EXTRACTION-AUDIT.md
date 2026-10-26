# SYSTEM-S17-IDENTITY-EXTRACTION-AUDIT.md

## S17 Fase 1: Auditoría de Extracción de Identidad de Legal a System

**Fecha:** 2026-10-23
**Status:** ✅ Complete - Auditoría completada, lista para revisión aprobar S17.1

### 1. Estado Actual de Identidad en Legal

| Componente | Campos Universal | Campos Legal | Observación |
|------------|-----------------|--------------|-------------|
| **user.py** | email, identidad_base, estado_general | perfil_abogado, cliente_juridico, perfil_juridico | ⚠️ Mezclado - requiere separación |
| **auth.py** | identidad, sesión, contexto | flujos_propios_jurídicos | ⚠️ Mezclado - separación S16 pendiente |
| **IdentityUniversal** | identityId, identityType, lifecycle, status | - | Certificado S11.1 |

### 2. Clasificación de Campos

#### Pertenecen a System (Universales)
- identityId (UUID) - IdentityUniversal S11.1
- identityType (String) - tipos: lawyer, client, admin
- lifecycle (Enum) - stages: active, inactive, suspended, completed
- status (Enum) - pending, active, completed, cancelled
- universal_context (Object) - contextId, propagation

#### Pertenecen a Legal (Jurídicos)
- lawyer_profile - número_colegiado, especialidad, firma_asociada
- client_profile - tipo_cliente, rubro, jurisdicción
- legal_roles - litigante, demandante, acusado, testigo
- legal_permissions - ver_expediente, firmar_documento, acceder_confidencial
- jurisdiction - jurisdicción legal aplicable
- case_type - civil, penal, laboral, comercial

### 3. Dependencias Afectadas

| Dependencia | Impacto | Mitigación |
|-------------|---------|-----------|
| user.py → auth.py | autenticación usa campos user.py | Separar campos universal antes cortar |
| user.py → billing_service | billing usa email/identidad_base | Validar billing_service migrado después FASE D |
| auth.py → ContextRuntime | contexto incluye identidad | ContextRuntime certificado S11.3 |

### 4. Riesgos Principales

| Riesgo | Prob. | Impacto | Estrategia |
|--------|-------|---------|-----------|
| Romper autenticación Legal | Alta | Crítico | Mantener auth.py Legal paralelo durante S17.1 |
| Pérdida datos lawyer/profile | Media | Alto | Extraer SOLO campos declarados universal |
| Conflicto email uniqueness | Media | Alto | Validar unicidad pre-extraction, backup Legal |

### 5. Estrategia de Extracción S17.1

**Extraer SOLO de user.py:**
- identityId → IdentityUniversal
- identityType → IdentityUniversal  
- lifecycle → IdentityUniversal
- status → IdentityUniversal
- email → IdentityUniversal (validar unicidad)

**Mantener en Legal:**
- lawyer_profile, client_profile, perfil_juridico
- flujos_propios_jurídicos en auth.py

**Flujo S17.1:**
1. Backup completo Legal (user.py, auth.py)
2. Extraer 5 campos universal de user.py
3. Validar IdentityUniversal S11.1 compatible
4. Validar email uniqueness global
5. Migrar campos a IdentityUniversal (System)
6. Verificar auth.py Legal funcional
7. Rollback si falla cualquier validación

### 6. Recomendación S17.1

**APROBAR** extracción de 5 campos universales de identidad.

**Por qué:**
- ✅ S16 certificado con riesgos mitigados
- ✅ IdentityUniversal S11.1 ya certificado
- ✅ Campos claramente delimitables (universal vs legal)
- ✅ Extracción stepwise con validaciones
- ✅ Rollback definido y listo
- ✅ Legal independiente después de S17.1
- ✅ System universal fortalecido

**Condiciones previas:**
1. Backup completo Legal antes S17.1
2. Validar IdentityUniversal S11.1 coverage
3. Validar email uniqueness global
4. Rollback procedure lista

**Siguiente:** Solicitar aprobación para ejecutar S17.1
**Componente:** Identity extraction - 5 campos de user.py a IdentityUniversal
**Rollback listo:** Sí