/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Form, Select, Spin, message } from '@/components'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import axiosInstance from '@/middlewares/axios'

const { Option } = Select

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
	const [fetching, setFetching] = useState(false)
	const [options, setOptions] = useState([])
	const fetchRef = useRef(0)

	const debounceFetcher = useMemo(() => {
		const loadOptions = (value) => {
			fetchRef.current += 1
			const fetchId = fetchRef.current
			setOptions([])
			setFetching(true)

			fetchOptions(value).then((newOptions) => {
				if (fetchId !== fetchRef.current) {
					// for fetch callback order
					return
				}
				setOptions(newOptions)
				setFetching(false)
			})
		}

		return debounce(loadOptions, debounceTimeout)
	}, [fetchOptions, debounceTimeout])

	useEffect(() => {
		fetchOptions('').then((newOptions) => {
			setOptions(newOptions)
		})
	}, [fetchOptions])

	return (
		<Select
			mode='multiple'
			labelInValue
			filterOption={false}
			onSearch={debounceFetcher}
			notFoundContent={fetching ? <Spin size='small' /> : null}
			{...props}
			options={options}
		/>
	)
}

const MultiSelectApiInput = ({ field, formik }) => {
	const fetchOptions = async (query) => {
		try {
			const response = await axiosInstance.get(field.apiUrl, {
				params: { query },
			})
			if (Array.isArray(response.data.items)) {
				return response.data.items.map((item) => ({
					label: item[field.optionLabelKey],
					value: item.id,
				}))
			}
			throw new Error('API response is not an array')
		} catch (err) {
			message.error('Failed to load options from the server.')
			return []
		}
	}

	const handleChange = (newValue) => {
		formik.setFieldValue(
			field.name,
			newValue.map((option) => option.value)
		)
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
			<DebounceSelect
				fetchOptions={fetchOptions}
				value={formik.values[field.name].map((value) => ({
					label: value,
					value,
				}))}
				onChange={handleChange}
				placeholder={field.placeholder}
				style={{ width: '100%' }}
			/>
		</Form.Item>
	)
}

MultiSelectApiInput.propTypes = {
	field: PropTypes.object.isRequired,
	formik: PropTypes.object.isRequired,
}

export default MultiSelectApiInput
