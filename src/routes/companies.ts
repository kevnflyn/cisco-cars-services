import express from 'express'
import { getCompany } from '@controllers/companies'

export const companiesRouter = express.Router()

companiesRouter.get('/companies/:id', getCompany)
