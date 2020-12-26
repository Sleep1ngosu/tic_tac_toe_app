import { SHOW_POPUP, HIDE_POPUP } from './types'

export const showPopup = () => async (dispatch) => {
	dispatch({ type: SHOW_POPUP })
}

export const hidePopup = () => async (dispatch) => {
	dispatch({ type: HIDE_POPUP })
}
