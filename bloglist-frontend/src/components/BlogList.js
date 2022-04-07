import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { like, removeBlog } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = () => {
	const blogs = useSelector((state) => state.blogs)
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const incrementLikes = async (id) => {
		dispatch(like(id))
	}

	const deleteBlog = async (id) => {
		dispatch(removeBlog(id, user))
	}
	return (
		<div>
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

export default BlogList
