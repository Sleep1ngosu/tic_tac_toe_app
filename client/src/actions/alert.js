import { CLEAR_ALERT } from './types'

export const clearAlert = () => (dispatch) => {
	dispatch({ type: CLEAR_ALERT })
}
