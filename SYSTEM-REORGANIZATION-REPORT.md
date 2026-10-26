# System Reorganization Report

**Fase:** System Reorganization — Phase 2 (auditoría, preparación y extracción controlada)  
**Fecha de auditoría:** 2026-10-20  
**Repositorios examinados:** `C:\Users\darwi\Documents\punto-cero-legal` (lectura estática) y `C:\Users\darwi\punto-cero-system` (estado de preparación)

## 1. Estado actual

- El destino System existe como repositorio Git local inicializado, sin commits y sin archivos versionados en la inspección (`git status --short --branch`: `No commits yet on master`; `git ls-files`: salida vacía). `README.md`, `SYSTEM-ARCHITECTURE-BOUNDARY.md` y `SYSTEM-BOUNDARY.md` ya estaban presentes y se conservaron.
- El repositorio Legal contiene tanto módulos del dominio jurídico como candidatos a capacidades L1 y productos/adaptadores del ecosistema. La evidencia estática consultada incluye `SYSTEM-EXTRACTION-INVENTORY.md` y `SYSTEM-LEGAL-BOUNDARY-REPORT.md`; se verificaron además puntos de wiring en `backend/server.py` y flags/dependencias locales descritos abajo.
- No se acreditó acceso al repositorio remoto oficial `Punto-Cero-System/punto-cero-system-core`. Su contenido, contratos, paquetes, SDK, releases y CI quedan **no verificados**.
- El estado observado permite preparar la frontera e inventariar candidatos. No permite certificar una extracción de código ni la integración en producción.

## 2. Inventario y clasificación

La matriz resume componentes representativos encontrados en Legal. Las rutas son relativas a `punto-cero-legal`. “Acción” es la clasificación de esta fase; no indica que se hayan movido archivos.

