import axios from 'axios'
import { SET_JOINED, ERROR_ALERT, SET_ROOM, CLEAR_ROOM } from './types'
import { loading } from './auth'

export const setJoined = (id) => async (dispatch) => {
	dispatch({ type: SET_JOINED, payload: id })
}

export const setRoom = (id) => async (dispatch) => {
	try {
		if (id === '') return
		const URI = `http://localhost:5000/api/room/get_room/${id}`
		const response = await axios.get(URI)
		dispatch({ type: SET_ROOM, payload: response.data.room })
		// console.log(response.data.room)
	} catch (err) {
		console.log('error')
	}
}

export const clearRoom = () => async (dispatch) => {
	dispatch({ type: CLEAR_ROOM })
}

export const newGame = (username, title, tags) => async (dispatch) => {
	try {
		const URI = 'http://localhost:5000/api/room/create_room'
		const body = {
			username,
			title,
			tags,
		}
		const response = await axios.post(URI, body)
		console.log(response)
		await dispatch(setJoined(response.data.room.id))
		await dispatch({ type: SET_ROOM, payload: response.data.room })
		return response.data
	} catch (err) {
		dispatch({ type: ERROR_ALERT, payload: err.response.data.message })
		return false
	}
}

export const joinGame = (username, id) => async (dispatch) => {
	try {
		const URI = 'http://localhost:5000/api/room/join_room'
		let body = {
			username,
			id,
		}
		const response = await axios.put(URI, body)
		dispatch(setJoined(response.data.room.id))
		dispatch(loading())
		dispatch(setRoom(response.data.room.id))
		return response.data.room.id
	} catch (err) {
		dispatch({ type: ERROR_ALERT, payload: err.response.data.message })
		return false
	}
}

export const leaveGame = (username, id) => async (dispatch) => {
	try {
		const URI = `http://localhost:5000/api/room/leave_room`
		const body = {
			username,
			id,
		}
		const response = await axios.put(URI, body)
		dispatch(setJoined(''))
		dispatch(clearRoom())
		return response
	} catch (err) {
		console.log(err.response)
		return false
	}
}
