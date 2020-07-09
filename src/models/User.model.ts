import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import * as mongoose from 'mongoose'
import validator from 'validator'

interface IUserModel extends mongoose.Document {
    name: string
    email: string
    password: string
    generateAuthToken: () => string
    findByCredentials: () => IUserModel
}

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

UserSchema.path('email').validate((email) => {
    return validator.isEmail(email)
}, 'Email is invalid')

UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password

    return userObject
}

UserSchema.methods.generateAuthToken = async function () {
    const user = this

    return jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
}

UserSchema.statics.findByCredentials = async (
    email: string,
    password: string
) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error('Unable to login')

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) throw new Error('Unable to login')

    return user
}

// Hash password before saving
UserSchema.pre('save', async function (this: IUserModel, next) {
    const user = this
    const saltCycles = 8
    if (user.isModified('password')) {
        if (user.password.length < 8)
            throw Error('Password must be atleast 8 characters')
        user.password = await bcrypt.hashSync(user.password, saltCycles)
    }

    next()
})

// Email uniqueness
UserSchema.post('save', (error, doc, next) => {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Email must be unique'))
    } else {
        next(error)
    }
})

const User = mongoose.model<IUserModel>('User', UserSchema)

export default User
