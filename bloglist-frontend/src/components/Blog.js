import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Blog = ({ blog }) => {
	return (
		<div className='blog'>
			<Table striped>
				<tbody>
					<tr>
						<td>
							<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
						</td>
					</tr>
				</tbody>
			</Table>
		</div>
	)
}

export default Blog
