# 🔗 API - QEntry

## 🎯 Objetivo

Definir endpoints simples para:

* gestión de personas
* escaneo de accesos
* consulta de registros

---

## 📌 Endpoints

### POST /auth/login

Login de usuario

Body:
{
"email": "[admin@mail.com](mailto:admin@mail.com)",
"password": "123456"
}

---

### POST /person

Crear persona

Body:
{
"firstName": "Juan",
"lastName": "Perez",
"dni": "30111222",
"type": "employee",
"roleCode": "S1"
}

Notas:

* `type`: employee | visitor | contractor

---

### POST /visitor

Alta rápida visitante

Body:
{
"firstName": "Pedro",
"lastName": "Gomez",
"visitReason": "Mantenimiento",
"host": "Juan Perez"
}

---

### GET /person/:id

Obtener persona

---

### GET /persons

Listado de personas

Query params:

* type
* roleCode

---

### POST /scan

Registrar ingreso / egreso

Body:
{
"personId": "uuid"
}

Respuesta:
{
"success": true,
"data": {
"type": "check-in | check-out",
"message": "Ingreso registrado"
}
}

---

### GET /logs

Obtener registros

Query params:

* personId
* date

---

## 📦 Formato de respuesta

{
"success": true,
"data": {}
}

o

{
"success": false,
"error": "mensaje"
}

---

## 🚀 Principio clave

Endpoints simples, rápidos y predecibles.


