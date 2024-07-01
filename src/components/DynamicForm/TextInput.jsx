/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, Input } from '@/components'
import PropTypes from 'prop-types'

const TextInput = ({ field, formik }) => (
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
		<Input
			className='rounded-lg'
			name={field.name}
			placeholder={field.placeholder}
			value={formik.values[field.name]}
			onChange={formik.handleChange}
			onBlur={formik.handleBlur}
		/>
	</Form.Item>
)

TextInput.propTypes = {
	field: PropTypes.object.isRequired,
	formik: PropTypes.object.isRequired,
}

export default TextInput
