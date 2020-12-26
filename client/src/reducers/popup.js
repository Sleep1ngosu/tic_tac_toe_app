import { SHOW_POPUP, HIDE_POPUP } from '../actions/types'

const initialState = {
	isShow: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SHOW_POPUP: {
			return {
				...state,
				isShow: true,
			}
		}
		case HIDE_POPUP: {
			return {
				...state,
				isShow: false,
			}
		}
		default:
			return state
	}
}
