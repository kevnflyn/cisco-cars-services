import { buildSchema } from 'graphql'

/**
 * Construct a schema, using GraphQL schema language
 */
export const graphqlSchema = buildSchema(`
  type Brand {
    id: ID!
    name: String!
    companyId: ID!
  }

  type Company {
    id: ID!
    name: String!
  }

  type Car {
    id: ID!
    model: String!
    brandid: ID!
    brand: Brand!
    company: Company!
  }

  type RootQuery {
    getCar(id: ID!): Car!
  }

  schema {
    query: RootQuery
  }
`)
