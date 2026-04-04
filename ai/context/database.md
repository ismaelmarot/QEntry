# 🗄️ Database Rules - QEntry

## 🎯 Objetivo

Base de datos simple para:

* personas (empleados, visitantes, contratistas)
* registros de acceso (ingreso/egreso)
* roles

---

## 📊 Tablas principales

### person

* id
* first_name
* last_name
* dni (opcional para visitantes)
* type (employee | visitor | contractor)
* role_code (ej: S1, A2, D1, E3)
* photo_url (opcional)

### Datos específicos visitantes

* host (a quién visita)
* company (empresa externa)
* visit_reason
* valid_until (opcional)

### Horario (solo empleados)

* work_entry_time

* work_exit_time

* created_at

---

### access_log

* id
* person_id
* date
* check_in
* check_out
* duration_minutes
* status (on_time, late, early_exit, visitor)

---

### roles (opcional MVP+)

* role_code (PK)
* area (Seguridad, Administración, etc.)
* name (ej: Control de acceso)

---

## 🧱 Reglas

* usar SQLite
* relaciones simples
* no normalizar de más
* priorizar claridad

---

## 🔑 Claves

* primary keys en todas las tablas
* foreign key:

  * access_log.person_id → person.id

---

## ⚡ Lógica de datos

* un registro por día por persona
* check_in y check_out en el mismo registro
* visitantes también generan:

  * ingreso
  * egreso
  * duración

---

## 📅 Fechas y horas

* date → YYYY-MM-DD
* time → HH:mm

---

## ⚠️ Reglas por tipo

### employee / contractor

* usan horario
* tienen validaciones (late, early_exit)

---

### visitor

* NO validar horario
* siempre registrar:

  * ingreso
  * egreso
  * tiempo dentro
* status puede ser:

  * "visitor"

---

## 🚫 Evitar

* joins complejos
* múltiples tablas innecesarias
* normalización excesiva
* optimización prematura

---

## 🚀 Principio clave

Todos los accesos (empleados o visitantes) deben registrarse de forma consistente y simple.

