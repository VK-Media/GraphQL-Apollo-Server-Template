import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import * as path from 'path'

const typesArray = loadFilesSync(
    path.join(__dirname, '../**/*.typedefs.graphql')
)

const typedefinitions = mergeTypeDefs(typesArray)

export default typedefinitions
