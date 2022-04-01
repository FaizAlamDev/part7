import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const [msg, setMsg] = useState(null)
	const [error, setError] = useState(null)

	const BlogFormRef = useRef()

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedInUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
		}
	}, [])

	const handleLogin = async (e) => {
		e.preventDefault()

		try {
			const user = await loginService.login({ username, password })
			blogService.setToken(user.token)
			window.localStorage.setItem('loggedInUser', JSON.stringify(user))
			setUser(user)
			setUsername('')
			setPassword('')
			setMsg(`${user.name} logged in`)
			setTimeout(() => {
				setMsg(null)
			}, 4000)
		} catch (exception) {
			console.log(exception)
			setError('wrong username or password')
			setTimeout(() => {
				setError(null)
			}, 4000)
		}
	}

	const handleLogout = (e) => {
		e.preventDefault()
		window.localStorage.removeItem('loggedInUser')
		setUser(null)
	}

	const createBlog = async (blogObject) => {
		BlogFormRef.current.toggleVisibility()
		blogService.setToken(user.token)
		const returnedBlog = await blogService.create(blogObject)
		setBlogs(blogs.concat({ ...returnedBlog, user }))
		setMsg(
			`a new blog '${returnedBlog.title}' by ${returnedBlog.author} added`
		)
		setTimeout(() => {
			setMsg(null)
		}, 4000)
	}

	const incrementLikes = async (id) => {
		const blog = blogs.find((n) => n.id === id)
		const changedBlog = { ...blog, likes: (blog.likes += 1) }
		const returnedBlog = await blogService.update(id, changedBlog)
		setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
	}

	const deleteBlog = async (id) => {
		const blog = blogs.find((n) => n.id === id)
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
			blogService.setToken(user.token)
			await blogService.remove(id)
			setBlogs(blogs.filter((blog) => blog.id !== id))
		}
	}

	if (user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
				<Error error={error} />
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
			<Notification message={msg} />
			<p>
				{user.username} logged in{' '}
				<button onClick={handleLogout}>logout</button>
			</p>
			<Togglable ref={BlogFormRef} buttonLabel='create new blog'>
				<BlogForm createBlog={createBlog} />
			</Togglable>
			{blogs
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
