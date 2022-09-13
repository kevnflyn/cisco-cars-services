import { Car } from '../models/Car'
import { response400BadRequest, response404NotFound, response200Success } from '@utils/response'
import { ExpReq, ExpRes } from '@customTypes/express'

export const getCar = async (req: ExpReq, res: ExpRes) => {
  const id = parseInt(req.params.id)

  if (isNaN(id)) {
    return response400BadRequest(res)
  }

  const car = await Car.fetchById(id)

  if (!car) {
    return response404NotFound(res, 'Car not found')
  }

  return response200Success(res, car)
}

export const postCars = async (req: ExpReq, res: ExpRes) => {
  const id = parseInt(req.params.id)

  if (isNaN(id)) {
    return response400BadRequest(res)
  }

  const car = await Car.fetchById(id)

  if (!car) {
    return response404NotFound(res, 'Car not found')
  }

  return response200Success(res, car)
}
