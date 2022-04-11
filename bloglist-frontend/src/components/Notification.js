import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
	const message = useSelector(({ notification }) => notification)
	if (message === null) {
		return null
	}
	return <div>{<Alert variant='success'>{message}</Alert>}</div>
}

export default Notification
