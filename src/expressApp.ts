/**
 * Module dependencies.
 */
import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import { carsRouter } from './routes/cars'
import { brandsRouter } from './routes/brands'
import { companiesRouter } from './routes/companies'
import { appConfig } from './appConfig'

export const expressApp = express()

/**
 * Request logger
 */
expressApp.use(logger('dev'))

/**
 * Cors Options
 */
const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (error: Error | null, origins?: boolean) => void
  ) {
    const isWhitelisted = origin && appConfig.whitelist.indexOf(origin) !== -1
    console.log('appConfig.whitelist, ', appConfig.whitelist)
    if (!origin || isWhitelisted) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}
expressApp.use(cors(corsOptions))

/**
 * Request body parsing
 */
expressApp.use(express.json())
expressApp.use(express.urlencoded({ extended: false }))

/**
 * Routes to API endpoints
 */
expressApp.use('/api', carsRouter)
expressApp.use('/api', brandsRouter)
expressApp.use('/api', companiesRouter)
