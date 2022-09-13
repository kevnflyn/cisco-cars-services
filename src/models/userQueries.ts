export const userTableCreateQuery = `
  CREATE TABLE IF NOT EXISTS users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    has_confirmed_email BOOL NOT NULL,
    PRIMARY KEY(user_id)
  );
`
