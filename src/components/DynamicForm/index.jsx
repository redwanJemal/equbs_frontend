import { Form, Button, Spin, Row, Col } from '@/components'
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
import PasswordInput from './PasswordInput'
import MultiSelectApiInput from './MultiSelectApiInput'
import withConditionalRendering from './withConditionalRendering'
import withDisabledHandling from './withDisabledHandling'

const deepEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2)

// Wrap field components with the HOC
const WrappedTextInput = withDisabledHandling(
	withConditionalRendering(TextInput)
)
const WrappedNumberInput = withDisabledHandling(
	withConditionalRendering(NumberInput)
)
const WrappedSelectInput = withDisabledHandling(
	withConditionalRendering(SelectInput)
)
const WrappedSelectApiInput = withDisabledHandling(
	withConditionalRendering(SelectApiInput)
)
const WrappedMultiSelectApiInput = withDisabledHandling(
	withConditionalRendering(MultiSelectApiInput)
)
const WrappedKeyValueInput = withDisabledHandling(
	withConditionalRendering(KeyValueInput)
)
const WrappedTextAreaInput = withDisabledHandling(
	withConditionalRendering(TextAreaInput)
)
const WrappedRangePickerInput = withDisabledHandling(
	withConditionalRendering(RangePickerInput)
)
const WrappedTagInput = withDisabledHandling(withConditionalRendering(TagInput))
const WrappedDatePickerInput = withDisabledHandling(
	withConditionalRendering(DatePickerInput)
)
const WrappedRadioInput = withDisabledHandling(
	withConditionalRendering(RadioInput)
)
const WrappedCheckboxInput = withDisabledHandling(
	withConditionalRendering(CheckboxInput)
)
const WrappedPasswordInput = withDisabledHandling(
	withConditionalRendering(PasswordInput)
)

const renderField = (field, formik) => {
	switch (field.type) {
		case 'text':
			return <WrappedTextInput field={field} formik={formik} />
		case 'number':
			return <WrappedNumberInput field={field} formik={formik} />
		case 'select':
			return <WrappedSelectInput field={field} formik={formik} />
		case 'select_api':
			return <WrappedSelectApiInput field={field} formik={formik} />
		case 'multi_select_api':
			return <WrappedMultiSelectApiInput field={field} formik={formik} />
		case 'key_value':
			return <WrappedKeyValueInput field={field} formik={formik} />
		case 'text_area':
			return <WrappedTextAreaInput field={field} formik={formik} />
		case 'range_picker':
			return <WrappedRangePickerInput field={field} formik={formik} />
		case 'tag':
			return <WrappedTagInput field={field} formik={formik} />
		case 'date_picker':
			return <WrappedDatePickerInput field={field} formik={formik} />
		case 'radio':
			return <WrappedRadioInput field={field} formik={formik} />
		case 'checkbox':
			return <WrappedCheckboxInput field={field} formik={formik} />
		case 'password':
			return <WrappedPasswordInput field={field} formik={formik} />
		default:
			return null
	}
}

const DynamicFormComponent = ({
	fieldConfigs,
	formik,
	isLoading = false,
	actionButton = null,
	hideSubmitForm = false,
	initialValues,
}) => {
	const isFormDirty = !deepEqual(formik.values, initialValues)

	// Filter visible fields
	const visibleFields = fieldConfigs.filter((field) => {
		if (field.dependentOn) {
			const dependentFieldValue = formik.values[field.dependentOn.field]
			return (
				dependentFieldValue === field.dependentOn.value ||
				(field.dependentOn.value === null && !!dependentFieldValue)
			)
		}
		return true
	})

	return (
		<Form onFinish={formik.handleSubmit} layout='vertical'>
			<Row gutter={16}>
				{visibleFields.map((field) => (
					<Col
						span={field.width === 'full' ? 24 : 12} // Full width for key_value and text_area fields
						key={field.id}
					>
						{renderField(field, formik)}
					</Col>
				))}
			</Row>
			<Form.Item>
				{!hideSubmitForm && (
					<Button
						type='primary'
						htmlType='submit'
						disabled={isLoading || !isFormDirty}
					>
						{isLoading ? <Spin /> : 'Submit'}
					</Button>
				)}
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
	hideSubmitForm: PropTypes.bool.isRequired,
	initialValues: PropTypes.object.isRequired, // Add prop type for initial values
}

DynamicFormComponent.defaultProps = {
	isLoading: false,
	actionButton: null,
}

export default DynamicFormComponent
