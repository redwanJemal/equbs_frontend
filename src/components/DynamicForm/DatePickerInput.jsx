/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, DatePicker } from 'antd'
import PropTypes from 'prop-types'

const DatePickerInput = ({ field, formik }) => {
	const value = formik.values[field.name] ? formik.values[field.name] : null

	const onChange = (date) => {
		if (date) {
			formik.setFieldValue(field.name, date)
		} else {
			formik.setFieldValue(field.name, '')
		}
	}

	return (
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
			<DatePicker
				id={field.name}
				name={field.name}
				placeholder={field.placeholder}
				value={value}
				onChange={onChange}
				onBlur={formik.handleBlur}
				style={{ width: '100%' }}
				needConfirm
			/>
		</Form.Item>
	)
}

DatePickerInput.propTypes = {
	field: PropTypes.object.isRequired,
	formik: PropTypes.object.isRequired,
}

export default DatePickerInput
