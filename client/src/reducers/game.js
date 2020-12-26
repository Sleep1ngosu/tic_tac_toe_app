import {
	SET_INDEX,
	SET_ACTIVE,
	SET_FIELD,
	SET_SYMBOL,
	SET_WINNER,
	CLEAR_GAME,
	SET_DRAW,
} from '../actions/types'

const initialState = {
	index: '',
	active: '',
	field: '',
	symbol: '',
	winner: '',
	draw: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_INDEX: {
			return {
				...state,
				index: action.payload,
			}
		}
		case SET_ACTIVE: {
			return {
				...state,
				active: action.payload,
			}
		}
		case SET_FIELD: {
			return {
				...state,
				field: action.payload,
			}
		}
		case SET_SYMBOL: {
			return {
				...state,
				symbol: action.payload,
			}
		}
		case SET_WINNER: {
			return {
				...state,
				winner: action.payload,
			}
		}
		case CLEAR_GAME: {
			return {
				index: '',
				active: '',
				field: '',
				symbol: '',
				winner: '',
				draw: false,
			}
		}
		case SET_DRAW: {
			return {
				...state,
				draw: true,
			}
		}
		default:
			return state
	}
}
