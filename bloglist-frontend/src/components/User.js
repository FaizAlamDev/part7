import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const User = () => {
	const users = useSelector((state) => state.users)
	const match = useMatch('/users/:id')
	const user = match ? users.find((u) => u.id === match.params.id) : null
	if (!user) {
		return null
	}
	return (
		<div>
			<h2>{user.name}</h2>
			<h3>
				<em>Added blogs</em>
			</h3>
			<ListGroup>
				{user.blogs.map((blog) => (
					<ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	)
}

export default User
