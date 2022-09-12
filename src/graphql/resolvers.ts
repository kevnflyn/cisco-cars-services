import { Company } from "@models/Company"
import { Brand } from "@models/Brand"
import { Car } from "@models/Car"

interface GetCarInput {
  id: number
}

// The root provides a resolver function for each API endpoint
export const graphqlResolvers = {
  getCar: async ({ id }: GetCarInput) => {
    if (isNaN(id)) {
      const error: CustomGraphQLError = new Error('Bad request')
      error.status = 400
      throw error
    }

    const car = await Car.fetchById(id)
    if (!car) {
      const error: CustomGraphQLError = new Error('Car not found')
      error.status = 404
      throw error
    }

    const brand = await Brand.fetchById(car.brandId)

    const company = brand ? await Company.fetchById(brand.companyId) : null

    return {
      ...car,
      brand,
      company
    }
  }
}
