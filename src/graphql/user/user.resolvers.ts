import UserController from '../../controllers/User.controller'
import { getUserId } from '../../utils/user.utils'

export default {
    Query: {
        users: (obj, args, ctx, info) => {
            return UserController.find()
        },
        user: (obj, args, ctx, info) => {
            return UserController.findOne(args.id)
        },
        profile: (obj, args, ctx, info) => {
            const userId = getUserId({
                request: ctx.request,
                authRequired: true
            })

            return UserController.findOne(userId)
        }
    },
    Mutation: {
        createUser: async (obj, args, ctx, info) => {
            return UserController.create(args.input)
        },
        login: async (obj, args, ctx, info) => {
            // TODO
        }
    }
}
