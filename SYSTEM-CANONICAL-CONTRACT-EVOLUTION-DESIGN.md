# SYSTEM-CANONICAL-CONTRACT-EVOLUTION-DESIGN.md

## Fase de Diseño de Evolución Contractual

*Propósito: Definir la especificación futura de los contratos faltantes identificados en la auditoría SYSTEM-CANONICAL-CONTRACT-COMPATIBILITY-AUDIT.md, permitiendo la separación histórica desde las verticales hacia System sin modificar el contrato congelado 0.1.0.*

---
## 1. IDENTITY CONTRACT EVOLUTION

### Propósito
Establecer un contrato de identidad universal que extienda el `Context` actual con campos de identidad institucional, permitiendo distinguir entre identidad del sistema y identidad vertical específica, sin acoplar los contratos a dominios Legal/Medical/Business.

### Propietario
Team de Arquitectura del Sistema - definición en fase S3-S4, implementación post-congelamiento 0.1.0.

### Modelo Conceptual

```
Identity Contract
├─ Herencia: Extiende Context (consumo readonly)
│  ├─ userId: string (inherited from Context)
│  ├─ organizationId: string (inherited from Context)
│  ├─ workspace: string (inherited from Context)
│  ├─ license: 'open'|'pro'|'enterprise'|'custom' (inherited from Context)
│  ├─ identityId: string - Identificador institucional único del sistema
│  ├─ identityType: 'institutional'|'consumer'|'partner' - Tipo de identidad
│  ├─ legalEntityId: string | null - Identificador Legal (opcional, null = sin definición Legal)
│  ├─ verticalContext: 'legal'|'medical'|'business'|null - Contexto vertical asociado
│  ├─ createdAt: datetime - Cuándo fue creado el registro de identidad
│  └─ updatedAt: datetime - Última actualización
```

### Atributos Mínimos (versión inicial)

| Atributo | Tipo | Descripción | Requerido |
|---|---|---|---|
| `identityId` | string | Identificador único del sistema para el consumidor | ✅ Sí |
| `identityType` | enum | Tipo de identidad (institutional, consumer, partner) | ✅ Sí |
| `legalEntityId` | string \| null | ID Legal asociado (null si no definido) | ✅ Sí |
| `verticalContext` | enum\|null | Contexto vertical o null | ✅ Sí |

### Relación con Usuarios Verticales

| Origen | Campo | Descripción |
|---|---|---|
| **System** | `identityId`, `identityType` | Atributos definidos y controlados por System |
| **Legal** | `legalEntityId` | Opcional - definido por vertical Legal cuando sea necesario |
| **Medical** | Sin campos propios | Identity Contract es neutro - Medical usa `legalEntityId` opcional |
| **Business** | Sin campos propios | Business usa `identityType` para clasificación |

### Qué Pertenece a System
- `identityId` - Generado y gestionado por System
- `identityType` - Clasificación system-level
- Estructura base del contrato (atributos mínimos)

### Qué Permanece en Legal
- `legalEntityId` - Contenido y significado definido por Legal
- Semántica de entidad legal específica
- Mapeo a normativas regulatorias

### Compatibilidad con Core L1
- **Nivel 1**: Identity Contract es neutro - no depende de implementación Core L1
- **Nivel 2**: Core L1 puede consumir Identity Contract para enriquecer identidades de consumidores
- **Regla**: Core L1 puede leer Identity Contract pero no modificar su esquema base

### Relación con Contracts 0.1.0
- **Herencia**: Identity Contract conceptualmente `Identity & ContractMetadata`, pero aún no creado
- **Consumo**: Los tipos existentes `CONSUMER_TYPES` (`legal`, `medical`, `business`) mapean a `identityType`
- **Evolución**: Cuando Identity Contract sea creado, `Consumer` interface ganará un campo `identity: IdentityContractReference`
- **Lectura only**: Contracts 0.1.0 siguen siendo válidos; Identity Contract es adición futura

