import { dbConfig } from '../appConfig'
import { Pool } from 'pg'
import { toCamelCaseObject } from './toCamelCaseObject'

type PoolQueryFunc = Pool['query']
export interface NewQueryFuncReturn {
  rows: any[]
  duration: string
}
type PoolQueryParams = Parameters<PoolQueryFunc>
type QueryString = PoolQueryParams[0]
type QueryValues = PoolQueryParams[1]

export type NewQueryFunc = (
  queryString: QueryString,
  values?: QueryValues,
  /** We do not want to define callback that way the developer is forced to use
   * async/await.
   */
  // callback: QueryCallback
) => Promise<NewQueryFuncReturn>

export interface _DB {
  pool: Pool
  query: NewQueryFunc
}

export type DatabaseCallback = (db: _DB) => void

let _db: _DB

export const getDb = (dbConnectionCallback?: DatabaseCallback) => {
  if (_db === undefined) {
    const pool = new Pool({
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      host: dbConfig.host,
      port: dbConfig.port
    })

    const query: NewQueryFunc = async (queryString, values = []) => {
      const start = Date.now()
      const response = await pool.query(queryString, values)
      const duration = `${Date.now() - start}ms`
      return {
        rows: response && response.rows
          ? response.rows.map(result => toCamelCaseObject(result))
          : [],
        duration
      }
    }

    _db = {
      pool,
      query
    }
  }

  if (dbConnectionCallback) {
    dbConnectionCallback(_db)
  }

  return _db
}
