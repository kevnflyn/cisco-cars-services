type CustomGraphQLError = GraphQLError & {
  data: any
  status: string
}