| Componente | Ubicación actual | Nuevo propietario | Acción | Dependencias observadas | Riesgo | Estado |
|---|---|---|---|---|---|---|
| Identity universal y mappings | `backend/services/identity_*`; `backend/models/{identity,identity_context,system_identity,user_identity,entity_identity}.py`; `frontend/src/core/identity/` | System L1 | Revisar y adaptar; establecer autoridad canónica antes de migrar | Login y usuario local; modelos y mappings múltiples; consumidores Legal/Medical/One | Identidades paralelas y sin fuente universal acreditada | Pendiente; no listo para migrar |
| Login, usuarios y sesiones universales | `backend/routes/auth.py`, `backend/utils/auth.py`, `backend/models/{user,user_session}.py`, `frontend/src/contexts/AuthContext.jsx` | System L1 | Revisar y convertir en servicio/contrato consumido por verticales | Mongo `db.users`, JWT y `SECRET_KEY`; rutas verticales importan auth local | No demuestra SSO universal; posible acoplamiento a Legal | Pendiente; no listo para migrar |
| Organization | `backend/routes/organizations.py`, rutas de firmas; `backend/services/organization_service.py`; `backend/models/{organization,firm}.py` | System L1 para organización universal; Legal para atributos del despacho | Separar organización común de firma jurídica; adaptar | Mongo, `firm_id` y campos heredados | Confusión entre organización global y entidad Legal | Requiere revisión |
| Tenant | `backend/core/tenant/`, `backend/utils/tenant.py`, `backend/middleware/tenant_isolation.py` | System L1 | Consolidar contrato y aliases antes de migrar | `tenant_id`, `organization_id`, `organizationId`, `firm_id`; headers y middleware | Resoluciones divergentes pueden debilitar aislamiento | Pendiente; duplicado |
| Workspace y acceso | `backend/services/{access_resolver_service,workspace_access_dependency,workspace_resolver}.py`; `backend/models/workspace_*.py`; `backend/routes/access.py` | System L1 | Adaptar e integrar enforcement antes de migrar | `get_current_user`, `server.db`, colección `workspace_access`, roles locales | `ACCESS_RESOLVER_SHADOW_MODE` usa `true` por defecto y deja pasar sin bloquear | Pendiente; riesgo alto de autorización |
| Authorization / RBAC | `backend/models/{authorization,authorization_foundation,rbac}.py`; `backend/middleware/permission_layer.py`; `backend/services/{core_authorization_runtime,authorization_core_service,access_policy}.py` | System L1 para políticas comunes; reglas jurídicas permanecen en Legal | Unificar fuentes de decisión y probar contrato | Roles, PermissionMatrix, workspace access, runtime y rutas Enterprise paralelas | Contratos locales declaran ausencia de enforcement; runtime puede devolver `UNKNOWN` | Pendiente; no productivo acreditado |
| Capabilities | `backend/models/capability_registry.py`; `backend/services/service_capabilities.py` | System L1 | Convertir vocabulario declarativo en contrato/runtime gobernado antes de uso | Registry y authorization runtime locales | El catálogo no acredita decisiones conectadas a usuarios/endpoints | Pendiente; requiere adaptación |
| Licenses / entitlements | `backend/routes/{payment,subscriptions,billing,billing_admin}.py`; `backend/services/{subscription_service,billing_service,payment_provider_service}.py`; modelos de billing/subscription | System L1 para licencias/entitlements; facturación de servicios jurídicos en Legal | Separar entitlement de cobro y facturación; definir autoridad | Mongo, tenant/firma, planes y proveedor de pagos | Superposición entre payment, subscriptions, billing e invoices | Pendiente; duplicado |
| Gateway | `backend/routes/system_gateway.py`; `backend/services/system_bridge_service.py` y bridges relacionados | System L1 | Adaptar a contratos y autorización System | Importa auth/DB local; depende de `SYSTEM_BRIDGE_ENABLED` | Flag predeterminado `false`; el bridge no autoriza ni emite JWT | Pendiente; no certifica integración externa |
| Consumer Registry y adaptadores | `backend/services/core_consumer_adapters/`; `backend/models/consumer_snapshot_contract.py`; `backend/core/registry/` | System L1 | Revisar/adaptar; validar contra Core oficial | Contextos y snapshots locales, adaptadores por producto | No se acreditó registry conectado al Core oficial | Pendiente; registry oficial no verificado |
| Audit transversal | `backend/routes/audit.py`; `backend/services/{audit_service,enterprise_audit_service}.py`; `backend/core/audit/` | System L1 para eventos comunes; auditoría de operaciones jurídicas en Legal | Definir contrato y separar eventos comunes de auditoría jurídica | Mongo, usuarios, firmas, `organization_id`; paquetes locales | Servicios duplicados y paquete Core indicado como ubicación futura | Pendiente; requiere adaptación |
| Notification transversal | `backend/utils/notifier.py`; `backend/core/notifications/`; `backend/core/communication/`; `backend/services/pce/` | System L1 para entrega/canales comunes; Legal para eventos y plantillas jurídicas | Definir interfaz común y mantener semántica de dominio en vertical | Providers, usuario/tenant local y eventos de producto | Implementación repartida; ubicación `core/notifications` no prueba runtime | Pendiente; requiere adaptación |
| One | `backend/one/`, `backend/routes/one.py`, `frontend/src/one/`, `frontend/src/pages/OneEntry.jsx` | System L1 como producto comercial de entrada | Mantener como producto System; adaptar para consumir identidad/login universales | Router usa auth y DB de Legal; perfil escribe `db.users`; UI llama `/api/one/*` | Producto acoplado al runtime Legal; no es identidad propia ni Core runtime | Pendiente; no extraído |
| Clientes jurídicos | `backend/routes/clients.py`; modelos y pantallas de clientes | Legal L2 | Mantener en Legal | Identidad, tenant y workspace locales | Migrar por nombre podría trasladar datos/reglas de dominio | Clasificado Legal |
| Expedientes, casos y procesos | `backend/routes/cases.py`; `backend/models/case.py`; `backend/services/legal_os_*`; Firm OS | Legal L2 | Mantener en Legal; revisar duplicado Enterprise aparte | Auth, tenant/workspace; servidor registra `cases.router` | Rutas/modelos Enterprise paralelos pueden divergir | Clasificado Legal; duplicado a revisar |
| Documentos jurídicos | `backend/routes/documents.py`; modelos/repositorios y portal | Legal L2 para contenido y ciclo jurídico | Mantener en Legal; storage genérico solo si existe contrato System | Casos, usuarios, autorización local | Mezclar storage común con semántica jurídica | Clasificado Legal |
| Abogados, firmas y procesos de despacho | `backend/routes/{firms,firm_config,firm_management,firm_os,team}.py`; modelos y `frontend/src/modules/firm-os/` | Legal L2 para práctica y operación de despacho; Organization/Tenant base en System | Mantener dominio jurídico; desacoplar organización y permisos comunes | `firm_id`, `lawyer_id`, organization y tenant | Entidad despacho mezclada con tenant universal | Clasificado Legal; frontera a adaptar |
| Agenda jurídica y facturación jurídica | `backend/routes/{appointments,meetings,timeline,invoices}.py`; modelos asociados | Legal L2 | Mantener plazos, citas de casos, honorarios y facturas jurídicas | Casos, firma, tenant y auth locales | Confusión posible con calendario/billing genérico | Clasificado Legal |
| Business/comercial, Medical y Darwin/IA en el repo Legal | Rutas, servicios y `frontend/src/verticals/medical/` mencionados en inventario | Business o Medical L2, o System donde contrato transversal lo demuestre | Revisar ownership; no migrar en bloque | Múltiples módulos montados en el servidor Legal; no se inspeccionaron repositorios separados | El nombre o ubicación actual no acredita propietario ni producto | Revisión pendiente; sin cambios a sus repositorios |

