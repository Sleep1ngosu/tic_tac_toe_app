const express = require('express')
const router = express.Router()
const Room = require('../../../models/Room')
const User = require('../../../models/User')

/**
 * route:   /api/room/delete_room
 * body:    {id}
 */
router.delete('/delete_room/:id', async (req, res) => {
	let { id } = req.params
	try {
		let room = await Room.findOne({ id })
		if (!room)
			return res
				.status(404)
				.json({ message: 'room with this id does not exist' })
		let { players } = room
		if (players.length === 0) {
			room = await Room.findOneAndDelete({ id })
			return res
				.status(204)
				.json({ message: 'room has been deleted successfully', room })
		}
		players.forEach(async (username) => {
			await User.findOneAndUpdate({ username }, { joined: '' })
		})
		room = await Room.findOneAndDelete({ id })
		res.status(204).json({
			message: 'room has been deleted successfully',
		})
	} catch (err) {
		return res.status(500).json({ message: 'server error' })
	}
})

module.exports = router
