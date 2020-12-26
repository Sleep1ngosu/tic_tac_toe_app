const express = require('express')
const router = express.Router()
const Room = require('../../../models/Room')
/**
 * route:   /api/tags
 */
router.get('/tags', async (req, res) => {
	try {
		let tags = await Room.find({}).select('tags')
		let joinedTags = []
		tags = tags.forEach((e) => {
			e.tags.forEach((el) => {
				joinedTags.push(el)
			})
		})
		res.json(joinedTags)
	} catch (err) {
		res.status(500).json({ message: 'server error' })
	}
})

module.exports = router
