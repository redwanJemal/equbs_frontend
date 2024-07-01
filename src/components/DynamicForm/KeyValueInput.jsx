/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, Input, Button } from '@/components'
import PropTypes from 'prop-types'

const KeyValueInput = ({ field, formik }) => {
	const value = formik.values[field.name] || []

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
			{value.map((pair, index) => (
				<div key={index} style={{ display: 'flex', marginBottom: 8 }}>
					<Input
						name={`${field.name}[${index}].key`}
						className='rounded-lg'
						placeholder={field.keyPlaceholder}
						value={pair.key}
						onChange={(e) =>
							formik.setFieldValue(
								field.name,
								value.map((p, i) =>
									i === index ? { ...p, key: e.target.value } : p
								)
							)
						}
						onBlur={formik.handleBlur}
						style={{ marginRight: 8 }}
					/>
					<Input
						name={`${field.name}[${index}].keyValue`}
						placeholder={field.valuePlaceholder}
						className='rounded-lg'
						value={pair.keyValue}
						onChange={(e) =>
							formik.setFieldValue(
								field.name,
								value.map((p, i) =>
									i === index ? { ...p, keyValue: e.target.value } : p
								)
							)
						}
						onBlur={formik.handleBlur}
					/>
					<Button
						type='danger'
						onClick={() =>
							formik.setFieldValue(
								field.name,
								value.filter((_, i) => i !== index)
							)
						}
						style={{ marginLeft: 8 }}
					>
						Remove
					</Button>
				</div>
			))}
			<Button
				type='dashed'
				onClick={() =>
					formik.setFieldValue(field.name, [
						...value,
						{ key: '', keyValue: '' },
					])
				}
			>
				Add Detail
			</Button>
		</Form.Item>
	)
}

KeyValueInput.propTypes = {
	field: PropTypes.object.isRequired,
	formik: PropTypes.object.isRequired,
}

export default KeyValueInput
