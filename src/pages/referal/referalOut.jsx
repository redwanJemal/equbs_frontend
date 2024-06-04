/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, message, Steps, theme, Form } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import DynamicFormComponent from '@/components/DynamicForm'
import {
	ClinicalFindingsFieldConfigs,
	PersonalInfoFieldConfigs,
} from '@/components/Pages/Referal/config'

const { Step } = Steps

const buildValidationSchema = (fieldConfigs) => {
	const schema = fieldConfigs.reduce((acc, field) => {
		if (field.validation) {
			acc[field.name] = field.validation
		}
		return acc
	}, {})
	return Yup.object().shape(schema)
}

const steps = [
	{
		title: 'Personal Information',
		content: (formik) => (
			<DynamicFormComponent
				fieldConfigs={PersonalInfoFieldConfigs}
				formik={formik}
				initialValues={formik.initialValues}
			/>
		),
		validationSchema: buildValidationSchema(PersonalInfoFieldConfigs),
	},
	{
		title: 'Clinical Findings',
		content: (formik) => (
			<DynamicFormComponent
				fieldConfigs={ClinicalFindingsFieldConfigs}
				formik={formik}
				initialValues={formik.initialValues}
			/>
		),
		validationSchema: buildValidationSchema(ClinicalFindingsFieldConfigs),
	},
]

const ReferalOutPage = () => {
	const { token } = theme.useToken()
	const [current, setCurrent] = useState(0)

	const initialValues = {
		firstName: '',
		lastName: '',
		gender: '',
		dateOfBirth: '',
		phoneNumber: '',
		email: '',
		chiefComplaint: '',
		historyOfPresentIllness: '',
		pastMedicalHistory: '',
		physicalExam: '',
		diagnosis: '',
		treatmentPlan: '',
	}

	const formik = useFormik({
		initialValues,
		validationSchema: steps[current].validationSchema,
		onSubmit: (values) => {
			console.log('Form values:', values)
			message.success('Processing complete!')
		},
	})

	const next = () => {
		formik.validateForm().then((errors) => {
			if (Object.keys(errors).length === 0) {
				setCurrent(current + 1)
			} else {
				formik.setTouched(errors)
			}
		})
	}

	const prev = () => {
		setCurrent(current - 1)
	}

	const items = steps.map((item) => ({
		key: item.title,
		title: item.title,
	}))

	const contentStyle = {
		marginTop: 16,
	}

	return (
		<div className='px-4'>
			<Steps current={current} items={items} />
			<div style={contentStyle}>
				<Form layout='vertical' onSubmit={formik.handleSubmit}>
					{steps[current].content(formik)}
				</Form>
			</div>
			<div style={{ marginTop: 24 }}>
				{current < steps.length - 1 && (
					<Button type='primary' onClick={() => next()}>
						Next
					</Button>
				)}
				{current === steps.length - 1 && (
					<Button type='primary' onClick={formik.handleSubmit}>
						Done
					</Button>
				)}
				{current > 0 && (
					<Button style={{ margin: '0 8px' }} onClick={() => prev()}>
						Previous
					</Button>
				)}
			</div>
		</div>
	)
}

export default ReferalOutPage
