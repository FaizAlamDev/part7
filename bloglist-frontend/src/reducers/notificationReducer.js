import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		setNotification(state, action) {
			const msg = action.payload
			return msg
		},
		removeNotification() {
			return null
		},
	},
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
