/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react'

// Higher Order Component to handle disabled state
const withDisabledHandling = (WrappedComponent) => {
	return (props) => {
		const { field, formik } = props
		const isDisabled =
			formik.values[`${field.name}_isDisabled`] || field.disabled

		return (
			<WrappedComponent {...props} field={{ ...field, disabled: isDisabled }} />
		)
	}
}

export default withDisabledHandling
