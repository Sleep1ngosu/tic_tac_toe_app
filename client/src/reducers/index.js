import { combineReducers } from 'redux'
import user from './user'
import room from './room'
import game from './game'
import blocker from './blocker'
import popup from './popup'

export default combineReducers({
	user,
	room,
	game,
	blocker,
	popup,
})
