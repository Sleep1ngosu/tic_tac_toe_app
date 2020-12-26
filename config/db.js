const mongoose = require('mongoose')
const config = require('config')

const connectDB = () => {
	try {
		mongoose.connect(
			config.get('URI'),
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			},
			() => {
				console.log('connected...')
			}
		)
	} catch (err) {
		console.log('connecting error')
	}
}

module.exports = connectDB
