/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, DatePicker } from '@/components'
import PropTypes from 'prop-types'

const { RangePicker } = DatePicker

const RangePickerInput = ({ field, formik }) => {
	const handleBlur = () => {
		formik.setFieldTouched(field.name, true)
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
			<RangePicker
				id={field.name}
				name={field.name}
				value={formik.values[field.name]}
				onChange={(dates, dateStrings) =>
					formik.setFieldValue(field.name, dates)
				}
				onBlur={handleBlur}
				style={{ width: '100%' }}
			/>
		</Form.Item>
	)
}

RangePickerInput.propTypes = {
	field: PropTypes.object.isRequired,
	formik: PropTypes.object.isRequired,
}

export default RangePickerInput
