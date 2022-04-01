import { createSlice } from '@reduxjs/toolkit'

const errorSlice = createSlice({
	name: 'error',
	initialState: null,
	reducers: {
		setError(state, action) {
			const msg = action.payload
			return msg
		},
		removeError() {
			return null
		},
	},
})

export const { setError, removeError } = errorSlice.actions
export default errorSlice.reducer
