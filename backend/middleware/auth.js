const { verifyToken } = require('../services/auth.service');

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'No autorizado' });
  }

  const token = header.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ success: false, error: 'Token inválido' });
  }

  req.user = decoded;
  next();
}

module.exports = { authMiddleware };
