
# 🧩 Schema - SQLite (QEntry)

CREATE TABLE person (
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
work_entry_time TEXT,
work_exit_time TEXT,
created_at TEXT
);

CREATE TABLE access_log (
id TEXT PRIMARY KEY,
person_id TEXT NOT NULL,
date TEXT NOT NULL,
check_in TEXT,
check_out TEXT,
duration_minutes INTEGER,
status TEXT,
FOREIGN KEY (person_id) REFERENCES person(id)
);

CREATE TABLE roles (
role_code TEXT PRIMARY KEY,
area TEXT,
name TEXT
);
