const express = require('express');
const router = express.Router();
const db = require('../db/db');
const { createPerson, getPerson, getAllPersons, updatePerson, deletePerson } = require('../services/person.service');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, (req, res) => {
  try {
    const { firstName, lastName, dni, type, roleCode, photoUrl, host, company, visitReason, validUntil, workSchedule } = req.body;
    if (!firstName || !lastName || !type) {
      return res.status(400).json({ success: false, error: 'Nombre, apellido y tipo son requeridos' });
    }
    const person = createPerson({ firstName, lastName, dni, type, roleCode, photoUrl, host, company, visitReason, validUntil, workSchedule });
    res.status(201).json({ success: true, data: person });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get('/', authMiddleware, (req, res) => {
  try {
    const { type, roleCode } = req.query;
    const persons = getAllPersons({ type, roleCode });
    res.json({ success: true, data: persons });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/:id', authMiddleware, (req, res) => {
  try {
    const person = getPerson(req.params.id);
    if (!person) {
      return res.status(404).json({ success: false, error: 'Persona no encontrada' });
    }
    res.json({ success: true, data: person });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/:id', authMiddleware, (req, res) => {
  try {
    const person = updatePerson(req.params.id, req.body);
    res.json({ success: true, data: person });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.delete('/:id', authMiddleware, (req, res) => {
  try {
    deletePerson(req.params.id);
    res.json({ success: true, data: { message: 'Persona eliminada' } });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.post('/update-category', authMiddleware, (req, res) => {
  try {
    const { oldType, newType } = req.body;
    if (!oldType || !newType) {
      return res.status(400).json({ success: false, error: 'Parámetros requeridos' });
    }
    const stmt = db.prepare('UPDATE person SET type = ? WHERE type = ?');
    stmt.run(newType, oldType);
    res.json({ success: true, data: { message: 'Categoría actualizada' } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