### Riesgos
1. **Acoplamiento accidental**: Si `legalEntityId` se define con significado específico de Legal, otras verticales lo ignorarán o mal usarán
2. **Versionamiento**: Al agregar Identity Contract, requiere bump a 0.2.0 con reglas de compatibilidad definidas
3. **Fragmentación**: Si cada vertical agrega campos propios, el contrato deja de ser "universal"

### Consumidores Futuros
- L2 Consumers (Legal, Medical, Business) - para clasificación e identificación
- Core Client - para enriquecimiento de identidades
- Consumer Registry - para catálogo de identities registradas

### Dependencias
- `punto-cero-contracts` 0.1.0 (consumo readonly de Context y tipos existentes)
- `context-engine` (modelos de contexto existentes)
- Sin dependencias a verticales específicas

---

## 2. AUTHORIZATION CONTRACT

### Propósito
Definir autorización a nivel System que sepclear de los permisos verticales (Legal/Medical/Business), estableciendo la base para un RBAC (Role-Based Access Control) futuro sin acoplamiento vertical.

### Propietario
Team de Seguridad y Arquitectura - definición en fase S4-S5.

### Modelo Conceptual

```
Authorization Contract
├─ Permisos Globales System
│  ├─ viewContext: - Ver contexto universal
│  ├─ manageConsumers: - Gestionar consumidores registrados
│  ├─ viewCapabilities: - Ver capacidades disponibles
│  ├─ executeNotifications: - Ejecutar notificaciones definidas
│  └─ administrateWorkspaces: - Administrar workspaces
│
├─ Roles Globales (sistema, no vertical)
│  ├─ system:admin - Acceso total a capacidades system
│  ├─ system:operator - Operación normal del sistema
│  ├─ system:viewer - Visualización solo lectora
│  └─ system:unauth - Sin autorización explícita
│
├─ Relación con Permisos Verticales
│  ├─ Legal: permissions mapeadas desde Authorization Contract
│  ├─ Medical: permissions mapeadas desde Authorization Contract
│  └─ Business: permissions mapeadas desde Authorization Contract
│
└─ Permisos Verticales (definidos por cada vertical)
   └─ No forman parte del contrato Authorization - son definiciones adicionales
```

### Autorización Universal System

| Rol System | Descripción | Campos |
|---|---|---|
| `system:admin` | Acceso total a todas las capacidades system | Sin campos adicionales |
| `system:operator` | Operaciones normales del día a día | Sin campos adicionales |
| `system:viewer` | Visualización y consulta de información | Sin campos adicionales |
| `system:unauth` | Sin autorización - acceso denegado por defecto | Sin campos adicionales |

### Roles Globales (Definición System)

| Rol | Descripción | Relación con Verticales |
|---|---|---|
| `system:admin` | Administrador del sistema | Puede asignar permisos verticales a consumidores |
| `system:operator` | Operador del sistema | Ejecuta operaciones permitidas por permisos |
| `system:viewer` | Observador del sistema | Solo lectura de información publicada |
| `system:unauth` | No autorizado | Denegado automáticamente |

### Relación con Permisos Legal

| Concepto | Authorization Contract | Legal Permissions |
|---|---|---|
| **Mapping** | System defines base roles | Legal defines vertical-specific permissions |
| **Separation** | Roles system son neutros | Legal permissions son domain-specific |
| **Consumo** | Consumidores L2 consultan ambos | Las verticales mapean sus permisos a roles system |
| **Ejemplo** | `system:viewer` → Legal permite "ver documentos legales" | Legal define "ver documentos legales" como permiso propio |

### Relación con Permisos Medical

Igual que Legal: Medical mapeará sus permisos internos a roles `system:operator` o `system:viewer` según sea necesario.

### Relación con Permisos Business

Business seguirá el mismo patrón: los permisos business se mapearán desde Authorization Contract roles.

### Separación Futura de RBAC

El contrato está diseñado para evolucionar hacia RBAC sin cambios drásticos:

