import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
	const message = useSelector(({ notification }) => notification)
	if (message === null) {
		return null
	}
	return <div className='msg'>{message}</div>
}

export default Notification
