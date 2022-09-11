import { buildSchema } from 'graphql'

/**
 * Construct a schema, using GraphQL schema language
 */
export const graphqlSchema = buildSchema(`
 type Query {
   hello: String
 }
`)
