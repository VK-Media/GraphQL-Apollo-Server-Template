import jwt from 'jsonwebtoken'

interface params {
	request: any
	authRequired: Boolean
}

export function getUserId(params: params) {
	const Authorization = params.request.headers.Authorization

	if (Authorization) {
		const token = Authorization.replace('Bearer ', '')
		const { userId } = jwt.verify(token, process.env.JWT_SECRET)
		return userId
	}

	if (params.authRequired) throw new AuthError()
	else return null
}

export class AuthError extends Error {
	constructor() {
		super('Not Authorized')
	}
}