```
Fase 0.2.0 (actual design):
  Authorization Contract roles system
    ↓
Fase 1.0.0 (RBAC implementation):
  Authorization Contract + Vertical Permission Mapping
    ↓
Fase 2.0.0 (Full RBAC):
  System RBAC + Vertical RBAC layers
```

### Compatibilidad con Core L1
- **Nivel 1**: Authorization Contract es definitorio - Core L1 establece políticas base
- **Nivel 2**: Core L1 consume Authorization Contract para validar accesos
- **Regla**: Core L1 define políticas system-level; verticales definen permisos adicionales sobre esa base

### Relación con Contracts 0.1.0
- **Actual**: No existe contrato de autorización; la autorización se gestiona vía `CONSUMER_TYPES` y contexto
- **Evolución**: Cuando Authorization Contract sea creado, los tipos `CONSUMER_TYPES` tendrán una relación Many-to-Many con roles del contrato
- **Transición**: Los consumidores existentes mapean `type: legal|medical|business` a roles `system:viewer` por defecto
- **Sin ruptura**: Contracts 0.1.0 siguen siendo válidos; Authorization Contract es adición que enriquece capacidades

### Riesgos
1. **Confusión con vertical permissions**: Si no hay separación clara, roles system pueden mezclarse con permisos verticales
2. **Subestimar necesidades verticales**: Definir roles muy generales que no cubran casos de uso verticales específicos
3. **Complejidad de mapeo**: Cada vertical necesita mapear sus permisos internos a roles system definidos

### Consumidores Futuros
- L2 Consumers - para autorización basada en roles
- Core Client - para validación de tokens y sesiones
- Admin System - para gestión de roles y permisos
- Vertical Gateways - para mapeo de permisos internos

### Dependencias
- `punto-cero-contracts` 0.1.0 (consumo readonly para tipos y estatus existentes)
- `context-engine` (para contexto de decisiones de autorización)
- Sin dependencias a proveedores de identidad externos (fase inicial)

---
---
---

## 3. NOTIFICATION CONTRACT

### Propósito
Definir contrato transversal para notificaciones system-to-consumer, estableciendo eventos universales, canales de entrega y formatos de payload que puedan ser consumidos por cualquier vertical sin acoplamiento a dominios específicos.

### Propietario
Team de Mensajería y Comunicación - definición en fase S5-S6.

### Modelo Conceptual

```
Notification Contract
├─ Eventos Universales
│  ├─ consumer:registrado - Nuevo consumidor registrado
│  ├─ consumer:actualizado - Consumidor actualizado
│  ├─ capability:disponible - Nueva capacidad disponible
│  ├─ workspace:creado - Nuevo workspace creado
│  ├─ workspace:actualizado - Workspace actualizado
│  └─ autorizacion:cambiado - Cambio de autorización/permisos
│
├─ Canales de Entrega
│  ├─ webhook - URL configurable por consumidor
│  ├─ email - Correo electrónico estructurado
│  ├─ system-message - Mensaje interno del sistema
│  └─ dashboard - Actualización en panel de control
│
├─ Estados de Entrega
│  ├─ pending - Encolado, no enviado
│  ├─ sent - Enviado exitosamente
│  ├─ delivered - Entregado al destinatario
│  ├─ failed - Fallo en entrega
│  └─ expired - Evento expirado (TTL cumplido)
│
└─ Plantillas y Contenido
   ├─ estructura base (headers, metadata)
   ├─ payload estándar (evento, timestamp, contexto)
   └─ contenido específico por tipo de evento
```

### Eventos Universales Definidos

| Evento | Descripción | Consumidores | Frecuencia |
|---|---|---|---|
| `consumer:registered` | Nuevo consumidor registrado en System | Todos los consumidores L2 | Al registro |
| `consumer:updated` | Datos del consumidor actualizados | Consumidor afectado + Admin | Cuando cambian datos |
| `capability:available` | Nueva capacidad disponible en System | Consumidores interesados | Cuando se declara nueva capability |
| `workspace:created` | Nuevo workspace provisionado | Consumidores del workspace | Al crear workspace |
| `workspace:updated` | Workspace actualizado | Consumidores del workspace | Cuando cambian propiedades |
| `authorization:changed` | Cambio en autorización/permisos | Consumidor afectado + Admin | Cuando cambian permisos |

