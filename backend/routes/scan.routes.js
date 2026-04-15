const express = require('express');
const router = express.Router();
const { processScan, recordCheckIn, recordCheckOut } = require('../services/access.service');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, (req, res) => {
  try {
    const { personId, type } = req.body;
    if (!personId) {
      return res.status(400).json({ success: false, error: 'personId requerido' });
    }
    
    let result;
    if (type === 'entry') {
      result = recordCheckIn(personId);
      res.json({ success: true, data: { type: 'check-in', message: 'Ingreso registrado', log: result.log, person: result.person } });
    } else if (type === 'exit') {
      result = recordCheckOut(personId);
      res.json({ success: true, data: { type: 'check-out', message: 'Egreso registrado', log: result.log, person: result.person } });
    } else {
      result = processScan(personId);
      let message;
      if (result.action === 'check-in-new') {
        message = 'Nuevo ingreso registrado';
      } else if (result.action === 'check-in') {
        message = 'Ingreso registrado';
      } else {
        message = 'Egreso registrado';
      }
      res.json({ success: true, data: { type: result.action === 'check-out' ? 'check-out' : 'check-in', message, log: result.log, person: result.person } });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
