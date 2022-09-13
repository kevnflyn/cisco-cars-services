import { normalizePort } from './utils/normalizePort'

/** Development Configuration */
interface AppConfig {
  port: number | string | false
  whitelist: string[]
}

interface DbConfig {
  user: string | undefined
  password: string
  database: string | undefined
  host: string | undefined
  port: number
}

interface AppConfigs {
  appConfig: AppConfig
  dbConfig: DbConfig
}

const testAppConfig: AppConfig = {
  port: 3030,
  whitelist: ['http://localhost:3030', 'http://localhost:4000']
}

const defaultAppConfig: AppConfig = {
  port: normalizePort(process.env.APP_PORT || '3000'),
  whitelist: ['http://localhost:3000', 'http://localhost:4000']
}

const defaultDbConfig: DbConfig = {
  user: process.env.APP_DB_USER,
  password: process.env.APP_DB_PASSWORD || '',
  database: process.env.APP_DB_NAME,
  host: process.env.APP_DB_HOST,
  port: +(process.env.APP_DB_PORT || '5432'),
}

export const {
  appConfig,
  dbConfig
}: AppConfigs = process.env.NODE_ENV === 'test'
  ? {
    appConfig: testAppConfig,
    dbConfig: defaultDbConfig
  } : {
    appConfig: defaultAppConfig,
    dbConfig: defaultDbConfig
  }
