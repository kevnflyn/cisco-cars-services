import { getCar, postCars } from '@controllers/cars'
import express from 'express'

export const carsRouter = express.Router()

carsRouter.get('/cars/:id', getCar)

carsRouter.post('/cars/', postCars)
