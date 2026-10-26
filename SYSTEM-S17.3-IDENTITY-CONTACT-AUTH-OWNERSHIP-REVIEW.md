# SYSTEM-S17.3-IDENTITY-CONTACT-AUTH-OWNERSHIP-REVIEW.md

## S17.3: Identity Contact & Authentication Ownership Resolution

**Fecha:** 2026-10-23
**Status:** ✅ Complete - Analysis and design completed, awaiting approval
**Previous:** SYSTEM-S17.2-IDENTITY-EXTRACTION-CERTIFICATION.md
**Next:** S18 Tenant/Organization Extraction (pending decision)

---

### 1. Análisis email

**Decisión S17.3:** **Opción C - System guarda referencia, Legal conserva valor.**

- **Legal:** `user.py.email` sin cambios, ownership exclusivo Legal
- **System:** `IdentityUniversal.contactEmail` field opcional, String nullable
- **Mapping:** IdentityUniversal.contactEmail → Legal user.py.email (lectura-only)
- **Validación:** Unicidad global cross-domain en login flow, no almacenamiento
- **Veredicto:** ✅ email remains Legal, System referencia sola

---

### 2. Análisis username

**Decisión S17.3:** **Legal owns username; System tiene displayName independiente.**

- **Legal:** `user.py.username` sin cambios, dueño exclusivo
- **System:** `IdentityUniversal.displayName` field opcional, independiente a username Legal
- **Sin mapping directo:** username Legal ≠ displayName System
- **Veredicto:** ✅ Legal ownership username; System displayName independiente

---

### 3. Login Identifiers

**Separación definida:**

| Componente | Owner | Comentario |
|------------|-------|------------|
| **identityId, identityType, lifecycle, status** | System | Extraídos S17.2 |
| **contactEmail** | System referencia, Legal ownership | Sección 1 |
| **username** | Legal ownership | Sección 2 |
| **token_session** | Legal | Flujos S16 diferenciados |
| **jwt_data** | Híbrido (namespaces) | Claims técnicos System + legal Legal |
| **external providers** (Google, Apple, SSO) | Neutral | Integra con ambos sin ownership |

---

### 4. Token Session y JWT

**Decisión S17.3:**

| Campo | Decisión | Justificación |
|-------|----------|---------------|
| **token_session** | **Legal sin cambios** | Flujos sesión S16 differentiados; no crear System |
| **jwt_data** | **Estructura híbrida** | Same token, namespaces separados: técnicos System + legal Legal |

**Implementación jwt_data:**
```json
{
  "sub": "legal_user_id",              // Legal ownership
  "identityId": "uuid-system",         // System reference S17.2
  "identityType": "lawyer",            // System reference S17.2
  "tenantId": "tenant-uuid",           // System reference
  "legal_roles": ["litigante"],        // Legal only
  "permissions": ["ver_expediente"]    // Legal only
}
```

**Veredicto:** ✅ token_session Legal sin cambios; jwt_data estructura híbrida namespaciada

---

### 5. Impacto Arquitectura Actual

| Componente | Impacto S17.3 |
|------------|--------------|
| **IdentityUniversal** | 6 fields consolidados S17.2 + contactEmail referencia + displayName opcional |
| **TenantUniversal** | Sin cambios S17.3 |
| **ContextRuntime** | Sin cambios, independence mantenida |
| **AuthorizationFoundation** | Sin cambios, RBAC universal S12 |
| **ConsumerRegistry** | Sin cambios |
| **UniversalAdapter** | Sin cambios, frontier Legal↔System |

---

### 6. Matriz Ownership Final

| Campo | Dueño Actual | Dueño S17.3 | Acción |
|-------|-------------|-------------|--------|
| identityId | Legal (mixto) | **System** | ✅ S17.2 extracted |
| identityType | Legal (mixto) | **System** | ✅ S17.2 extracted |
| lifecycle | Legal (mixto) | **System** | ✅ S17.2 extracted |
| status | Legal (mixto) | **System** | ✅ S17.2 extracted |
| base identity | Legal (mixto) | **System** | ✅ S17.2 extracted |
| general state | Legal (mixto) | **System** | ✅ S17.2 extracted |
| contactEmail | **Legal** | **Legal (ref System)** | ⚠️ referencia opcional |
| username | **Legal** | **Legal** | ❌ No migrar |
| token_session | **Legal** | **Legal** | ❌ No crear System |
| jwt_data | Legal + técnicos | **Híbrido namespaciado** | ✅ Same token, namespaces |
| displayName | - | **System opcional** | ✅ Nuevo field independiente |

---

### 7. Decisión Final S17.3

**📋 Ownership definitively resolved. No S17.4 contacto.**

**Razón:** Campos pendientes ya tienen ownership definido:
- email: referencia System-Opción C (no migration needed)
- username: Legal ownership (no migration needed)
- token_session: Legal flows S16 already diferenciated
- jwt_data: estructura híbrida namespace-defined (no migration required)

**Siguiente fase:** **S18 Tenant/Organization Extraction** - próximo ciclo controlado.

**Restricciones cumplidas:**
- ✅ Sin modificar contracts 0.1.0
- ✅ Sin modificar Core L1
- ✅ Sin modificar Legal repository
- ✅ Sin crear autenticación System
- ✅ Sin login universal System
- ✅ Sin JWT global System
- ✅ Sin SDK, Gateway nuevos

**S17.3 → S18:** Transición planificada a extracción de Tenant/Organization, no contacto/autenticación.