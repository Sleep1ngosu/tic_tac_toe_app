import axios from 'axios'
import {
	LOADING_SUCCESS,
	LOADING_FAILED,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	SUCCESS_ALERT,
	ERROR_ALERT,
	LOGOUT,
} from '../actions/types'
import setAuthToken from '../utils/setAuthToken'
import { setRoom } from './lobby'

export const signup = ({ username, password }) => async (dispatch) => {
	username = username.toLowerCase()
	try {
		const body = {
			username,
			password,
		}
		const URI = 'http://localhost:5000/api/user/signup'
		const response = await axios.post(URI, body)

		await dispatch({
			type: SUCCESS_ALERT,
			payload: response.data.message,
		})
	} catch (err) {
		dispatch({ type: ERROR_ALERT, payload: err.response.data.message })
	}
}

export const loading = () => async (dispatch) => {
	const token = localStorage.getItem('token')
	if (!token) return dispatch({ type: LOADING_FAILED })
	try {
		setAuthToken(token)
		const URI = 'http://localhost:5000/api/user/get_user'
		const response = await axios.get(URI)
		dispatch({
			type: LOADING_SUCCESS,
			payload: {
				username: response.data.user.username,
				joined: response.data.user.joined,
			},
		})
		if (response.data.user.joined) {
			dispatch(setRoom(response.data.user.joined))
		}
	} catch (err) {
		dispatch({ type: LOADING_FAILED })
	}
}

export const login = ({ username, password }) => async (dispatch) => {
	username = username.toLowerCase()
	try {
		const body = {
			username,
			password,
		}
		const URI = 'http://localhost:5000/api/user/login'
		const response = await axios.post(URI, body)
		dispatch({ type: LOGIN_SUCCESS, payload: response.data.token })
		dispatch(loading())
	} catch (err) {
		dispatch({ type: LOGIN_FAILED, payload: err.response.data.message })
	}
}

export const logout = () => async (dispatch) => {
	dispatch({ type: LOGOUT })
}
