import React from 'react'
import { connect } from 'react-redux'
import './Square.scss'

const Square = (props) => {
	return (
		<div onClick={() => props.onClick(props.index)} className="square">
			{props.field[props.index]}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		field: state.game.field,
	}
}

export default connect(mapStateToProps)(Square)
