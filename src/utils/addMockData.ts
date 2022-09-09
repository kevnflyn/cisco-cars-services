import { getDb } from './database'
import { companyInsertQuery } from '@models/companyQueries'
import { brandInsertQuery } from '../models/brandQueries'
import { carInsertQuery } from '@models/carQueries'

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

export const addMockData = () => {
  const db = getDb()

  automobileData.companies.forEach(({ name }) => {
    db.query(companyInsertQuery, [ name])
  })

  automobileData.brands.forEach(({ name, companyId }) => {
    db.query(brandInsertQuery, [name, companyId])
  })

  automobileData.cars.forEach(({ model, brandId }) => {
    db.query(carInsertQuery, [model, brandId])
  })
}
