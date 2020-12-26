import {
	LOADING_SUCCESS,
	LOADING_FAILED,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	SUCCESS_ALERT,
	ERROR_ALERT,
	CLEAR_ALERT,
	LOGOUT,
	SET_JOINED,
	SET_ROOM,
} from '../actions/types'

const initialState = {
	username: '',
	token: '',
	isLoading: true,
	isAuthenticated: false,
	joined: '',
	room: {},
	game: Array(9).fill(''),
	alertMessage: '',
	alertColor: '',
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SUCCESS_ALERT: {
			return {
				...state,
				alertMessage: action.payload,
				alertColor: 'green',
			}
		}
		case ERROR_ALERT:
		case LOGIN_FAILED: {
			return {
				...state,
				alertMessage: action.payload,
				alertColor: 'red',
			}
		}
		case CLEAR_ALERT: {
			return {
				...state,
				alertMessage: '',
				alertColor: '',
			}
		}
		case LOGIN_SUCCESS: {
			localStorage.setItem('token', action.payload)
			return {
				...state,
				token: action.payload,
			}
		}
		case LOADING_SUCCESS: {
			return {
				...state,
				username: action.payload.username,
				joined: action.payload.joined,
				token: localStorage.getItem('token'),
				isAuthenticated: true,
				isLoading: false,
			}
		}
		case LOADING_FAILED:
		case LOGOUT: {
			localStorage.removeItem('token')
			return {
				...state,
				token: '',
				username: '',
				isAuthenticated: false,
				isLoading: false,
			}
		}
		case SET_JOINED: {
			return {
				...state,
				joined: action.payload,
			}
		}
		default: {
			return state
		}
	}
}
