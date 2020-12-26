const express = require('express')
const router = express.Router()
const Room = require('../../../models/Room')

router.post('/get_rooms_by_tags', async (req, res) => {
	const { tags } = req.body
	try {
		let rooms = await Room.find({})
		let resRooms = []
		rooms.forEach((e) => {
			let isTags = true
			tags.forEach((tag) => {
				if (e.tags.indexOf(tag) === -1) {
					isTags = false
				}
			})
			if (isTags === true) {
				resRooms.push(e)
			}
		})
		res.json(resRooms)
	} catch (error) {
		res.status(500).json({ message: 'server error' })
	}
})

module.exports = router
