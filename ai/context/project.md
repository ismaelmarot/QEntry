# 📄 QEntry

## 🎯 Objetivo

Aplicación web responsive para la gestión de personal y control de ingresos/egresos mediante credenciales con código QR, permitiendo registrar, visualizar y analizar la presencia del personal en tiempo real.

---

## 💡 Propuesta de valor

Sistema simple, rápido y visual para controlar accesos de personal sin necesidad de hardware complejo, utilizando únicamente dispositivos con cámara (celular o PC).

---

## 👤 Usuario objetivo

Organizaciones que necesiten controlar accesos de personas:

* Instituciones públicas
* Empresas privadas
* Seguridad y vigilancia
* Edificios administrativos
* Espacios con control de ingreso

---

## 🧠 Filosofía del proyecto

* Simplicidad > complejidad
* MVP primero
* UX/UI limpio y moderno (estilo Apple)
* Código mantenible
* Flujo rápido y sin fricción

---

## 🧱 Stack

* Frontend: React + TypeScript + Styled Components
* Backend: Node + Express
* Database: SQLite
* Desktop (opcional): Electron

---

## ⚙️ Arquitectura

* Frontend separado del backend
* Backend maneja lógica, base de datos y validaciones
* QR como identificador principal
* Aplicación 100% online (MVP)

---

## 🧩 Modelo conceptual

### 👤 Personal

* Foto
* Apellido y Nombre
* DNI
* ID único
* Código de rol (ej: S1, A2, D1) (derivado del Área)
* Área (vinculada al código)
* Horario habitual

---

### 🧾 Roles (estructura clave)

Cada código define función:

* S1 → Control de acceso
* S2 → Vigilancia fija
* S3 → Vigilancia móvil
* A1 → Administrativo
* D1 → Directivo
* etc.

---

### 🕒 Registros

* Hora de ingreso
* Hora de egreso
* Tiempo total dentro
* Estado (en tiempo, tarde, etc.)

---

## 🔥 MVP (alcance inicial)

### 👤 Gestión de personal

* Alta de persona
* Edición básica
* Carga de foto
* Asignación de rol (ej: S1, A2, etc.)
* Definición de horario habitual

---

### 🪪 Credencial

* Generación automática
* Incluye:

  * Foto
  * Nombre
  * ID
  * Código de rol
  * Código QR

---

### 📷 Control de accesos

* Escaneo de QR
* Registro automático:

  * Ingreso
  * Egreso
* Validación simple:

  * Si no ingresó → registra ingreso
  * Si ya ingresó → registra egreso

---

### 📊 Historial

* Lista de registros
* Filtros básicos:

  * Por persona
  * Por fecha

---

### 📱 UI

* Responsive (mobile-first)
* Diseño minimalista
* Feedback inmediato al escanear

---

## 🤖 Comportamiento del sistema

* Detecta automáticamente ingreso o egreso
* Evita duplicaciones
* Muestra feedback inmediato:

  * ✅ Ingreso registrado
  * 🔴 Ya ingresó
  * ⚠️ Fuera de horario

---

## 🌍 Idiomas

* Español (MVP)
* Inglés (futuro)

---

## ⚖️ Reglas de uso (MVP)

* Acceso con login
* Registro simple de usuarios (admin)
* Cada escaneo genera un registro único
* No se permite doble ingreso sin egreso

---

## 🎨 UX/UI (clave del producto)

* Diseño tipo Apple:

  * Espacios amplios
  * Tipografía limpia
  * Cards con bordes redondeados
* Acción principal siempre visible:
  👉 “Escanear QR”
* Interacciones rápidas (1–2 taps máximo)

---

## 🚫 Evitar (muy importante)

* Sistemas complejos de permisos en MVP
* Integración con hardware externo
* Multiempresa desde el inicio
* Analytics avanzados prematuros
* Sobreingeniería

---

## 🔮 Futuro (NO MVP)

* Dashboard con métricas avanzadas
* Control por zonas (accesos restringidos)
* Roles con permisos dinámicos
* QR dinámicos (anti fraude)
* Exportación de reportes
* Notificaciones automáticas
* Integración con sistemas externos

---

## 💰 Monetización (opcional futuro)

* Plan gratuito limitado (cantidad de personas)
* Suscripción mensual
* Licencias para organizaciones

---

## 🎯 Definición de MVP terminado

El proyecto está terminado cuando:

* Se puede crear personal
* Se genera credencial con QR
* Se puede escanear QR desde la app
* Se registran ingresos y egresos correctamente
* Se puede ver historial básico
* El flujo completo funciona sin errores críticos
* La UI es clara, rápida y usable en móvil

---

## 🚀 Principio clave del proyecto

Si el escaneo de QR no es rápido, claro y confiable → el producto falla.

