/** To be run once before tables have been created or seeding has occurred */
import dotenv from 'dotenv'
dotenv.config()

import { companyInsertQuery, companyTableCreateQuery } from '../models/companyQueries'
import { brandInsertQuery, brandTableCreateQuery } from '../models/brandQueries'
import { carInsertQuery, carTableCreateQuery } from '../models/carQueries'
import { _DB, getDb } from '../utils/database'
import { userTableCreateQuery } from '../models/userQueries'

const automobileData = {
  cars: [
    {
      id: 1,
      model: 'One',
      brand_id: 1
    },
    {
      id: 2,
      model: 'Two',
      brand_id: 2
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

const createTablesAndSeedDb = async () => {
  await db.query(`
    ${userTableCreateQuery}
    ${companyTableCreateQuery}
    ${brandTableCreateQuery}
    ${carTableCreateQuery}
  `)

  await Promise.all(automobileData.companies.map(({ name }) => (
    db.query(companyInsertQuery, [ name])
  )))

  await Promise.all(automobileData.brands.map(({ name, companyId }) => (
    db.query(brandInsertQuery, [name, companyId])
  )))

  await Promise.all(automobileData.cars.map(({ model, brand_id }) => (
    db.query(carInsertQuery, [model, brand_id])
  )))
}

createTablesAndSeedDb()
