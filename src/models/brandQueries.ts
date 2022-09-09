export const brandTableCreateQuery = `
  CREATE TABLE IF NOT EXISTS brands (
    id INT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL UNIQUE,
    companyId INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_company
      FOREIGN KEY(companyId)
      REFERENCES companies(id)
  );
`

export const brandSelectQuery = `
  SELECT * FROM brands WHERE id = $1;
`

export const brandInsertQuery = `
  INSERT INTO brands (name, companyId)
  VALUES ($1, $2)
  RETURNING *;
`
