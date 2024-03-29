const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id).populate('user', {
		username: 1,
		name: 1,
	})
	response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body

	const user = request.user

	if (!user) {
		return response.status(401).json({ error: 'token missing' })
	}

	if (!body.title || !body.url) {
		return response.status(400).json({ error: 'title or url missing' })
	}

	if (!body.likes) {
		body.likes = 0
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id,
		comments: [],
	})

	const savedBlog = await blog.save()

	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	const user = request.user
	const blog = await Blog.findById(request.params.id)
	if (blog.user.toString() === user.id) {
		await Blog.findByIdAndRemove(request.params.id)
	} else {
		return response.status(401).json({ error: 'Not Authorized' })
	}

	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body

	const blog = {
		likes: body.likes,
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
	})
	response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
	const body = request.body
	if (!body) {
		return response.status(400).json({
			error: 'content missing',
		})
	}

	const blog = await Blog.findById(request.params.id)
	blog.comments.push(body.comment)

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
	})
	response.json(updatedBlog)
})

module.exports = blogsRouter
