const express = require('express');
const router = express.Router();
const { getLogs, getTodayStats, getRecentLogs } = require('../services/access.service');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, (req, res) => {
  try {
    const { personId, date } = req.query;
    const logs = getLogs({ personId, date });
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/stats', authMiddleware, (req, res) => {
  try {
    const stats = getTodayStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/recent', authMiddleware, (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const logs = getRecentLogs(limit);
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