## 3. Componentes recuperados de Legal para System

**Código recuperado o copiado: ninguno.** Esta fase autorizó auditoría, estructura y documentación; no extracción física. Los candidatos identificados para futura transferencia controlada son Identity, Authentication/sesiones, Organization/Tenant, Workspace, Authorization/RBAC, Capabilities, License/Entitlements, Gateway, Consumer Registry, Audit transversal y Notification transversal. Todos requieren comparación con el Core oficial y resolución de dependencias antes de cualquier movimiento.

One se clasifica como producto de System y puerta comercial del ecosistema. Su estado observado en Legal es una aplicación acoplada al login/DB local; no se ha trasladado ni se considera propietario de una identidad separada.

## 4. Componentes que permanecen en Legal

Clientes jurídicos; expedientes y casos; documentos vinculados a procesos jurídicos; abogados y operación de firmas; procesos legales; agenda y plazos jurídicos; facturación de servicios jurídicos. La identidad de una persona y la organización/tenant base pueden venir de System mediante contratos, pero las relaciones y reglas jurídicas siguen siendo responsabilidad Legal.

## 5. Dependencias detectadas

- `backend/server.py` registra en el servidor inspeccionado routers de casos (línea 631), clientes (643), documentos (645), organizaciones (649), gateway (650), suscripciones (653) y One (695). Esto prueba wiring en el runtime local; no prueba conexión con el repositorio Core oficial.
- Servicios y rutas de plataforma/One importan `routes.auth` o acceden a `server.db`; los adaptadores locales usan contextos/modelos locales. Esto crea dependencia con el composition root y persistencia de Legal.
- Las convenciones de tenant incluyen `tenant_id`, `organization_id`, `organizationId` y `firm_id`, además de headers distintos.
- `workspace_access_dependency.py` documenta shadow mode y su valor predeterminado es `true` (`ACCESS_RESOLVER_SHADOW_MODE`).
- `system_gateway.py` predetermina `SYSTEM_BRIDGE_ENABLED` en `false`; `enterprise_auth_routes.py` incluye proveedores que lanzan `NotImplementedError` si no están conectados.
- El inventario existente describe RBAC, PermissionMatrix, workspace resolver y capability registry en paralelo; también distingue facturación jurídica (`invoices`) de superficies generales de billing/subscriptions.

## 6. Riesgos registrados

