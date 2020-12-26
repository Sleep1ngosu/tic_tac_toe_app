const express = require('express')
const router = express.Router()
const auth = require('../../../middleware/auth')
const User = require('../../../models/User')

router.get('/get_user', auth, async (req, res) => {
	let { username } = req.body
	try {
		let user = await User.findOne({ username }).select('-password')

		res.status(200).json({ user })
	} catch (err) {}
})

module.exports = router
