
CREATE TABLE IF NOT EXISTS person (
id TEXT PRIMARY KEY,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
dni TEXT,
type TEXT NOT NULL,
role_code TEXT,
photo_url TEXT,
host TEXT,
company TEXT,
visit_reason TEXT,
valid_until TEXT,
work_schedule TEXT,
created_at TEXT
);

CREATE TABLE IF NOT EXISTS access_log (
id TEXT PRIMARY KEY,
person_id TEXT NOT NULL,
date TEXT NOT NULL,
check_in TEXT,
check_out TEXT,
duration_minutes INTEGER,
status TEXT,
FOREIGN KEY (person_id) REFERENCES person(id)
);

CREATE TABLE IF NOT EXISTS roles (
role_code TEXT PRIMARY KEY,
area TEXT,
name TEXT
);

CREATE TABLE IF NOT EXISTS users (
id TEXT PRIMARY KEY,
email TEXT NOT NULL UNIQUE,
password TEXT NOT NULL,
role TEXT NOT NULL DEFAULT 'admin'
);
