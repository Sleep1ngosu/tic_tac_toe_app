import React from 'react'
import './InputBlock.scss'

const InputBlock = (props) => {
	return (
		<div className="InputBlock__wrapper">
			<span className="InputBlock__label">{props.label}</span>
			<input
				value={props.value}
				name={props.name}
				onChange={props.onChange}
				type={props.type}
				className="InputBlock__input"
				required
			/>
		</div>
	)
}

export default InputBlock
