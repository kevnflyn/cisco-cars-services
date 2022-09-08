import { getBrand } from '@controllers/brands'
import express from 'express'

export const brandsRouter = express.Router()

brandsRouter.get('/brands/:id', getBrand)
