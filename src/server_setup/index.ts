import { ApolloServer } from 'apollo-server'
import '../db/mongoose'
import userDataMethods from '../model_data/User.data'
import resolvers from './resolvers'
import typeDefs from './typedefs'

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: request => {
		return {
			models: {
				User: userDataMethods
			},
			request: request.req
		}
	},
	debug: false
})

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})
