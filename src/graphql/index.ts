import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import * as path from 'path'

// Combine all resolvers into one resolver object
const resolversArray = loadFilesSync(path.join(__dirname, './**/*.resolvers.ts'));
const resolvers = mergeResolvers(resolversArray)

// Combine all typeDefs into one typeDef string
const typeDefsArray = loadFilesSync(path.join(__dirname, './**/*.typedefs.graphql'))
const typeDefs = mergeTypeDefs(typeDefsArray)

export {  resolvers, typeDefs }
