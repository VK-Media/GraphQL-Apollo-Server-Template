import { loadFilesSync } from '@graphql-tools/load-files'
import * as path from 'path'

const resolvers = loadFilesSync(
    path.join(__dirname, '../graphql/**/*.resolvers.ts')
)

export default resolvers
