const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
	id: {
		type: String,
	},
	title: {
		type: String,
	},
	tags: {
		type: Array,
	},
	isActive: {
		type: Boolean,
		default: false,
	},
	countOfPlayers: {
		type: Number,
		default: 1,
	},
	players: {
		type: Array,
	},
	isBlocked: {
		type: Boolean,
		default: false,
	},
})

module.exports = Room = mongoose.model('rooms', RoomSchema)
