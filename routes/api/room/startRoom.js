const express = require('express')
const router = express.Router()
const Room = require('../../../models/Room')

/**
 * route:   /api/room/start_room
 * body:    {id}
 */

router.put('/start_room', async (req, res) => {
	const { id } = req.body
	try {
		let room = await Room.findOne({ id })
		if (!room)
			return res
				.status(404)
				.json({ message: 'room with this id does not exist' })
		if (room.countOfPlayers !== 2)
			return res.status(400).json({ message: 'not enought players' })
		if (room.isActive)
			return res.status(400).json({ message: 'room is already active' })
		room = await Room.findOneAndUpdate(
			{ id },
			{ active: true, isBlocked: true },
			{ new: true }
		)
		res.status(200).json({
			message: 'room has been started successfully!',
			room,
		})
	} catch (err) {
		return res.status(500).json({ message: 'server error' })
	}
})

module.exports = router
