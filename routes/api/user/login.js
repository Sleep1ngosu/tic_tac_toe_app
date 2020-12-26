const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const User = require('../../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

router.post(
	'/login',
	[
		check('username').not().isEmpty().withMessage('username is required'),
		check('password').not().isEmpty().withMessage('password is required'),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() })

		const { username, password } = req.body
		try {
			let user = await User.findOne({ username })
			if (!user)
				return res.status(404).json({ message: 'Invalid username' })

			const match = await bcrypt.compare(password, user.password)
			if (!match)
				return res.status(400).json({ message: 'Invalid password' })

			const payload = {
				username,
			}
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: '36000s' },
				(err, token) => {
					if (err)
						return res
							.status(400)
							.json({ message: 'cant create token' })
					res.status(200).json({ token })
				}
			)
		} catch (error) {
			res.status(500).json({ error })
		}
	}
)

module.exports = router
