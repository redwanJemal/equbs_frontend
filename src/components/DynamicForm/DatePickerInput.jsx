/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, DatePicker } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'

const DatePickerInput = ({ field, formik }) => {
	// Convert formik value to moment object if it's a valid date string
	const value = formik.values[field.name]
		? moment(formik.values[field.name], 'YYYY-MM-DD')
		: null

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
				onChange={(date, dateString) =>
					formik.setFieldValue(field.name, dateString)
				}
				onBlur={formik.handleBlur}
				style={{ width: '100%' }}
			/>
		</Form.Item>
	)
}

DatePickerInput.propTypes = {
	field: PropTypes.object.isRequired,
	formik: PropTypes.object.isRequired,
}

export default DatePickerInput
