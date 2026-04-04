# 🧭 Flow - QEntry

## 🎯 Flujo principal: Escaneo

### Caso 1: Ingreso (Empleado / Contratista)

1. Usuario abre pantalla de escaneo
2. Escanea QR
3. Backend recibe `personId`
4. Busca registro del día:

   * ❌ No existe → crear check-in
5. Estado:

   * `inside`
6. Respuesta:

   * ✅ “Ingreso registrado”

---

### Caso 2: Egreso (Empleado / Contratista)

1. Usuario escanea QR
2. Backend detecta:

   * check-in existente
   * check-out = null
3. Acción:

   * crear check-out
   * calcular `duration_minutes`
4. Estado:

   * `completed`
5. Respuesta:

   * ✅ “Egreso registrado”

---

### Caso 3: Visitante (Ingreso)

1. Usuario escanea QR
2. Backend valida:

   * persona existe
   * type = visitor
3. Verifica registro del día:

   * ❌ No existe → crear check-in
4. Estado:

   * `inside`
5. Respuesta:

   * ✅ “Ingreso visitante registrado”

---

### Caso 4: Visitante (Egreso)

1. Usuario escanea QR
2. Backend detecta:

   * check-in existente
   * check-out = null
3. Acción:

   * crear check-out
   * calcular `duration_minutes`
4. Estado:

   * `completed`
5. Respuesta:

   * ✅ “Egreso visitante registrado”

---

### Caso 5: Error

* QR inválido → ❌ “Persona no encontrada”
* Ya egresó → ⚠️ “Registro ya completado”

---

## 👤 Flujo: Alta de persona (Empleado / Contratista)

1. Usuario completa formulario
2. Backend valida:

   * DNI único
3. Se guarda persona
4. Sistema:

   * genera QR
   * genera credencial
5. Estado inicial:

   * `outside`

---

## 🟨 Flujo: Alta rápida de visitante

1. Usuario presiona “Nuevo visitante”
2. Completa datos mínimos:

   * nombre
   * motivo
   * anfitrión (opcional)
3. Backend crea persona con:

   * type = visitor
4. Sistema:

   * genera QR
   * genera credencial temporal
5. Estado inicial:

   * `outside`

---

## 🪪 Flujo: Credencial

1. Usuario accede a persona
2. Sistema muestra:

   * foto (opcional visitante)
   * nombre
   * roleCode
   * QR

---

## 🔄 Estados del sistema

* `outside` → no ingresó
* `inside` → dentro
* `completed` → ingreso + egreso

---

## ⚙️ Reglas por tipo

### Employee / Contractor

* usar horario habitual
* validar:

  * llegada tarde
  * egreso temprano

---

### Visitor

* NO validar horario
* siempre registrar:

  * ingreso
  * egreso
  * tiempo dentro
* puede tener:

  * `valid_until` (opcional)

---

## ⏱️ Cálculo de duración

* al registrar check-out:

  * duration = check_out - check_in
  * guardar en `duration_minutes`

---

## 🚀 Principio clave

El escaneo debe ser inmediato, claro y sin fricción.

