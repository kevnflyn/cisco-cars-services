import { Brand } from '../models/Brand'
import { response400BadRequest, response404NotFound, response200Success } from '@utils/response'
import { ExpReq, ExpRes } from '@customTypes/express'

export const getBrand = async (req: ExpReq, res: ExpRes) => {
  const id = parseInt(req.params.id)

  if (isNaN(id)) {
    return response400BadRequest(res)
  }

  const brand = await Brand.fetchById(id)

  if (!brand) {
    return response404NotFound(res, 'Brand not found')
  }

  return response200Success(res, brand)
}
