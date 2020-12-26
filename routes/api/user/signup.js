const express = require('express')
const router = express.Router()
const User = require('../../../models/User')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

router.post(
	'/signup',
	[
		check('username')
			.not()
			.isEmpty()
			.withMessage('username is required')
			.isLength({ max: 12 })
			.withMessage('username should be shorter than 12 characters'),
		check('password').not().isEmpty().withMessage('password is required'),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() })

		const { username, password } = req.body

		try {
			let user = await User.findOne({ username })
			if (user)
				return res.status(400).json({
					message: 'User with this username is already exists',
				})

			const salt = await bcrypt.genSalt(10)
			const hash = await bcrypt.hash(password, salt)

			user = new User({
				username,
				password: hash,
			})
			await user.save()

			res.status(200).json({
				user,
				message: 'user has been successfully registered!',
			})
		} catch (err) {
			res.status(500).json({ message: 'Server error' })
		}
	}
)

module.exports = router
