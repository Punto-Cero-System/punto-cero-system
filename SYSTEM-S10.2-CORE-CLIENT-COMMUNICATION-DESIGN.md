# SYSTEM S10.2 — CORE CLIENT COMMUNICATION DESIGN

## Proyecto: Punto Cero System
## Fase: S10.2 — Communication Design
## Modo: Diseño Solo
## Estado: S10.0 y S10.1 completadas

---

## CONTEXTO PREVIOR

### Auditorías completadas

**S10.0 — Auditoría Inicial:**
- ✅ SYSTEM-S10-INITIAL-CORE-CLIENT-AUDIT.md creado
- Estado: packages/core-client como estructura inicial

**S10.1 — Technical Audit:**
- ✅ SYSTEM-S10.1-CORE-CLIENT-TECHNICAL-AUDIT.md creado
- Hallazgos: estructura conceptual, sin comunicación real con Core L1

### Estado actual validado

- packages/core-client: estructura conceptual lista para diseño
- contracts 0.1.0: congelado, sin modificaciones
- No hay dependencias hacia verticales
- Core L1: intacto, propietario del núcleo
- System: consumidor de capacidades oficiales
**Nota:** Esta es una decisión de diseño, NO una implementación. El archivo de implementación se creará en fase posterior.

## 8. RECOMENDACIÓN S10.3

### 8.1 Componentes Mínimos para Implementar S10.3

Basado en el diseño S10.2, los componentes mínimos que deben implementarse en S10.3 son:

1. **`src/client.ts`** - Cliente base con interfaz definida
   - Métodos: `requestCapability()`, `validateRequest()`, `handleResponse()`
   - Tipos TypeScript definidos (sin implementación real)

2. **`src/transport.ts`** - Adaptador interno (S10.3)
   - Implementación in-process
   - Interfaz estandarizada para future HTTP/RPC migration
   - Manejo de timeouts básicos

3. **`src/validators.ts`** - Validación contractual
   - Validadores estáticos basados en contracts 0.1.0
   - Type guards y type checks
   - Errores de validación estandarizados

4. **`src/types.ts`** - Types completos
   - Request/Response types basados en contracts 0.1.0
   - Error types definidos
   - Context types (SystemContext, TenantContext, ConsumerIdentity)

5. **`src/index.ts`** - Punto de entrada exports
   - Exports públicos versionados
   - Types públicos documentados
   - Sin exports internos filtrados

### 8.2 Orden Recomendado de Implementación S10.3

```
Fase S10.3 Semana 1:
  1. Definir types en src/types.ts (basados en contracts 0.1.0 review)
  2. Crear src/validators.ts (validación estática contracts 0.1.0)
  3. Implementar src/client.ts (interfaz, sin lógica de transporte)

Fase S10.3 Semana 2:
  4. Implementar src/transport.ts (adaptador interno in-process)
  5. Crear src/index.ts (exports públicos versionados 0.2.0 o 0.1.0-next)
  6. build y typecheck monorepo validation

Fase S10.3 Semana 3:
  7. Tests unitarios de validación contractual
  8. Tests de integración (mock Core L1)
  9. Documentation inicial (README.md exports públicos)
  10. build limpio, typecheck pass, no warnings
```

### 8.3 Criterios para Aprobar Implementación S10.3

**S10.3 se considera aprobado cuando TODOS estos criterios se cumplen:**

- [ ] **build monorepo exitoso:** `yarn build` o equivalente sin errores
- [ ] **typecheck pass:** `yarn typecheck` o `tsc --noEmit` sin errores
- [ ] **No hay warnings:** Type warnings related a core-client = 0
- [ ] **Validación contracts 0.1.0:** Todos los validadores pasan con contracts 0.1.0 frozen
- [ ] **No modificaciones a contracts 0.1.0:** Git diff shows zero changes a packages/contracts
- [ ] **No hay dependencias hacia verticales:** npm ls o equivalent shows no new deps
- [ ] **No hay lógica de negocio:** Revisión de código confirma ausencia
- [ ] **Documentación inicial:** README.md con uso básico y API pública
- [ ] **Tests básicos:** Mínimo 1 test unitario por validador principal
- [ ] **Cumplimiento arquitectónico:** Review approved que respeta todas las fronteras

### 8.4 Salida de S10.3

**Entregables aprobados S10.3:**

