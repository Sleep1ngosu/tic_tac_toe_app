const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	username: {
		type: String,
		require: true,
	},
	password: {
		type: String,
	},
	joined: {
		type: String,
		default: '',
	},
})

module.exports = User = mongoose.model('users', userSchema)
