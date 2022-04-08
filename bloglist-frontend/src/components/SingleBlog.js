import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { like, removeBlog } from '../reducers/blogReducer'

const SingleBlog = () => {
	const blogs = useSelector((state) => state.blogs)
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const match = useMatch('/blogs/:id')
	const blog = match ? blogs.find((b) => b.id === match.params.id) : null

	if (!blog) {
		return null
	}

	const handleLike = async (id) => {
		dispatch(like(id))
	}

	const handleRemove = async (id) => {
		dispatch(removeBlog(id, user))
		navigate('/')
	}

	return (
		<div>
			<h2>{blog.title}</h2>
			<div>
				<a href={blog.url}>{blog.url}</a>
			</div>
			<div>
				{blog.likes} likes{' '}
				<button onClick={() => handleLike(blog.id)}>like</button>
			</div>
			<div>added by {blog.author}</div>
			{blog.user.name === user.name ? (
				<button onClick={() => handleRemove(blog.id)}>remove</button>
			) : null}
		</div>
	)
}

export default SingleBlog
