import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Error = () => {
	const error = useSelector(({ error }) => error)
	if (error === null) {
		return null
	}
	return <div>{<Alert variant='danger'>{error}</Alert>}</div>
}

export default Error
