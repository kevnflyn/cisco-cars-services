// The root provides a resolver function for each API endpoint
export const graphqlResolvers = {
  hello: () => {
    return 'Hello world!'
  }
}
