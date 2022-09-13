import { ExpReq, ExpRes } from '@customTypes/express'
import { Company } from '@models/Company'
import { response400BadRequest, response404NotFound, response200Success } from '@utils/response'

export const getCompany = async (req: ExpReq, res: ExpRes) => {
  const id = parseInt(req.params.id)

  if (isNaN(id)) {
    return response400BadRequest(res)
  }

  const company = await Company.fetchById(id)

  if (!company) {
    return response404NotFound(res, 'Company not found')
  }

  return response200Success(res, company)
}
