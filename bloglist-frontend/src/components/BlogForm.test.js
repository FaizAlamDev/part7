import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> is called correctly with right details', () => {
	const createBlog = jest.fn()

	render(<BlogForm createBlog={createBlog} />)

	const title = screen.getByPlaceholderText('Title')
	const author = screen.getByPlaceholderText('Author')
	const url = screen.getByPlaceholderText('URL')

	const button = screen.getByText('create')

	userEvent.type(title, 'Jest')
	userEvent.type(author, 'Faiz')
	userEvent.type(url, 'localhost:3000')

	userEvent.click(button)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0].title).toBe('Jest')
	expect(createBlog.mock.calls[0][0].author).toBe('Faiz')
	expect(createBlog.mock.calls[0][0].url).toBe('localhost:3000')
})
