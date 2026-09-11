DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO users (name, email, status) VALUES
    ('SeedUser1', 'seed1@gmail.com', 'active'),
    ('SeedUser2', 'seed2@gmail.com', 'suspended'),
    ('SeedUser3', 'seed3@gmail.com', 'deleted');