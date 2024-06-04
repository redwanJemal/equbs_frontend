/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Form, Select, message } from 'antd'
import PropTypes from 'prop-types'
import axiosInstance from '@/middlewares/axios'

const { Option } = Select

const SelectApiInput = ({ field, formik }) => {
	const [options, setOptions] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const fetchOptions = async () => {
		setLoading(true)
		setError(null)
		try {
			const response = await axiosInstance.get(field.apiUrl)
			console.log(response)
			if (Array.isArray(response.data.items)) {
				setOptions(response.data.items)
			} else {
				throw new Error('API response is not an array')
			}
		} catch (err) {
			setError('Failed to load options')
			message.error('Failed to load options from the server.')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchOptions()
	}, [field.apiUrl])

	// Ensure the selected value appears in the options list
	useEffect(() => {
		const selectedValue = formik.values[field.name]
		if (
			selectedValue &&
			!options.find((option) => option.id === selectedValue)
		) {
			const fetchSelectedOption = async () => {
				try {
					const response = await axiosInstance.get(
						`${field.apiUrl}/${selectedValue}`
					)
					const selectedOption = response.data

					setOptions((prevOptions) => [...prevOptions, selectedOption])
				} catch (err) {
					console.error('Error fetching selected option: ', err)
				}
			}
			fetchSelectedOption()
		}
	}, [formik.values[field.name], field.apiUrl])

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
				id={field.name}
				name={field.name}
				placeholder={field.placeholder}
				value={formik.values[field.name]}
				onChange={(value) => formik.setFieldValue(field.name, value)}
				onBlur={formik.handleBlur}
				style={{ width: '100%' }}
				loading={loading}
				disabled={loading || error}
			>
				<Option value=''>{`Select ${field.label}`}</Option>
				{options.map((option) => {
					return (
						<Option key={option.id} value={option.id}>
							{option[field.optionLabelKey]}
						</Option>
					)
				})}
			</Select>
			{error && <div style={{ color: 'red' }}>{error}</div>}
		</Form.Item>
	)
}

SelectApiInput.propTypes = {
	field: PropTypes.object.isRequired,
	formik: PropTypes.object.isRequired,
}

export default SelectApiInput
