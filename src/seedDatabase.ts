import { companyTableCreateQuery } from '@models/companyQueries'
import { brandTableCreateQuery } from '@models/brandQueries'
import { carTableCreateQuery } from '@models/carQueries'
import { _DB } from '@utils/database'

export const seedDatabase = (database: _DB) => {
  database.query(`
    ${companyTableCreateQuery}
    ${brandTableCreateQuery}
    ${carTableCreateQuery}
  `)
}
