import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hide = { display: visible ? 'none' : '' }
	const show = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility,
		}
	})

	return (
		<div>
			<div style={hide}>
				<Button variant='primary' onClick={toggleVisibility}>
					{props.buttonLabel}
				</Button>
			</div>
			<div style={show}>
				<h2>create new</h2>
				{props.children}
				<Button variant='secondary' onClick={toggleVisibility}>
					cancel
				</Button>
			</div>
		</div>
	)
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
