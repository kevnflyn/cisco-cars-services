export const brandTableCreateQuery = `
  CREATE TABLE IF NOT EXISTS brands (
    id INT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL UNIQUE,
    company_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_company
      FOREIGN KEY(company_id)
      REFERENCES companies(id)
  );
`

export const brandSelectQuery = `
  SELECT * FROM brands WHERE id = $1;
`

export const brandInsertQuery = `
  INSERT INTO brands (name, company_id)
  VALUES ($1, $2)
  RETURNING *;
`
