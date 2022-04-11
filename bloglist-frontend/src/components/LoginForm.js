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
import { Button, Form } from 'react-bootstrap'

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
			<Form onSubmit={handleLogin}>
				<Form.Group>
					<Form.Label>Username</Form.Label>
					<Form.Control
						id='username'
						type='text'
						value={username}
						name='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>
					<Form.Label>Password</Form.Label>
					<Form.Control
						id='password'
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
					<Button variant='primary' id='loginBtn' type='submit'>
						login
					</Button>
				</Form.Group>
			</Form>
		</div>
	)
}

export default LoginForm
