import { getUserId } from '../../util'

export default {
	Query: {
		users: (obj, args, ctx, info) => {
			const users = ctx.models.User.getAll()
			return users
		},
		user: (obj, args, ctx, info) => {
			const user = ctx.models.User.getUserById(args.id)
			return user
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
