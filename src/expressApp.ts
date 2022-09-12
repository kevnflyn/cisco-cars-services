/**
 * Module dependencies.
 */
import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import cors from 'cors'
import { carsRouter } from './routes/cars'
import { brandsRouter } from './routes/brands'
import { companiesRouter } from './routes/companies'
import { appConfig } from './appConfig'

export const expressApp = express()

const { NODE_ENV } = process.env

/**
 * Request logger
 */
 expressApp.use(logger('dev'))

/**
 * Request body parsing
 */
 expressApp.use(express.json())
 expressApp.use(express.urlencoded({ extended: false }))

/**
 * Secure headers
 */
expressApp.use(helmet({
  contentSecurityPolicy: NODE_ENV === 'production' ? undefined : false
}))

/**
 * Cors Options
 */
const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (error: Error | null, origins?: boolean) => void
  ) {
    const isWhitelisted = origin && appConfig.whitelist.indexOf(origin) !== -1
    if (!origin || isWhitelisted) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}
expressApp.use(cors(corsOptions))

/**
 * Routes to API endpoints
 */
expressApp.use('/api', carsRouter)
expressApp.use('/api', brandsRouter)
expressApp.use('/api', companiesRouter)

/**
 * Setup GraphQL
 */

import { graphqlHTTP } from 'express-graphql'
import { graphqlSchema } from './graphql/schema'
import { graphqlResolvers } from './graphql/resolvers'

expressApp.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: process.env.NODE_ENV === 'development',
  customFormatErrorFn: (error: CustomGraphQLError) => {
    if (error.originalError) {
      const { data, message, status } = error.originalError
      return { data, message, status }
    }
    return error
  }
}))
