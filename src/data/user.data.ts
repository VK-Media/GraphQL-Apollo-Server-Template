import { UserInputError } from 'apollo-server'
import User from '../models/User.model'

interface IUserData {
    name: string
    email: string
    password: string
}

export default {
    getAll: async () => {
        return User.find()
    },
    getUserById: async (id: any) => {
        return User.findOne({ _id: id })
    },
    createUser: async (input: IUserData) => {
        try {
            const user = new User(input)
            const token = await user.generateAuthToken()
            await user.save()
            return {
                user,
                token
            }
        } catch (error) {
            throw new UserInputError(error.message)
        }
    }
}
