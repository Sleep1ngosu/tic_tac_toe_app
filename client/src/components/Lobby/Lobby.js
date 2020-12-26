import React, { Fragment, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import './Lobby.scss'
import io from 'socket.io-client'
import store from '../../store'
import Room from './Room/Room'
import { newGame, setRoom } from '../../actions/lobby'
import { setBlocker, removeBlocker } from '../../actions/blocker'
import { showPopup, hidePopup } from '../../actions/popup'
import Alert from '../Alert/Alert'
// import socket from '../../socket'
import { getAllRooms } from '../../api/getAllRooms'
import { getRoomsByTag } from '../../api/getRoomsByTag'
import TagsInput from 'react-tagsinput'
import Popup from './Popup/Popup'
import SearchIcon from '@material-ui/icons/Search'

let socket

const Lobby = (props) => {
	let [rooms, setRooms] = useState([])
	let [trigger, setTrigger] = useState('')
	let [game, setGame] = useState({
		title: '',
		tags: [],
	})

	let [searchRooms, setSearchRooms] = useState(null)

	let [tags, setTags] = useState([])

	useEffect(() => {
		;(async () => {
			const dbrooms = await getAllRooms()
			setRooms(dbrooms.rooms)
		})()
	}, [trigger])

	useEffect(() => {
		socket = io('http://localhost:5000', {
			transports: ['websocket', 'polling'],
		})
		socket.emit('message', 'Hello server!')
		if (!searchRooms) {
			socket.on('getRooms', (dbrooms) => {
				setRooms(dbrooms)
			})
		}
	}, [])
	if (!props.isAuthenticated) {
		return <Redirect to="/login" />
	}

	if (props.joined !== '') {
		return <Redirect to={`/game/${props.joined}`} />
	}

	const onClickNewGame = async (e, title, tags) => {
		e.preventDefault()
		// console.log(title)
		// console.log(tags)
		const game = await props.newGame(props.username, title, tags)
		if (game) {
			await socket.emit('join', {
				username: props.username,
				id: game.room.id,
			})
			props.setRoom(game.room.id)
			setTrigger(game.room.id)
		}
	}

	const onClickStart = () => {
		props.showPopup()
		props.setBlocker()
	}

	const onClickBlocker = () => {
		props.hidePopup()
		props.removeBlocker()
	}

	const tagsOnChange = async (tags, currentValue) => {
		if (currentValue[0].length <= 5) {
			setTags(tags)
		}
		// console.log(tags)
		if (tags.length === 0) {
			setSearchRooms(null)
		} else {
			const rooms = await getRoomsByTag(tags)
			setSearchRooms(rooms.data)
		}
	}
	let roomsList
	roomsList = rooms.map((e, i) => {
		return (
			<Room
				key={`lobby__room__${i}`}
				players={e.players}
				isActive={e.isActive}
				id={e.id}
				title={e.title}
				tags={e.tags}
			/>
		)
	})

	let searchRoomsList
	if (searchRooms) {
		searchRoomsList = searchRooms.map((e, i) => {
			return (
				<Room
					key={`lobby__searchRoom__${i}`}
					players={e.players}
					isActive={e.isActive}
					id={e.id}
					title={e.title}
					tags={e.tags}
				/>
			)
		})
	}

	let blockerStyle
	props.isShow
		? (blockerStyle = { display: 'block' })
		: (blockerStyle = { display: 'none' })

	return (
		<Fragment>
			<Popup
				onSubmit={(e, title, tags) => onClickNewGame(e, title, tags)}
			/>
			<div className="search">
				<TagsInput
					value={tags}
					onChange={tagsOnChange}
					maxTags={5}
					onlyUnique={true}
					className="search__input"
				/>
				<div className="search__icon">
					<SearchIcon />
				</div>
			</div>
			<div
				onClick={onClickBlocker}
				style={blockerStyle}
				className="blocker"
			></div>
			<Alert />
			<div className="lobby__wrapper">
				<div className="lobby__header">
					<div className="lobby__header__username">
						<span className="lobby__header__username__name">
							user: {props.username}
						</span>
						<div className="lobby__header__search">
							{/* <input
								className="lobby__header__search__input"
								type="text"
								placeholder="search by tags"
							></input> */}
							{/* <TagsInput
								value={tags}
								onChange={tagsOnChange}
								maxTags={5}
								onlyUnique={true}
								className="lobby__header__search__input"
							/> */}
							{/* <button className="lobby__header__search__button">
								search
							</button> */}
						</div>
						<button
							onClick={props.logout}
							className="lobby__header__username__logout"
						>
							<span>Logout</span>
						</button>
					</div>
					<div className="lobby__header__newgame">
						<button
							className="lobby__header__newgame__button"
							type="button"
							onClick={(e) => onClickStart(e)}
						>
							New Game
						</button>
					</div>
				</div>
				<div className="lobby__body">
					{!searchRooms ? roomsList : searchRoomsList}
				</div>
			</div>
		</Fragment>
	)
}

const mapStateToProps = (state) => {
	return {
		username: state.user.username,
		isAuthenticated: state.user.isAuthenticated,
		joined: state.user.joined,
		isShow: state.blocker.isShow,
	}
}

export default connect(mapStateToProps, {
	logout,
	newGame,
	setRoom,
	setBlocker,
	removeBlocker,
	showPopup,
	hidePopup,
})(Lobby)
