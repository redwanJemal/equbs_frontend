/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Form, Select } from 'antd'
import PropTypes from 'prop-types'
import axios from 'axios'

const { Option } = Select

const TagInput = ({ field, formik }) => {
	const [options, setOptions] = useState([])

	useEffect(() => {
		const fetchOptions = async () => {
			if (field.apiUrl) {
				try {
					const response = await axios.get(field.apiUrl)
					setOptions(response.data)
				} catch (err) {
					console.error('Failed to load options from API', err)
				}
			} else if (field.options) {
				setOptions(field.options)
			}
		}

		fetchOptions()
	}, [field.apiUrl, field.options])

	const handleChange = (value) => {
		formik.setFieldValue(field.name, value)
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
			<Select
				mode='tags'
				name={field.name}
				placeholder={field.placeholder}
				value={formik.values[field.name]}
				onChange={handleChange}
				onBlur={formik.handleBlur}
				style={{ width: '100%' }}
			>
				{options.map((option) => (
					<Option key={option.id || option} value={option.id || option}>
						{option.name || option}
					</Option>
				))}
			</Select>
		</Form.Item>
	)
}

TagInput.propTypes = {
	field: PropTypes.object.isRequired,
	formik: PropTypes.object.isRequired,
}

export default TagInput
