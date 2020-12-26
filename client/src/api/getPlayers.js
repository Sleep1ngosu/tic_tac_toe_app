import axios from 'axios'

export const getPlayers = async (id) => {
	try {
		const URI = `http://localhost:5000/api/room/get_room/${id}`
		const response = await axios.get(URI)
		return response.data.room.players
	} catch (err) {
		console.log(err.response)
		return false
	}
}
