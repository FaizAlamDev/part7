import React, { useState } from 'react'
import { Button, Form, ListGroup } from 'react-bootstrap'
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
			<h2>
				{blog.title} - {blog.author}
			</h2>
			<hr />
			<div>
				<a href={`https://${blog.url}`}>{blog.url}</a>
			</div>
			<div>
				{blog.likes} likes{' '}
				<Button variant='info' onClick={() => handleLike(blog.id)}>
					Like
				</Button>
			</div>
			<div>Added by {blog.user.name}</div>
			{blog.user.name === user.name ? (
				<Button variant='warning' onClick={() => handleRemove(blog.id)}>
					remove
				</Button>
			) : null}
			<br />
			<hr />
			<h3>comments</h3>
			<Form onSubmit={commentFunc}>
				<Form.Group>
					<Form.Control value={comment} onChange={handleComment} />
					<Button variant='primary' type='submit'>
						Add Comment
					</Button>
				</Form.Group>
			</Form>
			<br />
			{blog.comments.map((comment) => (
				<ListGroup key={Math.random() * comment.length}>
					<ListGroup.Item>{comment}</ListGroup.Item>
				</ListGroup>
			))}
		</div>
	)
}

export default SingleBlog
