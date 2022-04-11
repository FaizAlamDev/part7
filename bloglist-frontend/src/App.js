import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import SingleBlog from './components/SingleBlog'
import Users from './components/Users'
import BlogCreate from './components/BlogCreate'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Button, Nav, Navbar } from 'react-bootstrap'

const App = () => {
	const padding = {
		padding: 5,
	}
	const loggedIn = {
		padding: 8,
		color: '#999999',
	}

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
		return (
			<div className='container'>
				<LoginForm />
			</div>
		)
	}

	return (
		<div className='container'>
			<Router>
				<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='mr-auto'>
							<Nav.Link href='#' as='span'>
								<Link style={padding} to='/'>
									Blogs
								</Link>
							</Nav.Link>
							<Nav.Link href='#' as='span'>
								<Link style={padding} to='/users'>
									Users
								</Link>
							</Nav.Link>
							<em style={loggedIn}>{user.username} logged in</em>
							<Button variant='secondary' onClick={handleLogout}>
								Logout
							</Button>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<h1>Blog App</h1>
				<Notification />
				<Routes>
					<Route path='/' element={<BlogCreate />} />
					<Route path='/users' element={<Users />} />
					<Route path='/users/:id' element={<User />} />
					<Route path='/blogs/:id' element={<SingleBlog />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
