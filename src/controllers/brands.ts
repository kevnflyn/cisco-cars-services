import * as express from 'express'
import { Brand } from '../models/Brand'
import { response400BadRequest, response404NotFound, response200Success } from '@utils/response'

type ExpReq = express.Request
type ExpRes = express.Response

export const getBrand = (req: ExpReq, res: ExpRes) => {
  const id = parseInt(req.params.id)

  if (isNaN(id)) {
    return response400BadRequest(res)
  }

  const brand = Brand.fetchById(id)

  if (!brand) {
    return response404NotFound(res, 'Brand not found')
  }

  return response200Success(res, brand)
}
