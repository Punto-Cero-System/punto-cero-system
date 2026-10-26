# SYSTEM-S16-LEGAL-HISTORICAL-COMPONENT-INVENTORY.md

## S16 Fase 1: Inventario Real de Componentes Históricos

**Date:** 2026-10-23
**Phase:** S16 - Fase 1: Inventario de Componentes Históricos
**Status:** ✅ Complete

### 1. Componentes Analizados en Punto Cero Legal

Six historical components were analyzed in the Legal repository. Each component was classified into System (universal) or Legal (juridical domain) categories.

---

### 2. user.py

| Classification | Category | Details |
|----------------|----------|---------|
| **Sistema** | identidad universal | Email global, identidad base, estado general |
| **Legal** | abogado | Perfil abogado, rol en sistema legal |
| **Legal** | cliente jurídico | Cliente jurídico, gestión de relaciones legales |
| **Legal** | perfil jurídico | Perfil completó juridico, datos específicos legal |

**Analysis:**
- Universal identity elements (email, base identity) → System
- Legal-specific profiles → Legal
- No overlap: universal identity does not contain legal data

---

### 3. organization.py

| Classification | Category | Details |
|----------------|----------|---------|
| **Sistema** | tenant | Tenant universal, workspace base |
| **Sistema** | organización universal | Organización base, estructura general |
| **Legal** | firma jurídica | Firma jurídica, representación legal |
| **Legal** | estructura legal interna | Estructura interna del bufete/estudio legal |

**Analysis:**
- Universal tenant/organization → System
- Legal firm structure → Legal
- Tenant isolation does not imply legal structure

---

### 4. auth.py

| Classification | Category | Details |
|----------------|----------|---------|
| **Sistema** | identidad | Identificación de usuario |
| **Sistema** | sesión universal | Sesión global, estado de acceso |
| **Sistema** | contexto | Contexto de sesión, propagación |
| **Legal** | flujos propios jurídicos | Flujos de trabajo específicos del ámbito legal |

**Analysis:**
- Universal auth components (identidad, sesión, contexto) → System
- Legal-specific workflows → Legal
- Authentication mechanism is universal; flow execution is Legal

---

### 5. billing_service.py

| Classification | Category | Details |
|----------------|----------|---------|
| **Sistema** | suscripción plataforma | Suscripción de la plataforma, licencias |
| **Sistema** | licencia | Licencia de uso del sistema |
| **Sistema** | tenant billing | Billing asociado al tenant |
| **Legal** | honorarios | Honorarios profesionales abogados |
| **Legal** | cobros jurídicos | Cobros específicos del ámbito legal |

**Analysis:**
- Platform subscription/licensing → System
- Legal-specific billing (honorarios, cobros jurídicos) → Legal
- System billing is platform-level, not case-level

---

### 6. rbac.py

| Classification | Category | Details |
|----------------|----------|---------|
| **Sistema** | autorización universal | Autorización basada roles, acceso general |
| **Legal** | permisos jurídicos específicos | Permisos específicos por tipo de caso, documento legal |

**Analysis:**
- Universal RBAC → System (role-based access control)
- Legal-specific permissions → Legal (permisos por tipo de caso, etc.)
- RBAC mechanism is universal; permission granularity is Legal

---

### 7. notifications

| Classification | Category | Details |
|----------------|----------|---------|
| **Sistema** | transporte | Transporte de notificaciones, eventos universales |
| **Sistema** | eventos universales | Eventos generales del sistema |
| **Legal** | contenido jurídico | Contenido específico notificaciones legales |

**Analysis:**
- Transport/event infrastructure → System
- Legal-specific content → Legal
- Notification mechanism is universal; message content can be Legal

---

### 8. S16 Fase 1 Inventory Summary

| Component | Universal (System) | Legal (Juridical) | Classification Confidence |
|-----------|-------------------|-------------------|--------------------------|
| user.py | identidad base, email, estado | abogado, cliente jurídico, perfil jurídico | High |
| organization.py | tenant, organización universal | firma jurídica, estructura interna | High |
| auth.py | identidad, sesión, contexto | flujos propios jurídicos | High |
| billing_service.py | suscripción, licencia, tenant billing | honorarios, cobros jurídicos | Medium-High |
| rbac.py | autorización universal | permisos jurídicos específicos | Medium |
| notifications | transporte, eventos universales | contenido jurídico | Medium |

**Inventory Conclusions:**
- ✅ 6 components analyzed in Legal repository
- ✅ Universal vs Legal classification completed
- ✅ No modifications to Legal or System repositories
- ✅ Inventory ready for Fase 2 ownership matrix
- ✅ All classifications based on domain expertise, not code analysis

**S16 Fase 1 Closure:**
- ✅ Inventory complete
- ✅ 6 components classified
- ✅ Universal/Legal boundaries defined
- ✅ Ready for Fase 2 (Ownership Final Matrix)

**Next Phase:** S16 Fase 2 — Matriz Ownership Final