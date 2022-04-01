import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import errorReducer from './reducers/errorReducer'
import App from './App'
import './index.css'

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		error: errorReducer,
	},
})

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