1. Autoridad universal de identidad y sesión no demostrada; hay varios modelos/servicios y el login conectado usa usuarios locales.
2. Interpretaciones paralelas del tenant y del workspace; shadow mode por defecto reduce el enforcement observado.
3. Política de autorización/capabilities dividida y sin runtime System oficial verificado.
4. Licencias, pagos, suscripciones, billing general e invoices jurídicas se solapan en rutas y modelos diferentes.
5. Gateway apagado por defecto y sin autorización/JWT emitidos por el bridge descrito.
6. Consumer Registry, SDK, contratos versionados, tests e integración con Core oficial no acreditados.
7. One y otros candidatos L1 residen dentro del runtime Legal; moverlos sin aislar DB, auth, imports y datos rompería consumidores.
8. Módulos comerciales, Medical, Darwin/IA y Enterprise requieren revisión por ownership y wiring; su ubicación no basta para migrarlos.

## 7. Estado de preparación System y archivos creados

Se comprobó y completó la estructura de preparación solicitada. Las carpetas existentes se conservaron; se añadieron `licenses/` y `tests/` para esta especificación. La carpeta `licensing/` de la fase anterior se conserva sin cambios por compatibilidad con la estructura ya creada; la duplicidad de nombre conceptual queda pendiente de normalizar antes de implementar.

```text
core/ identity/ authentication/ organization/ tenant/ workspace/
authorization/ capabilities/ licenses/ licensing/ gateway/ consumers/
audit/ notifications/ one/ contracts/ docs/ tests/
```

Se creó `SYSTEM-REORGANIZATION-REPORT.md`. Se conservaron sin cambios `README.md`, `SYSTEM-ARCHITECTURE-BOUNDARY.md` y `SYSTEM-BOUNDARY.md`. Las carpetas preparadas están vacías; no se añadió código ni lógica.

## 8. Qué no fue tocado

- No se copiaron, movieron, renombraron ni eliminaron archivos de Legal.
- No se modificó código, configuración, datos, tests ni documentación del repositorio Legal.
- No se modificó Core oficial, Business, Medical ni `punto-cero-system-ai`.
- No se ejecutaron tests, builds, migraciones ni despliegues.

## 9. Pendientes para producción y siguientes pasos

- Obtener acceso de solo lectura al repo oficial `Punto-Cero-System/punto-cero-system-core`; registrar commit y comparar contratos, paquetes, SDK, tipos, releases, pruebas y CI.
- Definir contratos versionados para login/sesión/identity, Organization/Tenant, Workspace, Authorization/Capabilities, License/Entitlement, Gateway, Consumer Registry, Audit y Notification.
- Nombrar fuente de verdad para usuario/identidad, tenant, workspace access y autorización; separar entitlement de pagos y facturación jurídica.
- Inventariar por candidato imports, almacenes, callers, wiring, migraciones de datos y pruebas. Acordar adaptadores de compatibilidad para consumidores Legal/One.
- Diseñar pruebas de contrato e integración, incluyendo rechazo de acceso y aislamiento tenant; ejecutar únicamente cuando la fase de implementación/validación lo autorice.
- Clasificar Business, Medical, módulos comerciales/IA, Enterprise, calendario/storage/comunicación genéricos y duplicados antes de asignar repositorio.
- Resolver si el nombre de carpeta canónico es `licenses/` o `licensing/` antes de depositar implementación.
- Solo tras contratos, pruebas, ownership y plan de reversión aprobados, realizar extracción por componente con historial y validación de consumidores.

## Fuentes consultadas y límites

- Legal: `SYSTEM-EXTRACTION-INVENTORY.md` y `SYSTEM-LEGAL-BOUNDARY-REPORT.md` (auditorías estáticas existentes).
- Legal: `backend/server.py`; `backend/services/workspace_access_dependency.py`; `backend/routes/system_gateway.py`; `backend/services/system_bridge_service.py`; `backend/routes/enterprise_auth_routes.py`; `backend/models/capability_registry.py`; `backend/services/core_authorization_runtime.py`.
- System destino: listado del árbol, `git status --short --branch`, `git ls-files` y los documentos preexistentes indicados.
- No se ejecutaron tests ni análisis dinámico. La existencia de una ruta o clase no se interpreta por sí sola como disponibilidad productiva. El repo oficial remoto no fue inspeccionado; lo relativo a él queda **no verificado**.
