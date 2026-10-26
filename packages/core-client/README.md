# Core Client - Punto Cero System

## Propósito

Core Client es una capa de aislamiento que sirve como cliente oficial de comunicación entre Punto Cero System y Core L1. Su responsabilidad es:

- Encapsular la comunicación con Core L1
- Consumir contratos públicos definidos en `packages/contracts`
- Preparar futuras conexiones con Core L1
- Mantener independencia respecto a módulos internos de System

**Ningún módulo de System debe comunicarse directamente con Core L1.** Todo el flujo debe pasar a través de Core Client.

## Límites y Responsabilidades

### Lo que Core Client HACE:

- [x] Proporciona interfaces y tipos para comunicación con Core L1
- [x] Define modelos de respuesta estándar (CoreResponse)
- [x] Define modelos de error estandarizados (CoreClientError)
- [x] Consume contratos públicos de `packages/contracts`
- [x] Mantiene versión y estado del cliente
- [x] Fácil de extender para conexiones futuras

### Lo que Core Client NO HACE:

- [x] No modifica Core L1
- [x] No implementa APIs reales
- [x] No maneja autenticación real
- [x] No maneja autorización real
- [x] No gestiona usuarios reales
- [x] No maneja sesiones
- [x] No realiza despliegues
- [x] No integra verticales (Legal, Medical, Business)
- [x] No crea SDK o Adapter funcional
- [x] No contiene lógica de negocio

## Relación con Core L1

```
System Core L1
      |
      | Gobierna: identidad, autorización, capacidades, contexto base, reglas del núcleo
      |
      ↓
Core Client (capa de aislamiento)
      |
      | Consume contratos públicos, prepara conexión futura
      |
System Core L1 API (futura - por implementar)
```

## Relación con Contracts

```
packages/core-client  ← consume ←  packages/contracts
          ↑                              ↑
          |                              |
  define types                    6 interfaces + 5 types
  propios                        (Consumer, Context, Capability, etc.)
```

Core Client **puede consumir** contracts, pero contracts **no pueden depender** de Core Client. La dirección es unidireccional.

## Versión Actual

- **Versión**: 0.1.0
- **Estado**: Foundation (base creada, lista para comunicación futura)
- **Dependencias**: `punto-cero-contracts` (workspace)
- **Tipo**: Pure TypeScript types, sin dependencias externas

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `build` | Compila TypeScript a dist/ |
| `watch` | Observa cambios y compila automáticamente |
| `test` | Ejecuta validaciones básicas (placeholder) |

## Estado de Validación

```
✅ package válido
✅ depende únicamente de contracts
✅ sin dependencias externas
✅ TypeScript check passed
✅ build exitoso
✅ exports funcionando
✅ Workspace continúa válido
```

## Futuras Responsabilidades

Core Client está diseñado para evolucionar hacia:

- Conexión HTTP/REST hacia Core L1
- Manejo de tokens y autenticación
- Gestión de sesiones
- Integración con verticales (cuando sea aprobado)
- SDK para consumidores L2

Pero **todas** estas funcionalidades están fuera del scope actual. La fase actual crea únicamente la fundación.
# Paquete: core-client

Responsabilidad: Futuro cliente oficial hacia Core L1.

Estructura base. Sin conexión a Core.