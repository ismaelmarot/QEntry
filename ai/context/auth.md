# 🔐 Auth - QEntry

## 🎯 Objetivo

Controlar acceso a funcionalidades del sistema

---

## 👤 Roles

### Admin

* crear personas
* ver historial
* ver credenciales

---

### Operador

* escanear QR
* registrar ingresos/egresos

---

## 🔑 Implementación

* JWT simple
* login con email + password

---

## 🔒 Protección

* proteger endpoints:

  * /person
  * /logs
* permitir acceso a:

  * /scan (según contexto)

---

## 🚫 Evitar

* roles complejos
* permisos granulares

---

## 🚀 Principio

Mantener autenticación simple y funcional.

