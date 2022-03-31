import React, { useState } from 'react'

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
			<form onSubmit={addBlog}>
				title{' '}
				<input
					id='title'
					value={title}
					onChange={handleTitle}
					placeholder='Title'
				/>
				<br />
				author{' '}
				<input
					id='author'
					value={author}
					onChange={handleAuthor}
					placeholder='Author'
				/>
				<br />
				url{' '}
				<input
					id='url'
					value={url}
					onChange={handleUrl}
					placeholder='URL'
				/>
				<br />
				<button id='createBtn' type='submit'>
					create
				</button>
			</form>
		</div>
	)
}

export default BlogForm
