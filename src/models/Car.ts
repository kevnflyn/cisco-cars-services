import { Car as CarModel } from 'src/types/models'
import data from '../data/automobileData.json'

export const Car = class {
  static fetchById(id: number): CarModel | undefined {
    return data.cars.find(car => car.id === id)
  }
}
