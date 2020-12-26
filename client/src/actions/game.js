import {
	SET_INDEX,
	SET_ACTIVE,
	SET_FIELD,
	SET_SYMBOL,
	SET_WINNER,
	CLEAR_GAME,
	SET_DRAW,
} from './types'

export const setIndex = (index) => async (dispatch) => {
	dispatch({ type: SET_INDEX, payload: index })
}

export const setActive = (active) => async (dispatch) => {
	dispatch({ type: SET_ACTIVE, payload: active })
}

export const setField = (field) => async (dispatch) => {
	dispatch({ type: SET_FIELD, payload: field })
}

export const setSymbol = (symbol) => async (dispatch) => {
	dispatch({ type: SET_SYMBOL, payload: symbol })
}

export const setWinner = (winner) => async (dispatch) => {
	dispatch({ type: SET_WINNER, payload: winner })
}

export const clearGame = () => async (dispatch) => {
	dispatch({ type: CLEAR_GAME })
}

export const setDraw = () => async (dispatch) => {
	dispatch({ type: SET_DRAW })
}