### Canales de Entrega

| Canal | Descripción | Caso de Uso | Verticales Soportadas |
|---|---|---|---|
| `webhook` | HTTP POST a URL configurada | Integraciones externas, sistemas legacy | Legal, Medical, Business |
| `email` | Correo con template estructurado | Notificaciones formales, reportes | Todas |
| `system-message` | Mensaje en la UI del sistema | Alertas, informaciones al usuario | Todas |
| `dashboard` | Actualización en panel administrativo | Visibilidad operativa | Todas |

### Estados de Entrega

| Estado | Significado | Acción |
|---|---|---|
| `pending` | Evento encolado, pendiente de envío | Reintentar después de timeout |
| `sent` | Envío completado al canal | Registrar en logs |
| `delivered` | Destinatario recibió el mensaje | Confirmar con canal |
| `failed` | Fallo en el envío | Reintentar o marcar para revisión manual |
| `expired` | TTL del evento cumplido | Eliminar de cola, no reenviar |

### Plantillas y Contenido

| Componente | Descripción | Ejemplo |
|---|---|---|
| **Estructura Base** | Siempre presente en todos los notifications | `{ eventType, timestamp, version, correlationId }` |
| **Payload Estándar** | Datos del evento | `{ consumerId, workspaceId, triggerContext }` |
| **Contenido por Evento** | Datos específicos del tipo | Varía según `consumer:registered`, `capability:available`, etc. |

### Contenido Específico por Vertical

| Vertical | Eventos Adicionales | Formato de Contenido |
|---|---|---|
| **Legal** | `document:expired`, `deadline:approaching` | Referencias legales, fechas procesales |
| **Medical** | `patient:status:changed`, `certification:expiring` | Datos de paciente (anonymized), fechas de certificación |
| **Business** | `order:updated`, `capacity:changed` | Datos de negocio, métricas, KPIs |

### Compatibilidad con Core L1
- **Nivel 1**: Core L1 define eventos system-level que pueden trigger notifications
- **Nivel 2**: Core L1 consume metadata de notifications para auditoría y tracking
- **Regla**: Core L1 puede publicar eventos que consuman el contrato, pero no define el formato de payload (definido por Notification Contract)

### Relación con Contracts 0.1.0
- **Eventos mapeables**: Los tipos existentes (`Consumer`, `Context`, `Capability`, `Workspace`) son la base de los eventos
- `consumer:registered` usa `Consumer` interface
- `capability:available` usa `Capability` interface  
- `workspace:created/updated` usa `Workspace` interface
- `authorization:changed` es nuevo - no tiene mapping directo en 0.1.0
- **Sin ruptura**: Contracts 0.1.0 son la base estructural; Notification Contract agrega comportamiento comunicacional

### Riesgos
1. **Acoplamiento a formatos**: Si los payloads son muy específicos, otras verticales no los pueden consumir
2. **Crecimiento incontrolado de eventos**: Agregar muchos eventos específicos dificulta el mantenimiento
3. **Gestión de estados**: Seguimiento de estados de entrega en sistemas distribuidos puede ser complejo

### Consumidores Futuros
- L2 Consumers (Legal, Medical, Business) - para recibir notificaciones relevantes
- Core Client - para envío y tracking de notifications
- Admin Console - para configuración de canales y plantillas
- External Systems - a través de webhooks

### Dependencias
- `punto-cero-contracts` 0.1.0 (consumo readonly de interfaces base)
- Sin dependencias a proveedores de mensajería específicos (fase diseño)
- Definición de templates será fase posterior a aprobación del contrato

---
---

"El diseño de evolución contractual fue completado.

No se modificaron contratos congelados.
No se creó implementación.
No se realizó migración.

System ahora tiene definida la ruta futura para completar los contratos necesarios antes de absorber responsabilidades históricas desde las verticales."