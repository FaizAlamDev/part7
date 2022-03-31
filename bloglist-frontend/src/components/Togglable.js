import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

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
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={show}>
				<h2>create new</h2>
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	)
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
