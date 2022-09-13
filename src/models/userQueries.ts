export const userTableCreateQuery = `
  CREATE TABLE IF NOT EXISTS users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    has_confirmed_email BOOL NOT NULL,
    PRIMARY KEY(user_id)
  );
`

export const userInsertQuery = `
  INSERT INTO users (email, password, has_confirmed_email)
  VALUES ($1, $2, $3)
  RETURNING *;
`

export const userSelectQuery = `
  SELECT * FROM users WHERE email = $1;
`

export const userDeleteQuery = `
  DELETE FROM users WHERE email = $1;
`
