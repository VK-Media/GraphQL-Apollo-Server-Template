import User from '../models/User.model'
export default {
	getAll: async () => {
		return await User.find()
	},
	getUserById: async id => {
		return await User.findOne({ _id: id })
	}
}
