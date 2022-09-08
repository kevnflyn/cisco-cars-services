import { Models } from './models'

export type CarDataKey = 'cars' | 'brands' | 'companies'

type CarsModule = Pick<Models, CarDataKey>

declare module '../data/automobileData.json' {
  const value: CarsModule
  export default value
}
