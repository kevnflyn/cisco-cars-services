import { brandSelectQuery } from './brandQueries'

export interface BrandModel {
  id: number
  name: string
  companyId: number
}

export const Brand = class {
  static async fetchById(id: number): Promise<BrandModel | undefined> {
    const { rows: [brand] } = await process.db.query(brandSelectQuery, [id])
    return brand || undefined
  }
}
