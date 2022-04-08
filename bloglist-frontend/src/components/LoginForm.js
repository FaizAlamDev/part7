import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import {
	removeNotification,
	setNotification,
} from '../reducers/notificationReducer'
import { removeError, setError } from '../reducers/errorReducer'
import Error from './Error'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const handleLogin = async (e) => {
		e.preventDefault()

		try {
			const user = await loginService.login({ username, password })
			blogService.setToken(user.token)
			window.localStorage.setItem('loggedInUser', JSON.stringify(user))
			dispatch(setUser(user))
			dispatch(setNotification(`${user.name} logged in`))
			setTimeout(() => {
				dispatch(removeNotification())
			}, 4000)
		} catch (exception) {
			console.log(exception)
			dispatch(setError('wrong username or password'))
			setTimeout(() => {
				dispatch(removeError())
			}, 4000)
		}
	}
	return (
		<div>
			<h2>Log in to application</h2>
			<Error />
			<form onSubmit={handleLogin}>
				<div>
					username:
					<input
						id='username'
						type='text'
						value={username}
						name='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password:
					<input
						id='password'
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button id='loginBtn' type='submit'>
					login
				</button>
			</form>
		</div>
	)
}

export default LoginForm
