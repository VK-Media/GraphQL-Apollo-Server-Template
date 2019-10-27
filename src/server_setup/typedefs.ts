import * as path from 'path'
import { mergeTypes, fileLoader } from 'merge-graphql-schemas'

const typesArray = fileLoader(path.join(__dirname, '../**/*.typedef.graphql'))

const typedefinitions = mergeTypes(typesArray, { all: true })

export default typedefinitions
