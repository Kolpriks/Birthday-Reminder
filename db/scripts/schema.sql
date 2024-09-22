CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name: TEXT NOT NULL,
    surname: TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE birthdays (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    birthdate DATE NOT NULL
);
