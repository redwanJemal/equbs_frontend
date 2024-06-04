/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'

const PasswordInput = ({ field, formik }) => (
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
		<Input.Password
			className='rounded-lg'
			name={field.name}
			placeholder={field.placeholder}
			value={formik.values[field.name]}
			onChange={formik.handleChange}
			onBlur={formik.handleBlur}
		/>
	</Form.Item>
)

PasswordInput.propTypes = {
	field: PropTypes.object.isRequired,
	formik: PropTypes.object.isRequired,
}

export default PasswordInput
