import React from 'react'
import { useSelector } from 'react-redux'

const Error = () => {
	const message = useSelector(({ error }) => error)
	if (message === null) {
		return null
	}
	return <div className='error'>{message}</div>
}

export default Error
