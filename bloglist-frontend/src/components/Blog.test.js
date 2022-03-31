import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author only', () => {
	const blog = {
		title: 'Jest',
		author: 'Faiz',
		url: 'localhost:3000',
		likes: 100,
	}
	const { container } = render(<Blog blog={blog} />)
	const div = container.querySelector('.blog')
	expect(div).toHaveTextContent('Jest - Faiz')
})

test('clicking the button shows url and no. of likes', () => {
	const blog = {
		title: 'Jest',
		author: 'Faiz',
		url: 'localhost:3000',
		likes: 100,
	}

	const { container } = render(<Blog blog={blog} />)

	const button = screen.getByText('view')
	userEvent.click(button)

	const urlDiv = container.querySelector('#url')
	const likesDiv = container.querySelector('#likes')
	expect(urlDiv).toHaveTextContent('localhost:3000')
	expect(likesDiv).toHaveTextContent('likes 100')
})

test('if like button pressed twice, event handler is called twice', () => {
	const blog = {
		title: 'Jest',
		author: 'Faiz',
		url: 'localhost:3000',
		likes: 100,
	}

	const mockHandler = jest.fn()

	render(<Blog blog={blog} handleLikes={mockHandler} />)

	const buttonView = screen.getByText('view')
	userEvent.click(buttonView)

	const buttonLike = screen.getByText('like')
	userEvent.click(buttonLike)
	userEvent.click(buttonLike)

	expect(mockHandler.mock.calls).toHaveLength(2)
})
