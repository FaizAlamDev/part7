import { useState } from 'react'
import { useField } from './hooks'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'

const Menu = () => {
	const padding = {
		paddingRight: 5,
	}

	return (
		<div>
			<Link style={padding} to='/'>
				anecdotes
			</Link>
			<Link style={padding} to='/create'>
				create new
			</Link>
			<Link style={padding} to='/about'>
				about
			</Link>
		</div>
	)
}

const Anecdote = ({ anecdote }) => {
	return (
		<div>
			<h2>
				{anecdote.content} by {anecdote.author}
			</h2>
			<p>has {anecdote.votes} votes</p>
			<p>
				for more info see <a href={anecdote.info}>{anecdote.info}</a>
			</p>
		</div>
	)
}

const AnecdoteList = ({ anecdotes }) => (
	<div>
		<h2>Anecdotes</h2>
		<ul>
			{anecdotes.map((anecdote) => (
				<li key={anecdote.id}>
					<Link to={`/anecdotes/${anecdote.id}`}>
						{anecdote.content}
					</Link>
				</li>
			))}
		</ul>
	</div>
)

const About = () => (
	<div>
		<h2>About anecdote app</h2>
		<p>According to Wikipedia:</p>

		<em>
			An anecdote is a brief, revealing account of an individual person or
			an incident. Occasionally humorous, anecdotes differ from jokes
			because their primary purpose is not simply to provoke laughter but
			to reveal a truth more general than the brief tale itself, such as
			to characterize a person by delineating a specific quirk or trait,
			to communicate an abstract idea about a person, place, or thing
			through the concrete details of a short narrative. An anecdote is "a
			story with a point."
		</em>

		<p>
			Software engineering is full of excellent anecdotes, at this app you
			can find the best and add more.
		</p>
	</div>
)

const Footer = () => (
	<div>
		Anecdote app for{' '}
		<a href='https://fullstackopen.com/'>Full Stack Open</a>. See{' '}
		<a href='https://github.com/FaizAlamDev/part7/tree/main/routed-anecdotes'>
			https://github.com/FaizAlamDev/part7/tree/main/routed-anecdotes
		</a>{' '}
		for the source code.
	</div>
)

const CreateNew = (props) => {
	const content = useField('content')
	const author = useField('author')
	const info = useField('info')

	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0,
		})
		navigate('/')
	}

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...content} />
				</div>
				<div>
					author
					<input {...author} />
				</div>
				<div>
					url for more info
					<input {...info} />
				</div>
				<button>create</button>
			</form>
		</div>
	)
}

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurts, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: 1,
		},
		{
			content: 'Premature optimization is the root of all evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: 2,
		},
	])

	const [notification, setNotification] = useState('')

	const addNew = (anecdote) => {
		anecdote.id = Math.round(Math.random() * 10000)
		setAnecdotes(anecdotes.concat(anecdote))
		setNotification(`a new anecdote ${anecdote.content} created!`)
		setTimeout(() => {
			setNotification('')
		}, 5000)
	}

	const match = useMatch('/anecdotes/:id')

	const anecdoteById = match
		? anecdotes.find((a) => a.id === Number(match.params.id))
		: null

	const vote = (id) => {
		const anecdote = anecdoteById(id)

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1,
		}

		setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
	}

	return (
		<div>
			<h1>Software anecdotes</h1>
			<Menu />
			{notification}
			<Routes>
				<Route
					path='/anecdotes/:id'
					element={<Anecdote anecdote={anecdoteById} />}
				/>
				<Route
					path='/'
					element={<AnecdoteList anecdotes={anecdotes} />}
				/>
				<Route path='/about' element={<About />} />
				<Route path='/create' element={<CreateNew addNew={addNew} />} />
			</Routes>
			<Footer />
		</div>
	)
}

export default App
