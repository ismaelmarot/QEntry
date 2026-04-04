# ⚙️ Backend Rules - QEntry

## 🎯 Objetivo

Backend simple que:

* gestione personal (empleados, visitantes, contratistas)
* procese ingresos y egresos
* valide escaneo de QR
* maneje lógica de control de accesos

---

## 📁 Estructura

* routes/
* db/
* services/ (lógica de negocio)
* index.js

---

## 🔗 Endpoints

* claros y simples
* REST básicos

Ej:

* /auth
* /person
* /scan
* /logs

---

## 🧠 Lógica

* mantener lógica clara
* separar lógica de negocio en services
* evitar abstracciones innecesarias

---

## 📷 QR & Control

* el QR contiene `personId`
* el backend:

  * valida persona
  * decide ingreso o egreso
  * registra evento
  
el backend debe considerar el tipo de persona:
  * emppleado
  * visitante
  * contractor

NO lógica en frontend

---

## 🔄 Registro de accesos

Regla principal:

* si no hay check-in → crear ingreso
* si hay check-in sin egreso → crear egreso

Evitar:

* doble ingreso
* doble egreso

---

## 📦 Respuestas

Formato SIEMPRE:

```json id="q2l9wm"
{
  "success": true,
  "data": {}
}
```

o

```json id="u7g3lp"
{
  "success": false,
  "error": "mensaje"
}
```

---

## 🔐 Auth

* simple (JWT o sesión básica)
* solo para admins (MVP)
* proteger endpoints críticos

---

## 🧾 Validaciones

* validar existencia de persona
* validar QR válido
* validar estado (dentro / fuera)

---

## 🗄️ Base de datos

* SQLite
* tablas simples:

  * person
  * access_log
  * roles (opcional)

Evitar:

* joins complejos
* relaciones innecesarias

---

## 🧠 Services

Ej:

* person.service.js
* access.service.js
* qr.service.js

Responsabilidad:

* contener lógica
* mantener rutas limpias

---

## ⚡ Performance

* operaciones rápidas
* respuestas inmediatas (clave para QR)

---

## 🚫 Evitar

* arquitectura compleja (DDD, Clean, etc)
* middlewares innecesarios
* lógica en múltiples lugares
* validaciones duplicadas

---

## 🚀 Principio clave

Si el escaneo y registro no es rápido y confiable → el sistema falla.

