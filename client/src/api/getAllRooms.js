import axios from 'axios'

export const getAllRooms = async () => {
	try {
		const URI = 'http://localhost:5000/api/room/get_all_rooms'
		const response = await axios.get(URI)
		return response.data
	} catch (err) {
		console.log('error')
	}
}
