import React from 'react'
import { connect } from 'react-redux'
import './Alert.scss'
import CloseIcon from '@material-ui/icons/Close'
import { clearAlert } from '../../actions/alert'

const Alert = (props) => {
	let display

	props.alertMessage ? (display = 'flex') : (display = 'none')

	const style = {
		border: `.2rem solid ${props.alertColor}`,
		color: props.alertColor,
		display: display,
	}

	return (
		<div style={style} className="Alert__wrapper">
			<span className="Alert__title">{props.alertMessage}</span>
			<div onClick={props.clearAlert} className="Alert__icon">
				<CloseIcon />
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		alertMessage: state.user.alertMessage,
		alertColor: state.user.alertColor,
	}
}

export default connect(mapStateToProps, { clearAlert })(Alert)
