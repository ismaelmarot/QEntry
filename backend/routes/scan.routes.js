const express = require('express');
const router = express.Router();
const { processScan } = require('../services/access.service');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, (req, res) => {
  try {
    const { personId } = req.body;
    if (!personId) {
      return res.status(400).json({ success: false, error: 'personId requerido' });
    }
    const result = processScan(personId);
    const action = result.log.check_out ? 'check-out' : 'check-in';
    const message = action === 'check-in' ? 'Ingreso registrado' : 'Egreso registrado';
    res.json({ success: true, data: { type: action, message, log: result.log, person: result.person } });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
