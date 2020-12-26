import { SET_BLOCKER, REMOVE_BLOCKER } from '../actions/types'

const initialState = {
	isShow: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_BLOCKER: {
			return {
				...state,
				isShow: true,
			}
		}
		case REMOVE_BLOCKER: {
			return {
				...state,
				isShow: false,
			}
		}
		default:
			return state
	}
}
