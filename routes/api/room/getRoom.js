const express = require('express')
const router = express.Router()
const Room = require('../../../models/Room')

/**
 * route:   /api/room/get_room
 * params:  {id}
 */

router.get('/get_room/:id', async (req, res) => {
	let { id } = req.params
	try {
		let room = await Room.findOne({ id })
		res.status(200).json({ room })
	} catch (err) {
		return res.status(500).json({ message: 'server error' })
	}
})

module.exports = router
