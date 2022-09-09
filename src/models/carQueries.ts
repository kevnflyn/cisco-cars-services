export const carTableCreateQuery = `
  CREATE TABLE IF NOT EXISTS cars (
    id INT GENERATED ALWAYS AS IDENTITY,
    model TEXT NOT NULL UNIQUE,
    brandId INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_brand
      FOREIGN KEY(brandId)
  	  REFERENCES brands(id)
  );
`

export const carSelectQuery = `
  SELECT * FROM cars WHERE id = $1;
`

export const carInsertQuery = `
  INSERT INTO cars (model, brandId)
  VALUES ($1, $2)
  RETURNING *;
`
