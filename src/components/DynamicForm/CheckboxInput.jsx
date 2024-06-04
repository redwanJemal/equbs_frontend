/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, Checkbox } from 'antd'
import PropTypes from 'prop-types'

const CheckboxInput = ({ field, formik }) => (
	<Form.Item
		key={field.id}
		label={field.label}
		validateStatus={
			formik.errors[field.name] && formik.touched[field.name] ? 'error' : ''
		}
		help={
			formik.errors[field.name] && formik.touched[field.name]
				? formik.errors[field.name]
				: ''
		}
	>
		<Checkbox
			name={field.name}
			checked={formik.values[field.name]}
			onChange={(e) => formik.setFieldValue(field.name, e.target.checked)}
			onBlur={formik.handleBlur}
		>
			{field.label}
		</Checkbox>
	</Form.Item>
)

CheckboxInput.propTypes = {
	field: PropTypes.object.isRequired,
	formik: PropTypes.object.isRequired,
}

export default CheckboxInput
