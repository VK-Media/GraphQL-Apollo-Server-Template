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
			try {
				return ctx.models.User.createUser(args.input)
			} catch (error) {
				console.log(error)
				throw new ApolloError('Server error', '500')
			}
		},
		login: async (obj, args, ctx, info) => {
			// TODO
		}
	}
}
