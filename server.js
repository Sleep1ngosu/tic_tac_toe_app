const express = require('express')
const app = express()
const server = require('http').createServer(app)
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const socket = require('./sockets/socket')
const cors = require('cors')
const io = require('socket.io')(server, {
	transports: ['websocket', 'polling'],
})

socket(io)

connectDB()

app.use(express.json({ extended: false }))

app.use(cors())

app.use('/api/user', require('./routes/api/user/login'))
app.use('/api/user', require('./routes/api/user/signup'))
app.use('/api/user', require('./routes/api/user/user'))
app.use('/api/room', require('./routes/api/room/createRoom'))
app.use('/api/room', require('./routes/api/room/joinRoom'))
app.use('/api/room', require('./routes/api/room/leaveRoom'))
app.use('/api/room', require('./routes/api/room/deleteRoom'))
app.use('/api/room', require('./routes/api/room/startRoom'))
app.use('/api/room', require('./routes/api/room/stopRoom'))
app.use('/api/room', require('./routes/api/room/getRooms'))
app.use('/api/room', require('./routes/api/room/getRoom'))
app.use('/api/room', require('./routes/api/room/getRoomsByTag'))
app.use('/api', require('./routes/api/room/getTags'))

server.listen(PORT, () => {
	console.log(`server is up on ${PORT}`)
})
