import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { addComment, like, removeBlog } from '../reducers/blogReducer'

const SingleBlog = () => {
	const blogs = useSelector((state) => state.blogs)
	const user = useSelector((state) => state.user)
	const [comment, setComment] = useState('')
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

	const handleComment = (e) => {
		setComment(e.target.value)
	}

	const commentFunc = (e) => {
		e.preventDefault()
		dispatch(addComment(blog.id, comment))
		setComment('')
	}

	return (
		<div>
			<h2>{blog.title}</h2>
			<div>
				<a href={`https://${blog.url}`}>{blog.url}</a>
			</div>
			<div>
				{blog.likes} likes{' '}
				<button onClick={() => handleLike(blog.id)}>like</button>
			</div>
			<div>added by {blog.author}</div>
			{blog.user.name === user.name ? (
				<button onClick={() => handleRemove(blog.id)}>remove</button>
			) : null}
			<h3>comments</h3>
			<form onSubmit={commentFunc}>
				<input value={comment} onChange={handleComment} />
				<button type='submit'>add comment</button>
			</form>
			<ul>
				{blog.comments.map((comment) => (
					<li key={Math.random() * comment.length}>{comment}</li>
				))}
			</ul>
		</div>
	)
}

export default SingleBlog
