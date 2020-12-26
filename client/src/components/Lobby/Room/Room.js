import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './Room.scss'
import { joinGame } from '../../../actions/lobby'
import { deleteRoom } from '../../../api/deleteRoom'
import io from 'socket.io-client'
import { Redirect } from 'react-router-dom'
import Tag from './Tag/Tag'

let socket

const Room = (props) => {
	let [room, setRoom] = useState()
	useEffect(() => {
		socket = io('http://localhost:5000', {
			transports: ['websocket', 'polling'],
		})
	}, [])

	let status
	if (props.players.length < 2) status = 'Waiting players'
	if (props.players.length === 2) status = 'Full'
	if (props.isActive) status = 'In game'

	if (props.joined) {
		return <Redirect to={`/game/${props.joined}`} />
	}

	const Join = async (username, id) => {
		const match = await props.joinGame(username, id)
	}

	let tagsList
	if (props.tags.length) {
		tagsList = props.tags.map((e, i) => {
			return <Tag title={e} key={`room__tags__${i}`} />
		})
	} else tagsList = 'None'

	return (
		<div className="room__wrapper">
			<div className="room__title">
				<span className="room__title__host">TITLE:</span>
				<span className="room__title__username">{props.title}</span>
			</div>
			<div
				title={`1: ${props.players[0]}, 2: ${props.players[1]}`}
				className="room__players"
			>
				<div className="room__players__text">Players:</div>
				<div className="room__players__count">
					{props.players.length}/2
				</div>
			</div>
			<div className="room__status">
				<div className="room__status__text">Status:</div>
				<div className="room__status__status">{status}</div>
			</div>
			<div className="room__tags">
				<span className="room__tags__text">Tags: </span>
				{tagsList}
				{/* <div className="room__tags__tags">{tagsList}</div> */}
			</div>
			<div className="room__join">
				<button
					onClick={() => Join(props.username, props.id)}
					className="room__join__button"
				>
					JOIN
				</button>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		joined: state.user.joined,
		username: state.user.username,
	}
}

export default connect(mapStateToProps, { joinGame })(Room)
