import UserController from '../../controllers/User.controller'
import { getUserIdFromToken } from '../../utils/user.utils'

export default {
    Query: {
        users: () => {
            return UserController.find()
        },
        user: (obj, args) => {
            return UserController.findOne(args.id)
        }
    },
    Mutation: {
        createUser: async (obj, args) => {
            return UserController.create(args.input)
        }
    }
}
