import { Company as CompanyModel } from '@customTypes/models'
import data from '@data/automobileData.json'

export const Company = class {
  static fetchById(id: number): CompanyModel | undefined {
    return data.companies.find(company => company.id === id)
  }
}
