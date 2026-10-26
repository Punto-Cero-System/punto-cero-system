# SYSTEM-S7 — UNIVERSAL CONSUMER ADAPTER FOUNDATION

## S7.1 Diseño del Adapter

### Definición del Universal Adapter

El Universal Adapter será la capa estándar para conectar futuros consumidores L2 con Punto Cero System. Funciona como puente oficial:

```
Punto Cero System
    ↓
Universal Consumer Adapter
    ↓
Consumers L2
```

### 1. Contrato estándar de consumidor

Interfaz base para todos los consumidores:

```typescript
export interface ConsumerAdapter {
  initialize(): Promise<void>;
  getMetadata(): ConsumerMetadata;
  getCapabilities(): Capability[];
  getStatus(): ConsumerStatus;
}
```

### 2. Metadata del consumidor

```typescript
export interface ConsumerMetadata {
  consumerId: string;
  type: string;
  version: string;
  status: ConsumerStatus;
  description?: string;
  [key: string]: any;
}
```

### 3. Capability declaration

```typescript
export type Capability = string;

export interface CapabilitySet {
  [key: string]: boolean;
}
```

### 4. Lifecycle Management

Estados del consumidor (sin conexión real):

```
registered  ←─  validated  ←─  available  ←─  connected
     ↑                                    ↓
   rejected                              active
```

Estados definidos:
- `registered` - Consumer registrado en el registry
- `validated` - Consumer validado (metadata ok, capabilities declaradas)
- `available` - Adapter disponible para conexión
- `connected` - Conexión establecida (futura implementación L2)
- `rejected` - Adapter rechazado (metadata inválida o capabilities faltantes)

### 5. Adapter Status

```typescript
export type ConsumerStatus = 
  | 'registered' 
  | 'validated' 
  | 'available' 
  | 'connected' 
  | 'rejected'
  | 'disconnected';
```

### 6. Boundary Protection (diseño)

Permitido:
```
universal-adapter
    ↓
consumer-registry
    ↓
contracts
```

No permitido:
```
universal-adapter
    ↓ Legal database  ❌
universal-adapter
    ↓ Medical database  ❌
universal-adapter
    ↓ Business logic  ❌
universal-adapter
    ↓ Core internals  ❌
```

### 7. Dependencias diseñadas

```
packages/universal-adapter
      ↓ (depende de)
packages/consumer-registry
      ↓ (depende de)
packages/contracts
```

### 8. Interfaces públicas planeadas

| Interfaz | Descripción |
|----------|-------------|
| ConsumerAdapter | Interface principal de adapter |
| ConsumerMetadata | Metadata del consumidor |
| ConsumerStatus | Estado del consumidor |
| Capability | Tipo de capability |
| CapabilitySet | Set de capabilities declaradas |

### 9. Arquitectura S7.1

```
PUNTO CERO SYSTEM
      |
Universal Consumer Layer
      |
  ---------------------------------
  |                |                |
Universal Adapter   Consumer Registry   Context Engine
  (S7)                 (S6)                   (S5)
      |
  contracts
  (frozen 0.1.0)
```

### 10. Restricciones S7.1

- ❌ No conexión real con Legal/Medical/Business
- ❌ No SDK
- ❌ No Gateway
- ❌ No autenticación
- ❌ No usuarios reales
- ❌ No sesiones
- ❌ No lógica de negocio
- ❌ No acceso a bases de datos externas
- ❌ No integración vertical
- ✅ Definir interfaces estándar
- ✅ Definir lifecycle states
- ✅ Definir capability declarations
- ✅ Maintain boundary protection
- ✅ Dependencies unidireccionales
- ✅ TypeScript types only