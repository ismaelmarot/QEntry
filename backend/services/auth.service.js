const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { randomUUID: uuidv4 } = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || 'qentry-dev-secret-key';

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function createUser({ email, password, role }) {
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    throw new Error('Email ya registrado');
  }

  const id = uuidv4();
  const hashedPassword = hashPassword(password);

  db.prepare('INSERT INTO users (id, email, password, role) VALUES (?, ?, ?, ?)').run(id, email, hashedPassword, role || 'admin');
  return { id, email, role: role || 'admin' };
}

function login({ email, password }) {
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) {
    throw new Error('Credenciales inválidas');
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
  return { token, user: { id: user.id, email: user.email, role: user.role } };
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

function initializeAdmin() {
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@mail.com');
  if (!existing) {
    createUser({ email: 'admin@mail.com', password: 'admin123', role: 'admin' });
  }
}

module.exports = { createUser, login, verifyToken, hashPassword, initializeAdmin };
