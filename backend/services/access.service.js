const db = require('../db/db');
const { randomUUID: uuidv4 } = require('crypto');

function getTodayLog(personId) {
  const today = new Date().toISOString().split('T')[0];
  return db.prepare('SELECT * FROM access_log WHERE person_id = ? AND date = ?').get(personId, today);
}

function getStatus(personId) {
  const today = new Date().toISOString().split('T')[0];
  const log = db.prepare('SELECT * FROM access_log WHERE person_id = ? AND date = ? ORDER BY rowid DESC LIMIT 1').get(personId, today);
  if (!log) return 'outside';
  if (log.check_in && !log.check_out) return 'inside';
  if (log.check_in && log.check_out) return 'completed';
  return 'outside';
}

function calculateDuration(checkIn, checkOut) {
  const start = new Date(`1970-01-01T${checkIn}:00`);
  const end = new Date(`1970-01-01T${checkOut}:00`);
  return Math.round((end - start) / 60000);
}

function recordCheckIn(personId) {
  const person = db.prepare('SELECT * FROM person WHERE id = ?').get(personId);
  if (!person) {
    throw new Error('Persona no encontrada');
  }

  const status = getStatus(personId);
  if (status === 'inside') {
    throw new Error('La persona ya se encuentra dentro');
  }

  const id = uuidv4();
  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toTimeString().slice(0, 5);

  let logStatus = 'on_time';
  if (person.type === 'employee' && person.work_entry_time) {
    if (now > person.work_entry_time) {
      logStatus = 'late';
    }
  }
  if (person.type === 'visitor') {
    logStatus = 'visitor';
  }

  db.prepare('INSERT INTO access_log (id, person_id, date, check_in, check_out, duration_minutes, status) VALUES (?, ?, ?, ?, NULL, NULL, ?)').run(id, personId, today, now, logStatus);

  const log = db.prepare('SELECT * FROM access_log WHERE id = ?').get(id);
  return { log, person };
}

function recordCheckOut(personId) {
  const person = db.prepare('SELECT * FROM person WHERE id = ?').get(personId);
  if (!person) {
    throw new Error('Persona no encontrada');
  }

  const status = getStatus(personId);
  if (status !== 'inside') {
    throw new Error('No hay ingreso registrado para egresar');
  }

  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toTimeString().slice(0, 5);
  const log = getTodayLog(personId);

  const duration = calculateDuration(log.check_in, now);

  let logStatus = log.status;
  if (person.type === 'employee' && person.work_exit_time) {
    if (now < person.work_exit_time) {
      logStatus = 'early_exit';
    }
  }

  db.prepare('UPDATE access_log SET check_out = ?, duration_minutes = ?, status = ? WHERE id = ?').run(now, duration, logStatus, log.id);

  const updated = db.prepare('SELECT * FROM access_log WHERE id = ?').get(log.id);
  return { log: updated, person };
}

function processScan(personId) {
  const person = db.prepare('SELECT * FROM person WHERE id = ?').get(personId);
  if (!person) {
    throw new Error('Persona no encontrada');
  }

  const status = getStatus(personId);

  if (status === 'outside') {
    return recordCheckIn(personId);
  }
  if (status === 'inside') {
    return recordCheckOut(personId);
  }
  if (status === 'completed') {
    throw new Error('Registro ya completado para hoy');
  }
}

function getLogs({ personId, date } = {}) {
  let query = `
    SELECT access_log.*, person.first_name, person.last_name, person.type, person.role_code
    FROM access_log
    JOIN person ON access_log.person_id = person.id
    ORDER BY access_log.date DESC, access_log.check_in DESC
  `;
  const params = [];
  const conditions = [];

  if (personId) {
    conditions.push('access_log.person_id = ?');
    params.push(personId);
  }
  if (date) {
    conditions.push('access_log.date = ?');
    params.push(date);
  }

  if (conditions.length > 0) {
    query = query.replace('ORDER BY', `WHERE ${conditions.join(' AND ')} ORDER BY`);
  }

  return db.prepare(query).all(...params);
}

function getTodayStats() {
  const today = new Date().toISOString().split('T')[0];

  const inside = db.prepare("SELECT COUNT(*) as count FROM access_log WHERE date = ? AND check_in IS NOT NULL AND check_out IS NULL").get(today);
  const totalEntries = db.prepare("SELECT COUNT(*) as count FROM access_log WHERE date = ? AND check_in IS NOT NULL").get(today);
  const completed = db.prepare("SELECT COUNT(*) as count FROM access_log WHERE date = ? AND check_out IS NOT NULL").get(today);

  return {
    inside: inside.count,
    todayEntries: totalEntries.count,
    completed: completed.count,
  };
}

function getRecentLogs(limit = 10) {
  const logs = db.prepare(`
    SELECT 
      access_log.id,
      access_log.person_id,
      access_log.date,
      access_log.check_in,
      access_log.check_out,
      access_log.status,
      person.first_name,
      person.last_name
    FROM access_log
    JOIN person ON access_log.person_id = person.id
    ORDER BY access_log.date DESC, access_log.check_in DESC
    LIMIT ?
  `).all(limit);

  return logs.map(log => ({
    id: log.id,
    personId: log.person_id,
    type: log.check_out ? 'exit' : 'entry',
    timestamp: `${log.date}T${log.check_in}:00`,
    person: {
      name: log.first_name,
      lastname: log.last_name,
    },
  }));
}

module.exports = { getStatus, processScan, getLogs, getTodayStats, recordCheckIn, recordCheckOut, getTodayLog, getRecentLogs };
