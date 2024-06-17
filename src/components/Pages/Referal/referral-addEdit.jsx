/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Button, message, Steps, theme, Form, Drawer } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import DynamicFormComponent from '@/components/DynamicForm'
import {
	ClinicalFindingsFieldConfigs,
	PersonalInfoFieldConfigs,
} from '@/components/Pages/Referal/config'
import { closeDrawer } from '@/stores/drawerSlice'
import {
	CreateReferral,
	UpdateReferral,
	resetSelectedReferral,
	setReferralQueryParameters,
} from '@/stores/referrals'
import { SAMPLE_FACILITY_ID } from '@/constants/apiUrls'

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
		title: 'Patient Information',
		fieldConfigs: PersonalInfoFieldConfigs,
		validationSchema: buildValidationSchema(PersonalInfoFieldConfigs),
	},
	{
		title: 'Clinical Findings',
		fieldConfigs: ClinicalFindingsFieldConfigs,
		validationSchema: buildValidationSchema(ClinicalFindingsFieldConfigs),
	},
]

const ReferralOutAddEditDrawer = () => {
	const { token } = theme.useToken()
	const [current, setCurrent] = useState(0)
	const dispatch = useDispatch()
	const loading = useSelector((state) => state.facilities.detailLoading)
	const selectedReferral = useSelector(
		(state) => state.facilities.selectedFacility
	)
	const isEditMode = !!selectedReferral?.id
	const isDrawerOpen = useSelector((state) => state.drawer.isOpen)

	const initialValues = {
		referringFacilityId: '',
		receivingFacilityId: '',
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		street: '',
		city: '',
		state: '',
		zipCode: '',
		country: 'USA',
		phoneNumber: '',
		woreda: '',
		kebele: '',
		houseNumber: '',
		cardNumber: '',
		referralType: '',
		clinicalFindings: '',
		diagnosis: '',
		investigationResult: '',
		rxGiven: '',
		reasonForReferral: '',
		nameOfPhysician: '',
		date: '',
	}

	const validationSchemas = steps.map((step) => step.validationSchema)

	const formik = useFormik({
		initialValues: selectedReferral || initialValues,
		validationSchema: validationSchemas[current],
		onSubmit: async (values) => {
			const formattedValues = {
				...values,
				dateOfBirth: new Date(values.dateOfBirth).toISOString(),
				date: new Date(values.date).toISOString(),
			}

			const payload = formattedValues
			const action = isEditMode ? UpdateReferral : CreateReferral
			const id = selectedReferral?.id ? selectedReferral.id : null

			if (isEditMode) {
				payload.id = id
			}
			payload.referringFacilityId = SAMPLE_FACILITY_ID
			const response = await dispatch(action({ id, payload }))
			if (response.error) {
				message.error(`Failed to ${isEditMode ? 'Update' : 'Create'} Referral`)
			} else {
				message.success(
					`Succedded on ${isEditMode ? 'Updating' : 'Creating'} Referral`
				)
				formik.resetForm()
				dispatch(resetSelectedReferral())
				dispatch(closeDrawer())
				dispatch(
					setReferralQueryParameters({
						page: 1,
						pageSize: 11,
						filters: { facilityId: SAMPLE_FACILITY_ID },
					})
				)
			}
		},
	})

	useEffect(() => {
		if (selectedReferral) {
			formik.setValues({
				referringFacilityId: selectedReferral?.referringFacilityId || '',
				receivingFacilityId: selectedReferral?.receivingFacilityId || '',
				firstName: selectedReferral?.firstName || '',
				lastName: selectedReferral?.lastName || '',
				dateOfBirth: selectedReferral?.dateOfBirth || '',
				street: selectedReferral?.street || '',
				city: selectedReferral?.city || '',
				state: selectedReferral?.state || '',
				zipCode: selectedReferral?.zipCode || '',
				country: selectedReferral?.country || 'USA',
				phoneNumber: selectedReferral?.phoneNumber || '',
				woreda: selectedReferral?.woreda || '',
				kebele: selectedReferral?.kebele || '',
				houseNumber: selectedReferral?.houseNumber || '',
				cardNumber: selectedReferral?.cardNumber || '',
				referralType: selectedReferral?.referralType || '',
				clinicalFindings: selectedReferral?.clinicalFindings || '',
				diagnosis: selectedReferral?.diagnosis || '',
				investigationResult: selectedReferral?.investigationResult || '',
				rxGiven: selectedReferral?.rxGiven || '',
				reasonForReferral: selectedReferral?.reasonForReferral || '',
				nameOfPhysician: selectedReferral?.nameOfPhysician || '',
				date: selectedReferral?.date || '',
			})
		}
	}, [selectedReferral])

	const handleCloseDrawer = () => {
		dispatch(closeDrawer())
		dispatch(resetSelectedReferral())
		formik.resetForm()
	}

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
		<Drawer
			title={isEditMode ? 'Edit Referral' : 'Add Referral'}
			visible={isDrawerOpen}
			onClose={handleCloseDrawer}
			className='add-edit-drawer'
			width={720}
		>
			<Steps current={current} items={items} />
			<div style={contentStyle}>
				<Form layout='vertical' onSubmit={formik.handleSubmit}>
					<DynamicFormComponent
						hideSubmitForm={true}
						fieldConfigs={steps[current].fieldConfigs}
						formik={formik}
						initialValues={formik.initialValues}
					/>
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
		</Drawer>
	)
}

export default ReferralOutAddEditDrawer
