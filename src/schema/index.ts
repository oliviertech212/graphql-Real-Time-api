import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs } from './typeDef'
import { resolvers } from './resolvers'



export const schema = makeExecutableSchema({
    resolvers: [resolvers],
    typeDefs: [typeDefs]
  })