```
1. SYSTEM-S10.3-CORE-CLIENT-IMPLEMENTATION-REPORT.md
2. Pacote npm @punto-cero/core-client version 0.2.0 (o 0.1.0-prerelease)
3. README.md con ejemplos básicos
4. SYSTEM-S10.3-CORE-CLIENT-TEST-REPORT.md
5. build/typecheck reports archivados
6. Actualización de SYSTEM-S10.1-CORE-CLIENT-TECHNICAL-AUDIT.md con estado S10.3
```

### 8.5 Transición a S11

**S11 Identity solo considera después de:**

- [ ] S10.3 implementation report approved
- [ ] build/typecheck pass confirmado
- [ ] contracts 0.1.0 sin modificar durante toda S10
- [ ] Sin dependencias hacia verticales confirmado
- [ ] Revisión arquitectónica formal completada
**Nota:** Esta es una decisión de diseño, NO una implementación. El archivo de implementación se creará en fase posterior.

## 7. LÍMITES ARQUITECTÓNICOS

### 7.1 Permitido (Confirmado)

| Flujo | Descripción |
|-------|-------------|
| System → Core | Sistema completo: System solicita, Core responde |
| System → core-client | System usa core-client como capa oficial |
| core-client → System | core-client responde a System requests |
| core-client validates contracts 0.1.0 | Validación de lectura solo, sin modificaciones |
| core-client transport internal | Adaptador interno monorepo |
| SystemContext, TenantContext, ConsumerIdentity | Contexto conceptual sin verticales |

### 7.2 Prohibido (Confirmado)

| Flujo | Razones |
|-------|---------|
| System → Legal | Rompería arquitectura L2 |
| System → Medical | Rompería arquitectura L2 |
| System → Business | Rompería arquitectura L2 |
| Core → Verticales | Core L1 propietario, no expone a verticales |
| core-client → lógica vertical | Fuera de responsabilidad |
| core-client autenticación real | Fuera de alcance S10 |
| core-client persistencia sesión | Fuera de alcance S10 |

### 7.3 Matriz de Dependencias Final

```
                              ↓
                              core-client
               ↑                ↑                ↑
System ←──────────────│──────────────→ Core L1
               ↓                ↓                ↓
          (consumidor)     (capacidades)    (propietario núcleo)
```

**Fronteras inamovibles:**

- System NO puede comunicarse directamente con Core L1 sin core-client
- core-client NO puede comunicarse con verticales
- contracts 0.1.0 es la única fuente de tipos/contratos válidos
- Core L1 NO recibe requests sin validación por core-client primero
**Nota:** Esta es una decisión de diseño, NO una implementación. El archivo de implementación se creará en fase posterior.

## 6. ERRORES Y OBSERVABILIDAD

### 6.1 Tipos de Error Estándar

**Estructura de error core-client:**

```
Error Structure: {
  code: ErrorCode;           # Código estandarizado
  message: string;           # Mensaje humano readable
  codeContract?: string;     # Código de contract error (si aplica)
  context?: ContextSnapshot; # Contexto al momento del error (sin PII)
  timestamp: Date;           # Cuándo ocurrió
  requestId?: string;        # ID para trazabilidad
}
```

### 6.2 Códigos de Error Definidos

| Código | Categoría | Cuándo se presenta |
|--------|-----------|-------------------|
| `ERR_TRANSPORT_CONNECTION` | Transporte | Fallo de conexión con Core L1 |
| `ERR_TRANSPORT_TIMEOUT` | Transporte | Timeout esperando respuesta Core L1 |
| `ERR_CONTRACT_SCHEMA` | Contract | Request/response no válido contracts 0.1.0 |
| `ERR_CONTRACT_VERSION` | Contract | Versión de contrato incompatibles |
| `ERR_AUTH_CONTEXT` | Seguridad | Contexto no autorizado para capacidad solicitada |
| `ERR_CAPABILITY_NOT_FOUND` | Negocio | Capacidad solicitada no existe en Core L1 |
| `ERR_SYSTEM_INTERNAL` | Interno | Error inesperado en core-client |

### 6.3 Manejo de Errores

**Patrón de manejo:**

```
1. core-client captura error en cualquier fase
2. core-client mapea error a código estandarizado
3. core-client incluye contexto mínimo (sin PII)
4. core-client retorna error a System
5. System decide política de retry, fallback, UI display
6. NUNCA core-client lanza excepción no capturada hacia System
```

### 6.4 Logs y Trazabilidad

**Fields de log obligatorios (siempre, sin PII):**

