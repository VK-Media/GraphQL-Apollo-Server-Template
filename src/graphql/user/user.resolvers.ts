import UserController from '../../controllers/User.controller'
import { getUserIdFromToken } from '../../utils/user.utils'

export default {
    Query: {
        users: () => {
            return UserController.find()
        },
        user: (obj, args) => {
            return UserController.findOne(args.id)
        },
        profile: (obj, args, ctx) => {
            const userId = getUserIdFromToken({
                request: ctx.request,
                authRequired: true
            })

            return UserController.findOne(userId)
        }
    },
    Mutation: {
        createUser: async (obj, args) => {
            return UserController.create(args.input)
        }
    }
}
