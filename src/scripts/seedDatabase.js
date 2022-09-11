/** To be run once before tables have been created or seeding has occurred */
import dotenv from 'dotenv'
dotenv.config()

import { companyInsertQuery, companyTableCreateQuery } from '../models/companyQueries'
import { brandInsertQuery, brandTableCreateQuery } from '../models/brandQueries'
import { carInsertQuery, carTableCreateQuery } from '../models/carQueries'
import { _DB, getDb } from '../utils/database'

const automobileData = {
  cars: [
    {
      id: 1,
      model: 'One',
      brandId: 1
    },
    {
      id: 2,
      model: 'Two',
      brandId: 2
    }
  ],
  brands: [
    {
      id: 1,
      name: 'One',
      companyId: 1
    },
    {
      id: 2,
      name: 'Two',
      companyId: 2
    }
  ],
  companies: [
    {
      id: 1,
      name: 'One'
    },
    {
      id: 2,
      name: 'Two'
    }
  ]
}

const db = getDb()

db.query(`
  ${companyTableCreateQuery}
  ${brandTableCreateQuery}
  ${carTableCreateQuery}
`)

automobileData.companies.forEach(({ name }) => {
  db.query(companyInsertQuery, [ name])
})

automobileData.brands.forEach(({ name, companyId }) => {
  db.query(brandInsertQuery, [name, companyId])
})

automobileData.cars.forEach(({ model, brandId }) => {
  db.query(carInsertQuery, [model, brandId])
})
