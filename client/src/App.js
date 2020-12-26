import React, { useEffect } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import './App.scss'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import store from './store'
import { loading } from './actions/auth'
import Lobby from './components/Lobby/Lobby'
import Game from './components/Game/Game'

function App() {
	useEffect(() => {
		store.dispatch(loading())
	}, [])

	const isAuthenticated = store.getState().user.isAuthenticated
	const joined = store.getState().user.joined
	// if (!isAuthenticated) return <Redirect to="/login" />
	// if (isAuthenticated && !joined) return <Redirect to="/lobby" />
	// if (isAuthenticated && joined) return <Redirect to={`/game/${joined}`} />

	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route
						exact
						path="/"
						render={() => {
							return isAuthenticated ? (
								<Redirect to="/lobby" />
							) : (
								<Redirect to="/signup" />
							)
						}}
					/>
					<Route path="/signup" component={Signup} />
					<Route path="/login" component={Login} />
					<Route path="/lobby" component={Lobby} />
					<Route path="/game/:id" component={Game} />
				</Switch>
			</Router>
		</Provider>
	)
}

export default App
