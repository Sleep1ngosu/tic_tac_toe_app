import React, { Fragment, useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import './Login.scss'
import InputBlock from '../InputBlock/InputBlock'
import { login } from '../../actions/auth'
import Alert from '../Alert/Alert'
import { clearAlert } from '../../actions/alert'

const Login = ({ isAuthenticated, login, clearAlert }) => {
	useEffect(() => {
		clearAlert()
	}, [clearAlert, isAuthenticated])

	let [formData, setFormData] = useState({
		username: '',
		password: '',
	})

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const onSubmit = (e) => {
		e.preventDefault()
		login(formData)
	}

	if (isAuthenticated) {
		return <Redirect to="lobby" />
	}

	return (
		<Fragment>
			<Alert />
			<form onSubmit={(e) => onSubmit(e)} className="login__wrapper">
				<div className="login__header">
					<Link to="/signup" style={{ textDecoration: 'none' }}>
						<button type="button" className="login__header__signup">
							Sign Up
						</button>
					</Link>
					<button type="button" className="login__header__login">
						Login
					</button>
				</div>
				<div className="login__body">
					<InputBlock
						onChange={(e) => onChange(e)}
						label="username"
						type="text"
						name="username"
						value={formData.username}
					/>
					<InputBlock
						onChange={(e) => onChange(e)}
						label="password"
						type="password"
						name="password"
						value={formData.password}
					/>
				</div>
				<div className="login__footer">
					<button type="submit" className="login__footer__submit">
						Submit
					</button>
				</div>
			</form>
		</Fragment>
	)
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.user.isAuthenticated,
	}
}

export default connect(mapStateToProps, { login, clearAlert })(Login)