```
- requestId: string (UUID generado System)
- timestamp: Date (ISO format)
- errorCode: ErrorCode
- phase: 'request' | 'response' | 'validation' | 'transport'
- direction: 'system-to-core' | 'core-to-system'
- success: boolean
- durationMs: number (tiempo total operación)
```

**Nivel de log:**

- `info`: Operaciones completadas exitosamente
- `warn`: Validaciones fallidas, timeouts permitidos
- `error`: Fallos de contrato, errores de transporte
- `debug`: Información detallada para desarrollo (desactivado en producción)

### 6.5 Auditoría

**Datos de auditoría (siempre, anonimizados):**

```
- requestId (nunca user IDs reales)
- timestamp
- capabilityRequested (nombre solo, sin parámetros sensibles)
- success: boolean
- errorCode?: ErrorCode (si falló)
- durationMs: number
- tenantId (conceptual, sin detalles verticales)
```

**Retención:** Política definida por Security Team, mínimo 30 días para debugging.
**Nota:** Esta es una decisión de diseño, NO una implementación. El archivo de implementación se creará en fase posterior.

## 5. SEGURIDAD Y CONTEXTO

### 5.1 Contexto que Viaja System→Core

**SystemContext (solo lectura, sin modificar):**

```
SystemContext: {
  systemId: string;           # Identificador System
  tenantId: string;           # Tenant identificador
  requestId: string;          # ID único para trazabilidad
  timestamp: Date;            # Cuándo se hizo request
  capabilities: string[];     # Capacidades solicitadas (solo oficiales)
}
```

**TenantContext (aislado, sin exposición vertical):**

```
TenantContext: {
  tenant: string;             # Tenant identifier (solo nombre, no modelos)
  permissions: string[];      # Permissions del tenant (solo System-defined)
  metadata: Record<string, unknown>; # Metadata adicional (sistema only)
}
```

**ConsumerIdentity (conceptual, sin autenticación real):**

```
ConsumerIdentity: {
  identity: string;           # Identity conceptual (sin passwords/tokens reales)
  role: 'system' | 'consumer'; # Rol dentro de System
  verified: boolean;          # Conceptual verification (sín auth real)
}
```

### 5.2 Restricciones de Seguridad

**Estrictamente prohibido en core-client:**

1. ✅ **NUNCA** exponer credenciales de autenticación reales
2. ✅ **NUNCA** incluir modelos Legal/Medical/Business en contexto
3. ✅ **NUNCA** almacenar estado de sesión
4. ✅ **NUNCA** validar identidades contra bases de datos reales
5. ✅ **NUNCA** crear tokens de sesión

**Seguridad permitida:**

1. ✅ Transmite SystemContext conceptual
2. ✅ TenantContext sin detalles verticales
3. ✅ ConsumerIdentity conceptual (solo etiquetas)
4. ✅ Auditing de requests (sin PII)
5. ✅ Rate limiting conceptual (sin implementación real)

### 5.3 Flujo de Contexto

```
System
  │
  │ SystemContext + TenantContext + ConsumerIdentity
  ▼
core-client
  │
  │ Valida que contexto es System-defined (no vertical)
  ▼
Core L1
  │
  │ Recibe contexto como parte del request
  │ Procesa dentro de sus reglas
  │ Devuelve respuesta con mismo contexto
  ▼
core-client
  │
  │ Valida response contexto antes de devolver a System
  ▼
System
```
**Nota:** Esta es una decisión de diseño, NO una implementación. El archivo de implementación se creará en fase posterior.

## 4. VALIDACIÓN CONTRACTUAL

### 4.1 Mecanismo de Validación

**Principio fundamental:** contracts 0.1.0 permanece congelado y solo es de lectura.

#### Flujo de Validación Entrante (System → Core)

```
1. System construye request con tipos core-client
2. core-client valida request contra contracts 0.1.0 schema
3. ✅ Validación exitosa → envía a Core L1
4. ❌ Validación fallida → retorna error estandarizado, NO envía a Core
```

#### Flujo de Validación Saliente (Core → System)

```
1. Core L1 envía response
2. core-client valida response contra contracts 0.1.0 schema
3. ✅ Validación exitosa → entrega a System
4. ❌ Validación fallida → error de esquema, logguea, no entrega parcialmente
```

### 4.2 Qué Se Valida

**En requests System→Core:**

- ✅ Campos obligatorios presentes
- ✅ Tipos de datos correctos (coherente con contracts 0.1.0)
- ✅ Rangos de valores válidos
- ✅ Enum values permitidos
- ✅ Estructura anidada coherente

**En responses Core→System:**

