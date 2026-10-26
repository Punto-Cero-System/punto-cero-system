# System Architecture Boundary

## Propósito

Este documento establece la frontera arquitectónica de Punto Cero System (System L1) frente a las verticales de producto, incluida Legal (Legal L2). Esta fase prepara únicamente la estructura del repositorio: no traslada ni implementa componentes.

## System L1: responsabilidad

System es la plataforma compartida que ofrece capacidades comunes para identidad, autenticación, organización, tenant, workspace, autorización, capacidades, licenciamiento, gateway, contratos, auditoría y notificaciones. Define interfaces y servicios transversales consumibles por las verticales. La carpeta `one` representa el producto comercial One dentro del ámbito de System; no constituye una vertical independiente ni cambia la responsabilidad de la plataforma.

## Legal L2: responsabilidad

Legal es una vertical de producto que implementa capacidades del dominio jurídico, sus procesos, experiencia y reglas específicas. Legal conserva la propiedad de su lógica y datos de dominio. Consume las capacidades compartidas de System mediante contratos e interfaces explícitos, sin convertirse en propietaria de esas capacidades.

## One como producto de System

One es el producto comercial de System y se organiza bajo `one`. Puede presentar y empaquetar capacidades de la plataforma para sus usuarios y clientes. Su alcance comercial no absorbe la lógica propia de las verticales ni modifica la frontera de dependencias entre System y estas.

## Consumo por las verticales

Cada vertical consume identidad, autenticación, tenant, workspace, autorización, licenciamiento, gateway y otras capacidades compartidas de System a través de contratos publicados. Las verticales mantienen sus modelos y reglas de dominio. Las integraciones entre System y cada vertical deben ser explícitas y evitar dependencias directas entre verticales.

## Componentes fuera de System

No pertenecen a System las reglas, procesos, modelos, interfaces ni datos que sean propios de un dominio vertical. En particular, la lógica jurídica, expedientes y flujos de Legal pertenecen a Legal L2. También quedan fuera las implementaciones específicas de cualquier otra vertical y sus adaptadores de dominio. System puede definir contratos comunes, pero no debe asumir la lógica especializada de esos dominios.

## Regla de dependencia

- **System → Verticales: permitido** cuando System integra o expone puntos de extensión para productos verticales mediante contratos explícitos.
- **Verticales → System: permitido** para consumir capacidades compartidas mediante esos contratos.
- **Verticales → otras verticales: prohibido.** Una vertical no debe depender directamente de otra. La colaboración entre productos debe pasar por contratos de System o por una integración explícitamente gobernada en System.

Esta regla evita acoplamiento entre dominios y mantiene a System como frontera común de capacidades.

## Alcance de esta fase

La estructura preparada no implica que las carpetas contengan código. No se copia código desde Legal, no se mueven archivos, no se modifica ni elimina contenido de Legal y no se implementa lógica nueva.
