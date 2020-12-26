import React, { Fragment, useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import './Signup.scss'
import InputBlock from '../InputBlock/InputBlock'
import { signup } from '../../actions/auth'
import Alert from '../Alert/Alert'
import { clearAlert } from '../../actions/alert'

const Signup = ({ isAuthenticated, signup, clearAlert }) => {
	useEffect(() => {
		clearAlert()
	}, [clearAlert])

	let [formData, setFormData] = useState({
		username: '',
		password: '',
		password2: '',
	})
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		if (formData.password === formData.password2) {
			await signup(formData)
		}
	}

	if (isAuthenticated) {
		return <Redirect to="lobby" />
	}

	return (
		<Fragment>
			<Alert />
			<form onSubmit={(e) => onSubmit(e)} className="signup__wrapper">
				<div className="signup__header">
					<button type="button" className="signup__header__signup">
						Sign Up
					</button>
					<Link to="/login" style={{ textDecoration: 'none' }}>
						<button type="button" className="signup__header__login">
							Login
						</button>
					</Link>
				</div>
				<div className="signup__body">
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
					<InputBlock
						onChange={(e) => onChange(e)}
						label="repeat password"
						type="password"
						name="password2"
						value={formData.password2}
					/>
				</div>
				<div className="signup__footer">
					<button className="signup__footer__submit" type="submit">
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

export default connect(mapStateToProps, { signup, clearAlert })(Signup)
