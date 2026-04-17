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
    let status = 'outside';
    if (type === 'entry') {
      result = recordCheckIn(personId);
      status = 'inside';
      res.json({ success: true, data: { type: 'check-in', message: 'Ingreso registrado', log: result.log, person: result.person, status } });
    } else if (type === 'exit') {
      result = recordCheckOut(personId);
      status = 'outside';
      res.json({ success: true, data: { type: 'check-out', message: 'Egreso registrado', log: result.log, person: result.person, status } });
    } else {
      console.log('processScan called without type, autoRegister=false');
      const statusResult = processScan(personId, false);
      console.log('statusResult:', statusResult);
      if (statusResult && statusResult.status) {
        return res.json({ success: true, data: { type: null, message: null, person: statusResult.person, status: statusResult.status } });
      }
      result = processScan(personId, true);
      console.log('processScan result:', result);
      let message;
      let status = 'outside';
      if (result.action === 'check-in-new') {
        message = 'Nuevo ingreso registrado';
      } else if (result.action === 'check-in') {
        message = 'Ingreso registrado';
        status = 'inside';
      } else if (result.action === 'check-out') {
        message = 'Egreso registrado';
        status = 'outside';
      } else {
        message = 'Registro exitoso';
      }
      res.json({ success: true, data: { type: result.action === 'check-out' ? 'check-out' : 'check-in', message, log: result.log, person: result.person, status } });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
