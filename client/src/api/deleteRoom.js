import axios from 'axios'

export const deleteRoom = async (id) => {
	try {
		const URI = `http://localhost:5000/api/room/delete_room/${id}`
		const response = await axios.delete(URI)
		console.log(response)
	} catch (err) {
		console.log(err.response)
	}
}
