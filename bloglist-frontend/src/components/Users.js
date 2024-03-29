import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
	const users = useSelector((state) => state.users)

	return (
		<div>
			<h2>Users</h2>
			<Table striped>
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
							<td>
								<Link to={`/users/${user.id}`}>
									{user.name}
								</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}

export default Users
