import { AuthenticationError } from 'apollo-server'
import * as jwt from 'jsonwebtoken'

interface IParams {
	request: {
		headers: {
			authorization
		}
	}
	authRequired: boolean
}

export function getUserId(params: IParams) {
	const authorization = params.request.headers.authorization

	if (authorization) {
		const token = authorization.replace('Bearer ', '')
		const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
			_id: string
			iat: number
		}
		return decoded._id
	}

	if (params.authRequired) throw new AuthenticationError('Please Authenticate')
	else return null
}
