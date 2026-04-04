# 📄 PRD - QEntry

## 🎯 1. Visión del producto

Crear una aplicación simple, rápida y confiable para gestionar personal y registrar ingresos/egresos mediante QR, reemplazando sistemas manuales o hardware costoso.

---

## 🚀 2. Problema

Las organizaciones:

* no tienen control claro de quién entra/sale
* usan sistemas manuales o planillas
* dependen de hardware caro (molinetes, tarjetas)

Esto genera:

* errores
* falta de trazabilidad
* pérdida de tiempo

---

## 💡 3. Solución

Aplicación web responsive que:

* registra personal
* genera credenciales con QR
* permite escanear con cámara
* registra ingresos/egresos automáticamente
* muestra historial simple

Todo desde un celular o PC.

---

## 👤 4. Usuario objetivo

### Primario

* Personal de seguridad
* Administradores

### Secundario

* Empresas
* Instituciones públicas
* Oficinas

---

## 🧩 5. Funcionalidades (MVP)

### 👤 Gestión de personal

* Crear persona
* Editar datos
* Asignar rol (S1, A2, etc.)
* Cargar foto

---

### 🪪 Credencial

* Generación automática
* Incluye QR único
* Visual tipo tarjeta

---

### 📷 Control de accesos

* Escaneo QR
* Registro automático:

  * ingreso
  * egreso

---

### 🕒 Lógica

* Detectar si está dentro o fuera
* Evitar duplicados
* Registrar horarios

---

### 📊 Historial

* Lista de registros
* Filtro por persona y fecha

---

## 🔄 6. Flujo principal

### Ingreso

1. Usuario abre scanner
2. Escanea QR
3. Sistema identifica persona
4. Registra ingreso
5. Muestra confirmación

---

### Egreso

1. Escaneo nuevamente
2. Sistema detecta ingreso previo
3. Registra egreso

---

## 🎨 7. UX/UI

* Diseño minimalista (estilo Apple)
* Acción principal visible:
  👉 “Escanear QR”
* Feedback inmediato
* Flujo de 1–2 pasos máximo

---

## ⚙️ 8. Requisitos técnicos

* React + TypeScript
* Node + Express
* SQLite
* Cámara para escaneo QR

---

## 📦 9. Datos principales

### Person

* id
* nombre
* apellido
* dni
* roleCode
* horario

---

### AccessLog

* personId
* checkIn
* checkOut

---

## 📏 10. Reglas de negocio

* no doble ingreso sin egreso
* un registro por día
* QR identifica persona
* escaneo define acción automáticamente

---

## 🚫 11. Fuera de alcance (MVP)

* analytics avanzados
* control por zonas
* permisos complejos
* multiempresa
* integraciones externas

---

## 📊 12. Métricas de éxito

* tiempo de escaneo < 2 segundos
* tasa de error baja
* registros correctos por día
* uso diario del sistema

---

## ⚠️ 13. Riesgos

* escaneo lento → mala experiencia
* errores en lógica de registros
* mala UX en mobile

---

## 🎯 14. Definición de éxito

El producto es exitoso si:

* el escaneo es rápido
* el registro es confiable
* la app se puede usar sin explicación
* reemplaza un sistema manual

---

## 🚀 15. Principio clave

La velocidad y claridad del escaneo definen el éxito del producto.

