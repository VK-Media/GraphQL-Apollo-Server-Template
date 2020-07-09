import { getUserId } from '../../utils/user.utils'

export default {
    Query: {
        users: (obj, args, ctx, info) => {
            return ctx.models.User.getAll()
        },
        user: (obj, args, ctx, info) => {
            return ctx.models.User.getUserById(args.id)
        },
        profile: (obj, args, ctx, info) => {
            const userId = getUserId({
                request: ctx.request,
                authRequired: true
            })

            return ctx.models.User.getUserById(userId)
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