- ✅ Estructura esperada presente
- ✅ Campos opcionales coherentes
- ✅ Error codes mapeados correctamente
- ✅ Fechas/licenses dentro de rangos

### 4.3 Herramientas de Validación

**Sin modificar contracts 0.1.0:**

- Usar TypeScript types generados a partir de contracts 0.1.0
- Validación en tiempo de ejecución limitada (no esquema runtime)
- Type guards en core-client
- Tests de validación estática (no tests de integración aún)

```
Ejemplo de validación estática:

type ValidatedRequest = {
  // intersection de request System + contracts 0.1.0 requirements
  // solo campos que contracts 0.1.0 define como obligatorios
  // tipos deben ser assignables a contracts 0.1.0 types
}
```

### 4.4 Errores de Validación Contractual

| Código | Significado | Acción |
|--------|-------------|--------|
| `ERR_CONTRACT_SCHEMA` | Estructura no coincide con contracts 0.1.0 | Rechazar request, loguear |
| `ERR_CONTRACT_VERSION` | Versión de contrato no compatible | Rechazar, sugerir actualización |
| `ERR_CONTRACT_REQUIRED` | Campo obligatorio de contracts missing | Rechazar, mensaje descriptivo |
| `ERR_CONTRACT_TYPE` | Tipo de dato incorrecto | Rechazar, type error details |
## 3. CAPA DE TRANSPORTE

### 3.1 Opciones Analisadas

#### Opción 1: HTTP API

**Ventajas:**
- ✅ Estándar de industria
- ✅ Fácil depuración y logs
- ✅ Humanos-readable
- ✅ Fuera de proceso (no requiere conexión persistente)
- ✅ Fácil testing (mock servers)

**Desventajas:**
- ❌ Overhead de headers y serialización
- ❌ Latencia adicional por conexión HTTP
- ❌ Requiere stack HTTP en Core L1

**Adecuación:** Media - compatible pero con overhead

#### Opción 2: RPC (Remote Procedure Call)

**Ventajas:**
- ✅ Bajo overhead comparado con HTTP
- ✅ Tipado fuerte natural
- ✅ Performance mejor para calls frecuentes
- ✅ Simplicidad conceptual

**Desventajas:**
- ❌ Requiere stack RPC en ambos extremos
- ❌ Menos flexible para evolución de contrato
- ❌ Dependencia de tecnología específica

**Adecuación:** Baja - requiere implementación en Core L1

#### Opción 3: Eventos (Pub/Sub)

**Ventajas:**
- ✅ Desacoplamiento temporal
- ✅ Bueno para flujos asíncronos
- ✅ Auditoría natural (event logs)

**Desventajas:**
- ❌ Complejidad añadida para requests/responses síncronos
- ❌ Ordering guarantees necesarios
- ❌ Estado management complejo

**Adecuación:** Baja - mejor para notificaciones que requests

#### Opción 4: Adaptador Interno (In-process)

**Ventajas:**
- ✅ Zero overhead de comunicación
- ✅ Sin latencia de red
- ✅ Fácil testing
- ✅ Sin dependencias externas

**Desventajas:**
- ❌ Rompería si Core L1 escala a proceso separado
- ❌ Testing de integración más difícil
- ❌ No preparado para evolución a proceso separado

**Adecuación:** Alta - mejor opción actual para monorepo

### 3.2 Recomendación de Transporte

**Opción seleccionada: Adaptador Interno (In-process) con interfaz estandarizada**

**Justificación:**

1. **Arquitectura actual:** Punto Cero System monorepo, Core L1 dentro del mismo proceso de desarrollo
2. **Zero overhead:** Sin costo de serialización/red para phase S10-S11
3. **Testing facilísimo:** Mocks en proceso, tests unitarios rápidos
4. **Preparado para evolución:** Interfaz estandarizada permite migrar a HTTP/RPC later
5. **Cumple reglas:** No introduce nuevas dependencias externas
6. **Compatible contracts 0.1.0:** Formato definido sin dependencia de tecnología de transporte

**Implementación propuesta:**

```
core-client/src/transport.ts (interfaz abstracta)

export interface Transport {
  send(request: Request): Promise<Response>
  close(): Promise<void>
}

// Implementation for S10.3:
// - Internal adapter (S10.3)
// - HTTP adapter (S11+ if needed)
// - RPC adapter (S11+ if needed)
```

**Nota:** Esta es una decisión de diseño, NO una implementación. El archivo de implementación se creará en fase posterior.
## 2. MODELO DE COMUNICACIÓN

