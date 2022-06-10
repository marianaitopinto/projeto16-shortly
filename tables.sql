CREATE TABLE users (
id serial PRIMARY KEY,
name text NOT NULL,
email text NOT NULL UNIQUE,
password text NOT NULL,
"createdAt" timestamp NOT NULL DEFAULT NOW()
);
