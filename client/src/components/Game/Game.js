import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './Game.scss'
import Board from './Board/Board'
import io from 'socket.io-client'
import { getPlayers } from '../../api/getPlayers'
import { setIndex, setActive, setField, setSymbol } from '../../actions/game'

let socket

const Game = (props) => {
	const [id, setid] = useState(
		window.location.href.split('/')[
			window.location.href.split('/').length - 1
		]
	)
	let [players, setPlayers] = useState([])
	let [settings, setSettings] = useState({
		active: 0,
		roomField: [].fill(''),
	})

	useEffect(() => {
		socket = io('http://localhost:5000', {
			transports: ['websocket', 'polling'],
		})
		socket.emit('join', { username: props.username, id })
		socket.on('getusers', (users) => {
			setPlayers(users)
			if (users.length === 2) {
				let array = []
				array.push(users[0].username)
				array.push(users[1].username)
				props.setIndex(array.indexOf(props.username))
				socket.on('initgame', (object) => {
					props.setActive(object.active)
					props.setField(object.field)
					if (object.active === array.indexOf(props.username)) {
						props.setSymbol('X')
					} else props.setSymbol('O')
				})
			}
		})
	}, [])

	let gamePlayers = []
	if (players) {
		if (players.length === 1) {
			gamePlayers.push(players[0].username)
			gamePlayers.push('Waiting...')
		} else if (players.length === 2) {
			gamePlayers.push(players[0].username)
			gamePlayers.push(players[1].username)
			// let index = gamePlayers.indexOf(props.username)
			// props.setIndex(index)
		}
	}

	let styleActive, styleWinner
	players.length === 2
		? (styleActive = { display: 'flex' })
		: (styleActive = { display: 'none' })

	if (props.winner) {
		styleActive = { display: 'none' }
		styleWinner = { display: 'flex' }
	} else {
		styleWinner = { display: 'none' }
	}

	return (
		<div className="game__wrapper">
			<div style={styleWinner} className="game__active">
				<span className="game__active__active">WINNER:</span>
				<span className="game__active__username">{props.winner}</span>
			</div>
			<div style={styleActive} className="game__active">
				<span className="game__active__active">active:</span>
				<span className="game__active__username">
					{gamePlayers[props.active]}
				</span>
			</div>
			<div className="game__body">
				<div className="game__title">
					<div className="game__title__1">{gamePlayers[0]}</div>
					<div className="game__title__vs">VS</div>
					<div className="game__title__2">{gamePlayers[1]}</div>
				</div>
				<div className="game__field">
					<Board />
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		joined: state.user.joined,
		roomID: state.room,
		username: state.user.username,
		index: state.game.index,
		active: state.game.active,
		field: state.game.field,
		winner: state.game.winner,
	}
}

export default connect(mapStateToProps, {
	setIndex,
	setActive,
	setField,
	setSymbol,
})(Game)
