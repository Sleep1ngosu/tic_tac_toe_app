const express = require('express')
const router = express.Router()
const Room = require('../../../models/Room')
const User = require('../../../models/User')

/**
 * route: 	/api/room/join_room
 * body:	{username, id}
 */

router.put('/join_room', async (req, res) => {
	const { username, id } = req.body
	try {
		let user = await User.findOne({ username })
		if (!user)
			return res
				.status(404)
				.json({ message: 'user with this username does not exist' })
		if (user.joined)
			return res.status(400).json({ message: `you're already in game` })
		let room = await Room.findOne({ id })
		if (!room)
			return res
				.status(404)
				.json({ message: 'room with this id does not exist' })
		if (user.joined === room.id)
			return res
				.status(400)
				.json({ message: `you're already in this room` })

		if (room.countOfPlayers >= 2)
			return res.status(400).json({ message: 'this game is full' })

		if (room.isBlocked)
			return res.status(400).json({ message: 'this game is blocked' })

		room.players.push(username)
		room.countOfPlayers++
		if (room.countOfPlayers >= 2) room.isBlocked = true

		let { players, countOfPlayers, isBlocked } = room
		user = await User.findOneAndUpdate(
			{ username },
			{ joined: id },
			{ new: true }
		)
		room = await Room.findOneAndUpdate(
			{ id },
			{ players, countOfPlayers, isBlocked },
			{ new: true }
		)

		res.status(200).json({ user, room })
	} catch (err) {
		res.status(500).json({ message: 'server error' })
	}
})

module.exports = router
