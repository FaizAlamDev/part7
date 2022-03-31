import React, { useState } from 'react'
const Blog = ({ blog, user, handleLikes, handleRemove }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		margin: 5,
	}

	const [view, setView] = useState(false)

	const handleVisibility = (e) => {
		e.preventDefault()
		setView(!view)
	}

	if (view === true) {
		return (
			<div style={blogStyle} className='blog'>
				<div>
					{blog.title} - {blog.author}
					<button onClick={handleVisibility}>hide</button>
				</div>
				<div id='url'>{blog.url}</div>
				<div id='likes'>
					likes {blog.likes}{' '}
					<button id='likeBtn' onClick={handleLikes}>
						like
					</button>
				</div>
				<div>{blog.author}</div>
				{blog.user.name === user.name ? (
					<button onClick={handleRemove}>remove</button>
				) : null}
			</div>
		)
	}

	return (
		<div style={blogStyle} className='blog'>
			<div>
				{blog.title} - {blog.author}{' '}
				<button id='viewBtn' onClick={handleVisibility}>
					view
				</button>
			</div>
		</div>
	)
}

export default Blog
