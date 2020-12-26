const User = require('../models/User')
const Room = require('../models/Room')
const jwt = require('jsonwebtoken')
const config = require('config')
const {
	addUser,
	getUsersInRoom,
	removeUser,
	getUser,
	isWinner,
} = require('./helpers')

const socket = async (io) => {
	io.on('connection', async (socket) => {
		socket.on('message', (message) => {
			console.log(message)
		})
		socket.on('join', async (object) => {
			let users = getUsersInRoom(object.id)
			if (users.length === 2) {
				socket.emit('error', 'Too much players in game')
			} else {
				socket.join(object.id)
				const user = addUser(object.username, object.id)
				console.log(user)
				users = getUsersInRoom(object.id)
				io.to(object.id).emit('getusers', users)
				let active = Math.round(Math.random())
				let field = Array(9).fill('')
				io.to(object.id).emit('initgame', { field, active })
			}
		})
		socket.on('joinChannel', (id) => {
			socket.join(id)
		})
		socket.on('update', ({ array, index, active, id, name }) => {
			console.log(id)
			let isWin = isWinner(array)
			console.log(isWin)
			if (isWin) {
				io.to(id).emit('getField', array)
				io.to(id).emit('winner', name)
			} else {
				let newActive
				active === 1 ? (newActive = 0) : (newActive = 1)
				io.to(id).emit('getActive', newActive)
				io.to(id).emit('getField', array)
			}
		})

		socket.on('disconnect', () => {})

		let rooms = await Room.find({})
		io.emit('getRooms', rooms)
	})
}

module.exports = socket
