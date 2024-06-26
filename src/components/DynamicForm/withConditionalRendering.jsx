/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react'

const withConditionalRendering = (WrappedComponent) => {
	return ({ field, formik, ...props }) => {
		if (field.dependentOn) {
			const dependentFieldValue = formik.values[field.dependentOn.field]
			const shouldRender =
				dependentFieldValue === field.dependentOn.value ||
				(field.dependentOn.value === null && !!dependentFieldValue)

			if (!shouldRender) {
				return null
			}
		}

		return <WrappedComponent field={field} formik={formik} {...props} />
	}
}

export default withConditionalRendering
