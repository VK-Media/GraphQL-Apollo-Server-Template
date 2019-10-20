import { getUserId } from '../../util'
import User from '../../models/User.model'

export default {
	Query: {
		users: (obj, args, ctx, info) => {
			// const userId = getUserId({ request: ctx.request, authRequired: true })
			const users = ctx.models.User.getAll()

			return users
		},
		user: (obj, args, ctx, info) => {
			// const userId = getUserId({ request: ctx.request, authRequired: true })
			const user = ctx.models.User.getUserById(args.id)
			return user
		}
	},
	Mutation: {
		createUser: async (obj, args, ctx, info) => {
			const user = new User(...args.input)
			const token = await user.generateAuthToken()
			await user.save()
			return {
				user,
				token
			}
		},
		login: async (obj, args, ctx, info) => {
			// TODO
		}
	}
}
