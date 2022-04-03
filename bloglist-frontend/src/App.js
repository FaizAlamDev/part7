import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import {
	removeNotification,
	setNotification,
} from './reducers/notificationReducer'
import { removeError, setError } from './reducers/errorReducer'
import {
	addBlog,
	initializeBlogs,
	like,
	removeBlog,
} from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
	const blogs = useSelector((state) => state.blogs)
	const user = useSelector((state) => state.user)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	const BlogFormRef = useRef()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedInUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
		}
	}, [])

	const handleLogin = async (e) => {
		e.preventDefault()

		try {
			const user = await loginService.login({ username, password })
			blogService.setToken(user.token)
			window.localStorage.setItem('loggedInUser', JSON.stringify(user))
			dispatch(setUser(user))
			setUsername('')
			setPassword('')
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

	const handleLogout = (e) => {
		e.preventDefault()
		window.localStorage.removeItem('loggedInUser')
		dispatch(setUser(null))
	}

	const createBlog = async (blogObject) => {
		BlogFormRef.current.toggleVisibility()
		blogService.setToken(user.token)
		dispatch(addBlog(blogObject))
		dispatch(
			setNotification(
				`a new blog '${blogObject.title}' by ${blogObject.author} added`
			)
		)
		setTimeout(() => {
			dispatch(removeNotification())
		}, 4000)
	}

	const incrementLikes = async (id) => {
		dispatch(like(id))
	}

	const deleteBlog = async (id) => {
		dispatch(removeBlog(id, user))
	}

	if (user === null) {
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

	return (
		<div>
			<h2>blogs</h2>
			<Notification />
			<p>
				{user.username} logged in{' '}
				<button onClick={handleLogout}>logout</button>
			</p>
			<Togglable ref={BlogFormRef} buttonLabel='create new blog'>
				<BlogForm createBlog={createBlog} />
			</Togglable>
			{blogs
				.slice()
				.sort((a, b) => b.likes - a.likes)
				.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						user={user}
						handleLikes={() => incrementLikes(blog.id)}
						handleRemove={() => deleteBlog(blog.id)}
					/>
				))}
		</div>
	)
}

export default App
