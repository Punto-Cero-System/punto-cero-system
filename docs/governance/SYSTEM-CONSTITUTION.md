# System Constitution

**Estado:** base documental de arquitectura; no implica implementación de servicios.  
**Ámbito:** Punto Cero System L1 y sus productos/consumidores.

## 1. Definición de System L1

Punto Cero System L1 es la autoridad arquitectónica y la plataforma común del ecosistema. Su responsabilidad es definir, gobernar y ofrecer contratos/capacidades transversales para identidad, autenticación, organización, tenant, workspace, autorización, capabilities, licencias y entitlements, gateway, registro de consumidores, auditoría transversal y notificaciones transversales.

La existencia de una carpeta o un documento no certifica que una capacidad esté implementada, publicada, conectada o lista para producción. Cada capacidad requiere evidencia y un contrato aprobado antes de declararse operativa.

## 2. Qué queda fuera de System

System no es propietario de los modelos, reglas, flujos de trabajo ni datos especializados de las verticales. Legal conserva clientes jurídicos, expedientes, documentos jurídicos, abogados y firmas, procesos legales, agenda jurídica y facturación jurídica. Medical y Business conservan, de igual forma, sus dominios especializados.

One es un producto comercial de System, no una vertical L2. Su producto puede poseer comunidad, feed, perfiles sociales, descubrimiento y experiencia comercial propios; consume las autoridades universales de System y no crea una identidad universal paralela.

Las decisiones de negocio y los procesos de dominio pertenecen al producto propietario, aunque este consuma contratos de System.

## 3. Relación con productos consumidores

Legal, Medical y Business son consumidores L2 independientes de las capacidades de System. Cada consumidor mantiene su código, datos y reglas de dominio, e integra capacidades comunes mediante contratos publicados y versionados.

System puede registrar consumidores, definir mecanismos de integración y hacer cumplir políticas transversales. Eso no le transfiere la propiedad del dominio consumidor.

System AI/Darwin, cuando esté separado como proyecto, deberá integrarse mediante contratos y límites de autoridad explícitos; no se presume que sea parte del Core por compartir el ecosistema.

## 4. Autoridad arquitectónica

System es la fuente de autoridad para los contratos y capacidades transversales que declara como propios. Los propietarios de cada consumidor son autoridad sobre su lógica y datos de dominio.

Todo cambio que afecte un contrato compartido requiere revisión del propietario System y de los consumidores afectados, compatibilidad documentada y registro de la decisión en docs/decisions/. Ningún consumidor puede cambiar unilateralmente la semántica de una capacidad universal.

Esta constitución establece límites, no sustituye contratos API, controles de seguridad, acuerdos operativos ni aprobaciones requeridas para despliegue.
