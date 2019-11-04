import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import * as path from 'path'

const typesArray = fileLoader(path.join(__dirname, '../**/*.typedef.graphql'))

const typedefinitions = mergeTypes(typesArray, { all: true })

export default typedefinitions
