import * as express from 'express'
import { Dictionary } from '@customTypes/Dictionary'

type ExpRes = express.Response

const resError = (res: ExpRes, status: number, message: string) => (
  res.status(status).json({
    error: {
      message
    }
  })
)

export const response400BadRequest = (res: ExpRes) => resError(res, 404, 'Bad Request')

export const response404NotFound = (res: ExpRes, msg: string) => resError(res, 404, msg)

/** Payload or Message sent */
export const response200Success = (res: ExpRes, payload?: Dictionary, message?: string) => (
  res.status(200).json({ payload, message })
)
