require('dotenv').config()
import '../mongoose'
import { ApolloServer } from 'apollo-server'
import typeDefs from './typedefs'
import resolvers from './resolvers'
import userDataMethods from '../model_fetching/User.data'

// TODO - Authenticated Guard wrapper on resolvers https://medium.com/the-guild/authentication-and-authorization-in-graphql-and-how-graphql-modules-can-help-fadc1ee5b0c2

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
	}
})

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`)
})
