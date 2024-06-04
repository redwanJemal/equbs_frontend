// src/utils/validationUtils.js
import * as Yup from 'yup'

export const buildValidationSchema = (fieldConfigs) => {
	const schema = fieldConfigs?.reduce((acc, field) => {
		if (field.validation) {
			acc[field.name] = field.validation
		}
		return acc
	}, {})
	return Yup.object().shape(schema)
}
