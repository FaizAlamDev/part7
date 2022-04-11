import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleTitle = (e) => {
		setTitle(e.target.value)
	}
	const handleAuthor = (e) => {
		setAuthor(e.target.value)
	}
	const handleUrl = (e) => {
		setUrl(e.target.value)
	}
	const addBlog = (e) => {
		e.preventDefault()
		createBlog({
			title: title,
			author: author,
			url: url,
		})
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div className='formDiv'>
			<Form onSubmit={addBlog}>
				<Form.Group>
					<Form.Label>Title</Form.Label>
					<Form.Control
						id='title'
						value={title}
						onChange={handleTitle}
						placeholder='Title'
					/>
					<Form.Label>Author</Form.Label>
					<Form.Control
						id='author'
						value={author}
						onChange={handleAuthor}
						placeholder='Author'
					/>
					<Form.Label>URL</Form.Label>
					<Form.Control
						id='url'
						value={url}
						onChange={handleUrl}
						placeholder='URL'
					/>
					<Button variant='primary' type='submit' id='createBtn'>
						Create
					</Button>
				</Form.Group>
			</Form>
		</div>
	)
}

export default BlogForm
