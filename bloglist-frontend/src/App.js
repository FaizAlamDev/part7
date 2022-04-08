import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import Users from './components/Users'
import BlogCreate from './components/BlogCreate'
import User from './components/User'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
		dispatch(initializeUsers())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedInUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
		}
	}, [dispatch])

	const handleLogout = (e) => {
		e.preventDefault()
		window.localStorage.removeItem('loggedInUser')
		dispatch(setUser(null))
	}

	if (user === null) {
		return <LoginForm />
	}

	return (
		<div>
			<h2>blogs</h2>
			<Notification />
			<p>
				{user.username} logged in{' '}
				<button onClick={handleLogout}>logout</button>
			</p>
			<Router>
				<Routes>
					<Route path='/' element={<BlogCreate />} />
					<Route path='/users' element={<Users />} />
					<Route path='/users/:id' element={<User />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
