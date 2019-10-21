import { getUserId } from '../../util'
import { ApolloError } from 'apollo-server'

export default {
	Query: {
		users: (obj, args, ctx, info) => {
			const users = ctx.models.User.getAll()

			return users
		},
		profile: (obj, args, ctx, info) => {
			const userId = getUserId({ request: ctx.request, authRequired: true })
			const user = ctx.models.User.getUserById(userId)
			return user
		}
	},
	Mutation: {
		createUser: async (obj, args, ctx, info) => {
			return ctx.models.User.createUser(args.input)
		},
		login: async (obj, args, ctx, info) => {
			// TODO
		}
	}
}
