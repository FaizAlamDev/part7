import { createSlice } from '@reduxjs/toolkit'
// import userService from '../services/users'

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUser(state, action) {
			return action.payload
		},
	},
})

// export const initializeUsers = () => {
// 	return async (dispatch) => {
// 		const users = await userService.getAll()
// 		dispatch(setUsers(users))
// 	}
// }
export const { setUser } = userSlice.actions
export default userSlice.reducer
