import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import errorReducer from './reducers/errorReducer'
import blogReducer from './reducers/blogReducer'
import App from './App'
import './index.css'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		error: errorReducer,
		blogs: blogReducer,
		user: userReducer,
		users: usersReducer,
	},
})

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
