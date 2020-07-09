import mongoose from 'mongoose'

export interface IUserInput {
    name: string
    email: string
    password: string
}

export interface IUserModel extends mongoose.Document {
    name: string
    email: string
    password: string
    generateAuthToken: () => string
    findByCredentials: () => IUserModel
}
