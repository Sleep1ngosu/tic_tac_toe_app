const express = require('express')
const router = express.Router()
const Room = require('../../../models/Room')
const User = require('../../../models/User')
const crypto = require('crypto')

/**
 * route:   /api/room/create_room
 * body:    {username, title, tags}
 */
router.post('/create_room', async (req, res) => {
	const { username, title, tags } = req.body
	try {
		let id = crypto.randomBytes(8).toString('hex')
		let players = [username]
		let room = new Room({
			id,
			players,
			countOfPlayers: players.length,
			title,
			tags,
		})
		let user = await User.findOne({ username })
		if (!user) return res.status(404).json({ message: 'invalid username' })
		if (user.joined)
			return res
				.status(400)
				.json({ message: 'this user is already in game' })
		user = await User.findOneAndUpdate(
			{ username },
			{ joined: id },
			{ new: true }
		)
		await room.save()

		res.status(200).json({
			room,
			message: 'room has been created successfully!',
		})
	} catch (err) {
		res.status(500).json({ message: 'server error' })
	}
})

module.exports = router
