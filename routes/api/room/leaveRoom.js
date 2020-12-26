const express = require('express')
const { findOneAndUpdate } = require('../../../models/Room')
const router = express.Router()
const Room = require('../../../models/Room')
const User = require('../../../models/User')

/**
 * route:	/api/room/leave_room
 * body: 	{username, id}
 */
router.put('/leave_room', async (req, res) => {
	const { username, id } = req.body
	try {
		let user = await User.findOne({ username })
		if (!user)
			return res
				.status(404)
				.json({ message: 'user with this username does not exist' })
		if (!user.joined)
			return res.status(400).json({ message: 'you are not in game' })
		let room = await Room.findOne({ id })
		if (!room)
			return res
				.status(404)
				.json({ message: 'room with this id does not exist' })
		if (room.id !== user.joined)
			return res.status(400).json({
				message: 'you are not in THIS game',
				id: `your game: ${user.joined}`,
			})
		let index = room.players.indexOf(username)
		room.players.splice(index, 1)
		room.countOfPlayers--
		if (room.countOfPlayers < 2) {
			room.isBlocked = false
			room.isActive = false
		}
		if (room.countOfPlayers === 0) {
			room = await Room.findOneAndDelete({ id })
			user = await User.findOneAndUpdate(
				{ username },
				{ joined: '' },
				{ new: true }
			)
			return res.status(204).json({
				message: 'room has been deleted successfully!',
				id,
			})
		}
		user = await User.findOneAndUpdate(
			{ username },
			{ joined: '' },
			{ new: true }
		)
		const { players, countOfPlayers, isBlocked, isActive } = room
		room = await Room.findOneAndUpdate(
			{ id },
			{ players, countOfPlayers, isBlocked, isActive },
			{ new: true }
		)
		res.status(200).json({ user, room })
	} catch (err) {
		res.status(500).json({ message: 'server error' })
	}
})

module.exports = router
