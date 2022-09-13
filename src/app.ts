/**
 * First things first, configure our environment using the .env file
 * variables
 */
import dotenv from 'dotenv'
dotenv.config()

/**
 * Module dependencies
 */
import debug from 'debug'
import 'module-alias/register'
import http from 'http'
import { getDb } from './utils/database'
import { createExpressApp } from './expressApp'
import { appConfig } from './appConfig'

/**
 * Application debugger
 */
const debugServer = debug('cisco-cars-exercise:server')

/**
 * Create database
 */
const db = getDb()
process.db = db

/**
 * Create Express application and attach related middleware
 */
const { expressApp } = createExpressApp()

/**
 * Get port from environment and store in Express.
 */
expressApp.set('port', appConfig.port)

/**
 * Create HTTP server.
 */
const server = http.createServer(expressApp)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(appConfig.port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof appConfig.port === 'string'
    ? 'Pipe ' + appConfig.port
    : 'Port ' + appConfig.port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port
  debugServer('Listening on ' + bind)
}

export { expressApp as app }
