import { UserInputError } from 'apollo-server'
import User from '../models/User.model'
import { IController } from '../types/general.types'
import { IUserInput, IUserModel } from '../types/user.types'

class UserController implements IController<IUserModel, IUserInput> {
    public async find() {
        return User.find()
    }

    public async findOne(id: string) {
        return User.findOne({ _id: id })
    }

    public async create(input: IUserInput) {
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

export default new UserController()
