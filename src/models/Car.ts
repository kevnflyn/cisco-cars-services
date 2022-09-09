import { carSelectQuery } from './carQueries'

export interface CarModel {
  id: number
  model: string
  brandId: number
}

export const Car = class {
  static async fetchById(id: number): Promise<CarModel | undefined> {
    const { rows: [car] } = await process.db.query(carSelectQuery, [id])
    return car || undefined
  }
}
