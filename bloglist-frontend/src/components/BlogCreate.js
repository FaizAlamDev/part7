import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import {
	removeNotification,
	setNotification,
} from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import BlogList from './BlogList'
import BlogForm from './BlogForm'

const BlogCreate = () => {
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const BlogFormRef = useRef()
	const createBlog = async (blogObject) => {
		BlogFormRef.current.toggleVisibility()
		blogService.setToken(user.token)
		dispatch(addBlog(blogObject, user))
		dispatch(
			setNotification(
				`a new blog '${blogObject.title}' by ${blogObject.author} added`
			)
		)
		setTimeout(() => {
			dispatch(removeNotification())
		}, 4000)
	}
	return (
		<div>
			<Togglable ref={BlogFormRef} buttonLabel='Create new blog'>
				<BlogForm createBlog={createBlog} />
			</Togglable>
			<BlogList />
		</div>
	)
}

export default BlogCreate
