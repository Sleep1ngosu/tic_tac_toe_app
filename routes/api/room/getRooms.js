const express = require('express')
const router = express.Router()
const Room = require('../../../models/Room')

/**
 * route:   /api/room/get_all_rooms
 */

router.get('/get_all_rooms', async (req, res) => {
	try {
		let rooms = await Room.find({})
		res.status(200).json({ rooms })
	} catch (err) {
		return res.status(500).json({ message: 'server error' })
	}
})

module.exports = router
