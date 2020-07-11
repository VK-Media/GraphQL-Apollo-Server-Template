import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'

import userResolvers from './user/user.resolvers'
import userTypeDefs from './user/user.typedefs'

// Combine all resolvers into one resolver object
const resolvers = mergeResolvers([userResolvers])

// Combine all typeDefs into one typeDef string
const typeDefs = mergeTypeDefs([userTypeDefs])

export { resolvers, typeDefs }
