import {
	SET_INDEX,
	SET_ACTIVE,
	SET_FIELD,
	SET_SYMBOL,
	SET_WINNER,
} from '../actions/types'

const initialState = {
	index: '',
	active: '',
	field: '',
	symbol: '',
	winner: '',
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
		default:
			return state
	}
}
