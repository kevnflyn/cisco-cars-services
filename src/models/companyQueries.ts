export const companyTableCreateQuery = `
  CREATE TABLE IF NOT EXISTS companies (
    id INT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL UNIQUE,
    PRIMARY KEY(id)
  );
`

export const companySelectQuery = `
  SELECT * FROM companies WHERE id = $1;
`

export const companyInsertQuery = `
  INSERT INTO companies (name)
  VALUES ($1)
  RETURNING *;
`
