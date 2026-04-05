const db = require('../db/db');
const { randomUUID: uuidv4 } = require('crypto');

function createPerson({ firstName, lastName, dni, type, roleCode, photoUrl, host, company, visitReason, validUntil, workEntryTime, workExitTime }) {
  const existing = db.prepare('SELECT id FROM person WHERE dni = ?').get(dni);
  if (existing) {
    throw new Error('DNI ya registrado');
  }

  const id = uuidv4();
  const createdAt = new Date().toISOString();

  db.prepare(`
    INSERT INTO person (id, first_name, last_name, dni, type, role_code, photo_url, host, company, visit_reason, valid_until, work_entry_time, work_exit_time, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, firstName, lastName, dni || null, type, roleCode || null, photoUrl || null, host || null, company || null, visitReason || null, validUntil || null, workEntryTime || null, workExitTime || null, createdAt);

  return getPerson(id);
}

function getPerson(id) {
  return db.prepare('SELECT * FROM person WHERE id = ?').get(id);
}

function getPersonByDni(dni) {
  return db.prepare('SELECT * FROM person WHERE dni = ?').get(dni);
}

function getAllPersons({ type, roleCode } = {}) {
  let query = 'SELECT * FROM person ORDER BY created_at DESC';
  const params = [];

  const conditions = [];
  if (type) {
    conditions.push('type = ?');
    params.push(type);
  }
  if (roleCode) {
    conditions.push('role_code = ?');
    params.push(roleCode);
  }

  if (conditions.length > 0) {
    query = query.replace('ORDER BY', `WHERE ${conditions.join(' AND ')} ORDER BY`);
  }

  return db.prepare(query).all(...params);
}

function updatePerson(id, { firstName, lastName, dni, type, roleCode, photoUrl, host, company, visitReason, validUntil, workEntryTime, workExitTime }) {
  const existing = db.prepare('SELECT id FROM person WHERE id = ?').get(id);
  if (!existing) {
    throw new Error('Persona no encontrada');
  }

  if (dni) {
    const duplicate = db.prepare('SELECT id FROM person WHERE dni = ? AND id != ?').get(dni, id);
    if (duplicate) {
      throw new Error('DNI ya registrado');
    }
  }

  db.prepare(`
    UPDATE person SET
      first_name = COALESCE(?, first_name),
      last_name = COALESCE(?, last_name),
      dni = COALESCE(?, dni),
      type = COALESCE(?, type),
      role_code = COALESCE(?, role_code),
      photo_url = COALESCE(?, photo_url),
      host = COALESCE(?, host),
      company = COALESCE(?, company),
      visit_reason = COALESCE(?, visit_reason),
      valid_until = COALESCE(?, valid_until),
      work_entry_time = COALESCE(?, work_entry_time),
      work_exit_time = COALESCE(?, work_exit_time)
    WHERE id = ?
  `).run(firstName || null, lastName || null, dni || null, type || null, roleCode || null, photoUrl || null, host || null, company || null, visitReason || null, validUntil || null, workEntryTime || null, workExitTime || null, id);

  return getPerson(id);
}

function deletePerson(id) {
  const existing = db.prepare('SELECT id FROM person WHERE id = ?').get(id);
  if (!existing) {
    throw new Error('Persona no encontrada');
  }
  db.prepare('DELETE FROM access_log WHERE person_id = ?').run(id);
  db.prepare('DELETE FROM person WHERE id = ?').run(id);
}

module.exports = { createPerson, getPerson, getPersonByDni, getAllPersons, updatePerson, deletePerson };
