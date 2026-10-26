# SYSTEM-CANONICAL-CONTRACT-COMPATIBILITY-AUDIT.md

## 1. Estado actual de contracts 0.1.0

El package `packages/contracts` está en versión `0.1.0` y ha sido congelado como parte de la fase SYSTEM-S2. Contiene un total de **11 entidades** definidas:

### Interfaces Base (6):

| Interfaz | Descripción |
|---|---|
| `Consumer` | Representa un consumidor L2 con `name`, `type`, `version`, `status` |
| `Context` | Contexto universal con `userId`, `organizationId`, `workspace`, `license` |
| `Capability` | Capacidad disponible con `name`, `identification`, `version`, `available` |
| `ContractMetadata` | Metadatos del contrato con `version`, `backwardCompatible`, `status` |
| `Workspace` | Información del workspace con `name`, `id`, `type`, `active` |
| `CoreContractReference` | Referencia a contratos Core L1 con `coreId`, `coreVersion`, `entryPoint`, `relationshipStatus` |

### Tipos Compuestos (5):

| Tipo | Composición |
|---|---|
| `ConsumerContract` | `Consumer & ContractMetadata` |
| `ContextContract` | `Context & ContractMetadata` |
| `CapabilityContract` | `Capability & ContractMetadata` |
| `WorkspaceContract` | `Workspace & ContractMetadata` |
| `CoreContractReferenceType` | `CoreContractReference & ContractMetadata` |

### Exportaciones Centrales:

- `contracts` namespace con acceso organizado a todos los tipos
- `VERSION = '0.1.0'`
- `DEFAULT_STATUS = 'draft'`
- `CONSUMER_TYPES = ['legal', 'medical', 'business', 'partner', 'integrator']`
- `CONTRACT_STATUSES = ['draft', 'approved', 'deprecated', 'superseded']`

### Dependencias:

- Package autónomo, sin dependencias externas
- `workspaces: []` en package.json
- Solo tipos e interfaces, sin lógica de negocio
- Contratos neutros - ninguna vertical (Legal/Medical/Business) domina

## 2. Matriz de compatibilidad contractual

| Contrato Legal | Existe en System | Estado | Acción futura |
|---|---|---|---|
| **Identity** | ⚠️ Parcial | El `Context` interface y `context-engine` cubren aspectos de identidad (userId, organizationId, workspace, license), pero no hay un contrato `Identity` explícito y dedicado | Definir `Identity Contract` como extensión especializada de `Context`, añadiendo campos de identidad institucional |
| **Tenant** | ✅ Completo | El `Workspace` interface cubre completamente la necesidad de tenant/workspace con `name`, `id`, `type`, `active` | Ninguna - capacidad contractual ya existe |
| **Context** | ✅ Completo | `Context` interface + `context-engine` cubren completamente el contexto operativo con `userId`, `organizationId`, `workspace`, `license` y modelos adicionales (`SystemContext`, `ContextIdentity`, etc.) | Ninguna - capacidad contractual ya existe |
| **Authorization** | ❌ Ausente | No existe contrato de autorización. El `context-engine` prohíbe explícitamente permisos y roles verticales. No hay separación entre authorization del sistema y permissions verticales | Definir `Authorization Contract` con separación clara: authorization del system vs vertical permissions. Este contrato debería ser neutro y no vertical-specific |
| **Notification** | ❌ Ausente | No existe contrato transversal de notificaciones. No hay infraestructura definida para notificaciones system-to-consumer | Definir `Notification Contract` como contrato transversal que especifique eventos, destinations y payload structure |

## 3. Riesgos de migración

1. **Identity Contract incomplete**: Si se intenta migrar sin definir el Identity Contract, los consumidores L2 pueden tener modelos de identidad inconsistentes entre verticales. Riesgo: baja - el `Context` cubre casos de uso actuales.

2. **Authorization Contract ausente**: Este es un riesgo **crítico** si se intenta integrar verticales sin un contrato de autorización definido. Sin separación clara entre authorization del system y vertical permissions, habrá acoplamiento accidental a dominios específicos (Legal/Medical/Business). Riesgo: alta - requiere diseño previo antes de cualquier migración.

3. **Notification Contract ausente**: Migraciones que requieran notificaciones sistema-a-consumer fallarán sin un contrato definido. Los payloads de notificación serán inconsistentes. Riesgo: media - puede ser abordado en fase posterior a la migración.

4. **Acoplamiento accidental**: Los tipos `CONSUMER_TYPES` existentes (`legal`, `medical`, `business`) podrían malinterpretarse como permisos de autorización, creando acoplamiento vertical en los contratos. Riesgo: media - requiere documentación y diseño claros.

## 4. Contratos faltantes

Los siguientes contratos identificados en Legal **no existen** en el System actual:

1. **Identity Contract** - Necesario para modelar la identidad institucional del consumidor más allá del contexto operativo. Debe extender `Context` con campos de identidad additional.

2. **Authorization Contract** - Necesario para establecer separación entre:
   - Authorization del System (quién puede acceder)
   - Vertical permissions (qué permisos tiene cada vertical)
   Debe ser un contrato neutro, independiente de Legal/Medical/Business.

3. **Notification Contract** - Necesario para definir:
   - Eventos de notificación
   - Formato de payload
   - Destinatarios y canales
   - Metadatos de seguimiento

## 5. Recomendación arquitectónica

### Conclusión del auditoría:

> "System fue auditado contra los contratos descubiertos históricamente en Legal. Se determinó qué capacidades contractuales ya existen y cuáles requieren una futura evolución antes de iniciar migraciones."

### Hallazgos clave:

1. **3 de 5 contratos están cubiertos** (Tenant, Context - totalmente; Identity - parcialmente)
2. **2 de 5 contratos faltan** (Authorization, Notification - ausentes)
3. **El package contracts 0.1.0 está congelado y funcional** para casos de uso actuales, pero requiere evolución para migraciones futuras.

### Recomendaciones por orden de prioridad:

1. **Alta prioridad**: Diseñar y definir el `Authorization Contract` antes de cualquier integración de verticales. Este contrato debe:
   - Separar claramente `system authorization` de `vertical permissions`
   - Ser neutro respecto a Legal/Medical/Business
   - Definir roles y permisos en nivel de contrato, no en implementación

2. **Media prioridad**: Diseñar el `Identity Contract` como extensión del `Context`, añadiendo campos de identidad institucional que sean reutilizables por todas las verticales.

3. **Media prioridad**: Definir el `Notification Contract` para establcer contrato transversal de eventos y payloads, necesario para comunicaciones system-to-consumer.

4. **Baja prioridad**: Evaluar si los tipos existentes `CONSUMER_TYPES` deben mapearse al `Authorization Contract` o mantenerse como clasificación de consumidor independiente.

### Ruta de evolución:

```
Fase actual (0.1.0 frozen)
    ↓
Definir Authorization Contract (contrato neutro system/vertical)
    ↓
Definir Identity Contract (extensión de Context)
    ↓
Definir Notification Contract (contrato transversal)
    ↓
Actualizar versión 0.2.0 con nuevos contratos
    ↓
Descongelar packages/contracts para evolución controlada
```

### Restricciones cumplidas:

- ✅ Sin modificar código en `packages/contracts`
- ✅ Sin modificar packages/contracts directamente
- ✅ Sin cambiar versión 0.1.0 (sigue congelada)
- ✅ Sin crear nuevos contratos en el package actual (se documentan como futuros)
- ✅ Sin migrar archivos desde Legal
- ✅ Sin conectar consumidores
- ✅ Solamente auditoría y reporte |