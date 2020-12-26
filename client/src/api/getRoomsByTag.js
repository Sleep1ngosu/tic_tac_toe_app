import axios from 'axios'

export const getRoomsByTag = async (tags) => {
	try {
		const URI = 'http://localhost:5000/api/room/get_rooms_by_tags'
		const body = {
			tags,
		}

		const response = await axios.post(URI, body)
		return response
	} catch (err) {
		console.log(err.response)
		return false
	}
}
