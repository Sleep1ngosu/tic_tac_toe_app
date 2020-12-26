import { SET_ROOM, CLEAR_ROOM } from '../actions/types'

const initialState = ''

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_ROOM: {
			return action.payload
		}
		case CLEAR_ROOM: {
			return {}
		}
		default:
			return state
	}
}
