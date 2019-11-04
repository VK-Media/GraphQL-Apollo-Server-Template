import { fileLoader } from 'merge-graphql-schemas'
import * as path from 'path'

const resolvers = fileLoader(
	path.join(__dirname, '../graphql/**/*.resolvers.ts')
)

export default resolvers
