/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, Select } from '@/components'
import PropTypes from 'prop-types'

const { Option } = Select

const SelectInput = ({ field, formik }) => (
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
		<Select
			name={field.name}
			placeholder={field.placeholder}
			value={formik.values[field.name]}
			onChange={(value) => formik.setFieldValue(field.name, value)}
			onBlur={formik.handleBlur}
			style={{ width: '100%' }}
		>
			<Option value=''>{`Select ${field.label}`}</Option>
			{field.options.map((option) => (
				<Option key={option.value} value={option.value}>
					{option.label}
				</Option>
			))}
		</Select>
	</Form.Item>
)

SelectInput.propTypes = {
	field: PropTypes.object.isRequired,
	formik: PropTypes.object.isRequired,
}

export default SelectInput
