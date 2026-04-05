const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', 'data', 'qentry.db');

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

const cleaned = schema
  .split('\n')
  .filter((line) => !line.trim().startsWith('#'))
  .join('\n');

const statements = cleaned
  .split(';')
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

for (const stmt of statements) {
  db.exec(stmt);
}

module.exports = db;
