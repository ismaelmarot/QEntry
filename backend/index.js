require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeAdmin } = require('./services/auth.service');

const authRoutes = require('./routes/auth.routes');
const personRoutes = require('./routes/person.routes');
const scanRoutes = require('./routes/scan.routes');
const logsRoutes = require('./routes/logs.routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/person', personRoutes);
app.use('/scan', scanRoutes);
app.use('/logs', logsRoutes);

app.get('/health', (req, res) => {
  res.json({ success: true, data: { status: 'ok' } });
});

initializeAdmin();

app.listen(PORT, () => {
  console.log(`QEntry backend running on http://localhost:${PORT}`);
});
