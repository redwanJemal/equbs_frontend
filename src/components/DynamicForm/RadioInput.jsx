/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, Radio } from 'antd'
import PropTypes from 'prop-types'

const RadioInput = ({ field, formik }) => (
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
		<Radio.Group
			name={field.name}
			value={formik.values[field.name]}
			onChange={(e) => formik.setFieldValue(field.name, e.target.value)}
			onBlur={formik.handleBlur}
		>
			{field.options.map((option) => (
				<Radio key={option.value} value={option.value}>
					{option.label}
				</Radio>
			))}
		</Radio.Group>
	</Form.Item>
)

RadioInput.propTypes = {
	field: PropTypes.object.isRequired,
	formik: PropTypes.object.isRequired,
}

export default RadioInput
