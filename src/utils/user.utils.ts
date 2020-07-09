import { AuthenticationError } from 'apollo-server'
import * as jwt from 'jsonwebtoken'
import { IParams } from '../types/general.types'

export function getUserIdFromToken(params: IParams): string {
    const authorization = params.request.headers.authorization

    if (authorization) {
        const token = authorization.replace('Bearer ', '')
        const secret: string = <string>process.env.JWT_SECRET || ''
        const decoded = jwt.verify(token, secret) as {
            _id: string
            iat: number
        }

        return decoded._id
    }

    if (params.authRequired) {
        throw new AuthenticationError('Please Authenticate')
    }

    return ''
}
