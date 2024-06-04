/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, Button, Spin, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import TextInput from './TextInput'
import NumberInput from './NumberInput'
import SelectInput from './SelectInput'
import SelectApiInput from './SelectApiInput'
import KeyValueInput from './KeyValueInput'
import TextAreaInput from './TextAreaInput'
import RangePickerInput from './RangePickerInput'
import TagInput from './TagInput'
import DatePickerInput from './DatePickerInput'
import RadioInput from './RadioInput'
import CheckboxInput from './CheckboxInput'
import PasswordInput from './PasswordInput' // Import the new PasswordInput component

// Utility function to check if two objects are equal
const deepEqual = (obj1, obj2) => {
	return JSON.stringify(obj1) === JSON.stringify(obj2)
}

const DynamicFormComponent = ({
	fieldConfigs,
	formik,
	isLoading = false,
	actionButton = null,
	initialValues, // New prop for initial values
}) => {
	const renderField = (field) => {
		switch (field.type) {
			case 'text':
				return <TextInput field={field} formik={formik} />
			case 'number':
				return <NumberInput field={field} formik={formik} />
			case 'select':
				return <SelectInput field={field} formik={formik} />
			case 'select_api':
				return <SelectApiInput field={field} formik={formik} />
			case 'key_value':
				return <KeyValueInput field={field} formik={formik} />
			case 'text_area':
				return <TextAreaInput field={field} formik={formik} />
			case 'range_picker':
				return <RangePickerInput field={field} formik={formik} />
			case 'tag':
				return <TagInput field={field} formik={formik} />
			case 'date_picker':
				return <DatePickerInput field={field} formik={formik} />
			case 'radio':
				return <RadioInput field={field} formik={formik} />
			case 'checkbox':
				return <CheckboxInput field={field} formik={formik} />
			case 'password':
				return <PasswordInput field={field} formik={formik} /> // Add case for password field
			default:
				return null
		}
	}

	const isFormDirty = !deepEqual(formik.values, initialValues)

	return (
		<Form onFinish={formik.handleSubmit} layout='vertical'>
			<Row gutter={16}>
				{fieldConfigs.map((field) => (
					<Col
						span={field.width === 'full' ? 24 : 12} // Full width for key_value and text_area fields
						key={field.id}
					>
						{renderField(field)}
					</Col>
				))}
			</Row>
			<Form.Item>
				<Button
					type='primary'
					htmlType='submit'
					disabled={isLoading || !isFormDirty}
				>
					{isLoading ? <Spin /> : 'Submit'}
				</Button>
				{actionButton}
			</Form.Item>
		</Form>
	)
}

DynamicFormComponent.propTypes = {
	fieldConfigs: PropTypes.arrayOf(PropTypes.object).isRequired,
	formik: PropTypes.object.isRequired,
	isLoading: PropTypes.bool,
	actionButton: PropTypes.node,
	initialValues: PropTypes.object.isRequired, // Add prop type for initial values
}

DynamicFormComponent.defaultProps = {
	isLoading: false,
	actionButton: null,
}

export default DynamicFormComponent
