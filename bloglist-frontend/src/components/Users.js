import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
// import { initializeUsers } from '../reducers/userReducer'

const Users = () => {
	const users = useSelector((state) => state.users)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initializeUsers())
	}, [])

	return (
		<div>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<td></td>
						<td>
							<strong>blogs created</strong>
						</td>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.username}>
							<td>{user.name}</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Users
