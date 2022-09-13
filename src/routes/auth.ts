import { postSignup } from '@controllers/auth'
import express from 'express'
import { body, validationResult } from 'express-validator'
import { response400BadRequest } from '@utils/response'
import { ExpNext, ExpReq, ExpRes } from '@customTypes/express'

export const authRouter = express.Router()

const validateResult = (req: ExpReq, res: ExpRes, next: ExpNext) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // const errorsArray = errors.array()
    return response400BadRequest(res)
  }
  next()
}

authRouter.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  validateResult,
  postSignup
)
