CREATE TABLE users (
id serial PRIMARY KEY,
name text NOT NULL,
email text NOT NULL UNIQUE,
password text NOT NULL,
"createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions (
id serial PRIMARY KEY,
"userId" integer NOT NULL REFERENCES users("id"),
token text NOT NULL UNIQUE,
"createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE urls (
id serial PRIMARY KEY,
"userId" integer NOT NULL REFERENCES users("id"),
url text NOT NULL,
"shortUrl" text NOT NULL UNIQUE,
visits bigint NOT NULL DEFAULT 0,
"createdAt" timestamp NOT NULL DEFAULT NOW()
)
