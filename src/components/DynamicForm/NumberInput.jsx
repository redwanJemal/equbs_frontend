/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, InputNumber } from 'antd'
import PropTypes from 'prop-types'

const NumberInput = ({ field, formik }) => (
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
		<InputNumber
			name={field.name}
			placeholder={field.placeholder}
			value={formik.values[field.name]}
			onChange={(value) => formik.setFieldValue(field.name, value)}
			onBlur={formik.handleBlur}
			style={{ width: '100%' }}
		/>
	</Form.Item>
)

NumberInput.propTypes = {
	field: PropTypes.object.isRequired,
	formik: PropTypes.object.isRequired,
}

export default NumberInput
