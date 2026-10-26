# Vertical Integration Rules

**Estado:** reglas de arquitectura para consumidores; la existencia de este documento no acredita integraciones implementadas.

## 1. Integración con System

- Cada consumidor integra capacidades transversales mediante interfaces y contratos aprobados por System.
- Los contratos deben declarar propósito, owner, versión, autenticación/autorización requerida, datos intercambiados, errores y política de compatibilidad.
- Los consumidores no deben conectarse directamente a bases de datos privadas de System ni replicar su autoridad. Los mecanismos concretos de transporte quedan pendientes de contratos técnicos aprobados.
- El registro de un consumidor identifica la integración; no implica autorización automática ni certificación productiva.
- La integración debe validar contexto de identidad, organización, tenant y workspace conforme a los contratos aplicables.

## 2. Aislamiento entre consumidores

- Legal, Medical y Business son consumidores independientes.
- La dependencia directa de un consumidor sobre código, almacenamiento, API privada o modelo interno de otro consumidor está prohibida.
- Una interacción entre consumidores solo puede ocurrir mediante un contrato explícito gobernado por System, con owner, autorización, datos permitidos y versión identificados.
- Un enlace de navegación o una ruta frontend no constituye por sí mismo una integración de datos o autorización.

## 3. Contratos y cambios

- Los consumidores deben depender de contratos publicados, no de detalles internos de implementación.
- Las decisiones de integración se registran en docs/decisions/; los contratos canónicos se ubican en docs/contracts/ o en el paquete contractual que System publique.
- Los cambios incompatibles requieren versión mayor y plan de migración. Las retiradas requieren aviso, periodo de compatibilidad y fecha de fin de soporte documentados.
- Los detalles de autenticación, tokens, SDK, transporte, SLA y observabilidad permanecen pendientes hasta aprobar sus contratos específicos.

## 4. Verificación

Antes de declarar una integración lista, deben existir evidencia de compatibilidad contractual, pruebas de autorización positiva y negativa, aislamiento de tenant/contexto y trazabilidad de errores. Esta regla no ordena ejecutar pruebas ni desplegar durante una fase documental.
