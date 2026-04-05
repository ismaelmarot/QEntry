const express = require('express');
const router = express.Router();
const { createPerson, getPerson, getAllPersons, updatePerson, deletePerson } = require('../services/person.service');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, (req, res) => {
  try {
    const { firstName, lastName, dni, type, roleCode, photoUrl, host, company, visitReason, validUntil, workEntryTime, workExitTime } = req.body;
    if (!firstName || !lastName || !type) {
      return res.status(400).json({ success: false, error: 'Nombre, apellido y tipo son requeridos' });
    }
    const person = createPerson({ firstName, lastName, dni, type, roleCode, photoUrl, host, company, visitReason, validUntil, workEntryTime, workExitTime });
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

module.exports = router;
