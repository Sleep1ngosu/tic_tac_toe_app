import io from 'socket.io-client'
import store from './store'

const socket = io('http://localhost:5000', {
	transports: ['websocket', 'polling'],
	auth: {
		token: store.getState().user.token,
	},
})

export default socket
