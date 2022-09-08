import { Brand as BrandModel } from 'src/types/models'
import data from '../data/automobileData.json'

export const Brand = class {
  static fetchById(id: number): BrandModel | undefined {
    return data.brands.find(brand => brand.id === id)
  }
}
