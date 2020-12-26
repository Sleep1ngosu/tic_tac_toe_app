import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './Board.scss'
import Square from './Square/Square'
import { setField, setActive, setWinner } from '../../../actions/game'
import io from 'socket.io-client'

let socket

const Board = (props) => {
	let table = []

	let id = window.location.href.split('/')[
		window.location.href.split('/').length - 1
	]

	useEffect(() => {
		socket = io('http://localhost:5000', {
			transports: ['websocket', 'polling'],
		})
		socket.emit('joinChannel', id)
		socket.on('getField', (field) => {
			props.setField(field)
		})
		socket.on('getActive', (active) => {
			props.setActive(active)
		})
		socket.on('winner', (winner) => {
			props.setWinner(winner)
		})

		return () => {
			socket.off()
		}
	}, [])

	const onClick = (index) => {
		if (props.field[index] === '' && props.active === props.index) {
			console.log('Yeah!')
			let array = props.field
			array[index] = props.symbol
			socket.emit('update', {
				array,
				index: props.index,
				active: props.active,
				id: props.roomID,
				name: props.username,
			})
		}
	}

	for (let i = 0; i < 9; i++) {
		table.push(
			<Square
				key={`board__square__${i}`}
				index={i}
				value={props.field[i]}
				onClick={() => onClick(i)}
			/>
		)
	}

	return <div className="board__wrapper">{table}</div>
}

const mapStateToProps = (state) => {
	return {
		active: state.game.active,
		index: state.game.index,
		roomID: state.room.id,
		username: state.user.username,
		index: state.game.index,
		active: state.game.active,
		field: state.game.field,
		symbol: state.game.symbol,
		winner: state.game.winner,
	}
}

export default connect(mapStateToProps, { setField, setActive, setWinner })(
	Board
)
