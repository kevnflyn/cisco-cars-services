import { companySelectQuery } from './companyQueries'

export interface CompanyModel {
  id: number
  name: string
}

export const Company = class {
  static async fetchById(id: number): Promise<CompanyModel | undefined> {
    const { rows: [company] } = await process.db.query(companySelectQuery, [id])
    return company || undefined
  }
}
