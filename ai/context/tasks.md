# 🤖 Tasks - QEntry

## 🧩 Crear nueva funcionalidad

Instrucción:
Crear una funcionalidad nueva siguiendo:

* /ai/context/project.md
* reglas correspondientes

Priorizar:

* simplicidad
* código claro
* MVP

---

## 👤 Gestión de personal

Instrucción:
Implementar funcionalidad para:

* crear persona
* editar datos básicos
* asignar rol (ej: S1, A2, D1)
* cargar foto

Validaciones:

* DNI único
* ID único
* rol obligatorio

---

## 🪪 Generación de credencial

Instrucción:
Generar credencial automáticamente:

* mostrar foto
* nombre completo
* ID
* código de rol
* generar QR único

Formato:

* diseño tipo tarjeta (clean, minimalista)

---

## 📷 Escaneo de QR

Instrucción:
Implementar escaneo desde cámara:

* detectar QR
* extraer personId
* validar existencia

Feedback inmediato:

* ✅ válido
* ❌ inválido

---

## 🔄 Registro de ingreso / egreso

Instrucción:
Implementar lógica:

* si no existe ingreso → registrar check-in
* si ya existe ingreso → registrar check-out

Evitar:

* doble ingreso
* doble egreso

---

## 🕒 Lógica de horarios

Instrucción:
Comparar con horario habitual:

* detectar llegada tarde
* detectar egreso temprano

Estado:

* on_time
* late
* early_exit

---

## 📊 Historial

Instrucción:
Implementar listado de registros:

* por persona
* por fecha

Mostrar:

* hora ingreso
* hora egreso
* duración

---

## 📱 UI Scanner

Instrucción:
Crear pantalla de escaneo:

* cámara en pantalla completa
* marco visual centrado
* feedback visual:

  * verde → correcto
  * rojo → error

Priorizar:

* velocidad
* claridad

---

## 🎨 UI General

Instrucción:
Aplicar diseño:

* estilo Apple minimalista
* cards con bordes redondeados
* spacing amplio
* tipografía clara

Evitar:

* sobrecarga visual
* componentes innecesarios

---

## 🔌 Backend endpoint

Instrucción:
Crear endpoints simples:

### POST /person

* crear persona

### GET /person/:id

* obtener persona

### POST /scan

* registrar ingreso/egreso

Formato respuesta:

```json
{
  "success": true,
  "data": {}
}
```

---

## 🗄️ Base de datos

Instrucción:
Diseñar tablas simples:

### person

* id
* nombre
* apellido
* dni
* roleCode
* photoUrl

### access_log

* id
* personId
* checkIn
* checkOut

Evitar:

* relaciones complejas
* sobreingeniería

---

## 🔐 Roles y permisos

Instrucción:
Definir estructura:

* roleCode (ej: S1, A2)
* nombre descriptivo
* área

Opcional:

* permisos básicos

---

## 🐛 Debug

Instrucción:
Encontrar errores:

* explicar causa
* paso a paso
* solución clara

---

## 🔧 Refactor

Instrucción:
Simplificar código:

* reducir complejidad
* mejorar legibilidad
* mantener funcionalidad

---

## 🚀 Mejora futura (no MVP)

Instrucción:
Agregar luego:

* analytics avanzados
* control por zonas
* QR dinámico
* exportación de reportes

No implementar en MVP.

