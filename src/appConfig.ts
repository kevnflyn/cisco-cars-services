/** Development Configuration */
interface AppConfig {
  port: number
  whitelist: string[]
}

interface DbConfig {
  user: string | undefined,
  password: string
  database: string | undefined
  host: string | undefined
  port: number
}

export const appConfig: AppConfig = {
  port: +(process.env.APP_PORT || '3000'),
  whitelist: ['http://localhost:4000']
}

export const dbConfig: DbConfig = {
  user: process.env.APP_DB_USER,
  password: process.env.APP_DB_PASSWORD || '',
  database: process.env.APP_DB_NAME,
  host: process.env.APP_DB_HOST,
  port: +(process.env.APP_DB_PORT || '5432'),
}
