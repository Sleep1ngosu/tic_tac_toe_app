import { SET_BLOCKER, REMOVE_BLOCKER } from './types'

export const setBlocker = () => async (dispatch) => {
	dispatch({ type: SET_BLOCKER })
}

export const removeBlocker = () => async (dispatch) => {
	dispatch({ type: REMOVE_BLOCKER })
}