### 2.1 Arquitectura de Solicitud

```
System                    core-client                   Core L1
  │                                                       │
  │  request (formato estandarizado)                      │
  │  ──────────────────────────────────────────────▶      │
  │                                                       │
  │                       processing                      │
  │                                                       │
  │                                                                     │
  │  response (formato estandarizado)                    │
  │  ◀─────────────────────────────────────────────      │
  │                                                       │
```

### 2.2 Ciclo de Vida de la Solicitud

#### Fase A: Preparación System

```
1. System identifica capacidad necesaria
2. System construye request usando tipos core-client
3. System valida request contra contracts 0.1.0 (lectura solo)
4. System envía request a core-client
```

#### Fase B: Procesamiento core-client

```
1. core-client recibe request
2. core-client valida esquema contractual
3. core-client mapea tipos System → Core L1 format
4. core-client envía a Core L1 vía transporte seleccionado
5. core-client captura respuesta de Core L1
```

#### Fase C: Respuesta System

```
1. Core L1 procesa y envía response
2. core-client recibe response
3. core-client valida response contra contracts 0.1.0
4. core-client mapea respuesta Core L1 → tipos System
5. System consume response procesada
```

### 2.3 Ciclo de Vida de la Respuesta

```
Core L1 ──▶ core-client ──▶ System
  response                   response
  ◀────────────────────▶      ◀─────────────────────
core-client                System
  request                  request
  ─────────────────────▶ System
```

### 2.4 Estados de la Comunicación

| Estado | Origen | Descripción |
|--------|--------|-------------|
| `PENDING` | System | Solicitud enviada, awaiting Core L1 response |
| `IN_PROGRESS` | core-client | Comunicación en curso con Core L1 |
| `COMPLETED` | Core L1 | Response recibida y validada |
| `FAILED` | Cualquier uno | Error en comunicación, validación o esquema |
| `REJECTED` | core-client | Request inválido (falló validación contractual) |

### 2.5 Tipos de Mensajes

```
1. Request Types:
   - CapabilityRequest          # Solicitud de capacidad oficial
   - ContextRequest             # Solicitud con contexto adjunto
   - ValidationRequest          # Solicitud de validación

2. Response Types:
   - CapabilityResponse         # Response de capacidad oficial
   - ContextResponse            # Response de contexto
   - ValidationResponse         # Response de validación

3. Error Types (ver sección 6)
```
## 1. RESPONSABILIDAD DE CORE-CLIENT

### 1.1 Qué HACE core-client

**Propósito principal:** Capa de comunicación oficial entre System y Core L1.

**Responsabilidades definidas:**

1. **Solicitud de capacidades:** System solicita capacidades oficiales a Core L1 a través de core-client
2. **Validación contractual:** Verifica que mensajes cumplan contracts 0.1.0 antes de pasar a Core
3. **Formato estandarizado:** Proporciona formato consistente para requests y responses
4. **Mapeo de tipos:** Traduce tipos System a formatos compatibles con Core L1 y viceversa
5. **Manejo de errores estandarizado:** Define y comunica errores de comunicación de forma consistente
6. **Contexto seguro:** Transmite SystemContext y TenantContext sin exponer detalles internos

### 1.2 Qué NO HACE core-client

**Exclusiones obligatorias:**

1. **NO contiene lógica de negocio vertical:** Ni Legal, Medical, Business, ni One
2. **NO implementa autenticación real:** Solo transporte de identidad conceptual
3. **NO maneja sesiones de usuario:** Sin persistencia de sesión
4. **NO procesa billing/pagos:** Fuera de alcance
5. **NO contiene modelos verticales:** Estrictamente prohibido
6. **NO reemplaza a Core L1:** Es una capa de consumo, no de reemplazo
7. **NO contiene routing complejo:** Enrutamiento básico System→Core solo

### 1.3 Separación de Responsabilidades

```
Core L1 (Propietario del Núcleo):
- Reglas internas del sistema
- Capacidades base (solo las oficiales)
- Almacenamiento y estado
- Lógica de negocio central

System (Consumidor de Capacidades):
- Orquestación de flujos
- Interfaz con usuarios/consumidores
- Contexto de tenancy
- Solicitud de capacidades a Core L1 a través de core-client

core-client (Capa de Comunicación):
- Traductor System↔Core L1
- Validación contractual
- Formato estandarizado
- Manejo de errores de comunicación
- Contexto seguro (sin exposición vertical)
```