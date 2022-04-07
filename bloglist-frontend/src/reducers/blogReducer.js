import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload
		},
		appendBlog(state, action) {
			state.push(action.payload)
		},
		likeBlog(state, action) {
			const blog = action.payload
			const blogToChange = state.find((b) => b.id === blog.id)
			const changed = {
				...blogToChange,
				likes: (blogToChange.likes += 1),
			}
			state.map((b) => (b.id !== blog.id ? b : changed))
		},
		deleteBlog(state, action) {
			const id = action.payload
			return state.filter((b) => b.id !== id)
		},
	},
})

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const addBlog = (blogObj, user) => {
	return async (dispatch) => {
		const newBlog = await blogService.create(blogObj)
		dispatch(appendBlog({ ...newBlog, user }))
	}
}

export const like = (id) => {
	return async (dispatch) => {
		const modifiedBlog = await blogService.like(id)
		dispatch(likeBlog(modifiedBlog))
	}
}

export const removeBlog = (id, user) => {
	return async (dispatch) => {
		blogService.setToken(user.token)
		await blogService.remove(id)
		dispatch(deleteBlog(id))
	}
}

export const { setBlogs, appendBlog, likeBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer
