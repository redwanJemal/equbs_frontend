/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Drawer, message } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FacilityFieldConfigs } from './config'
import { closeDrawer } from '@/stores/drawerSlice'
import {
	CreateFacility,
	UpdateFacility,
	resetSelectedFacility,
} from '@/stores/facility'
import DynamicFormComponent from '@/components/DynamicForm'

// Function to build the validation schema from field configs
const buildValidationSchema = (fieldConfigs) => {
	const schema = fieldConfigs.reduce((acc, field) => {
		if (field.validation) {
			acc[field.name] = field.validation
		}
		return acc
	}, {})
	return Yup.object().shape(schema)
}

const FacilityAddEditDrawer = () => {
	const loading = useSelector((state) => state.facilities.detailLoading)
	const selectedFacility = useSelector(
		(state) => state.facilities.selectedFacility
	)
	const isEditMode = !!selectedFacility?.id
	const isDrawerOpen = useSelector((state) => state.drawer.isOpen)

	const dispatch = useDispatch()

	const initialValues = {
		name: '',
		facilityTypeId: '',
		contactNumber: '',
		image: '',
	}

	const validationSchema = buildValidationSchema(FacilityFieldConfigs)

	const formik = useFormik({
		initialValues: selectedFacility || initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			const payload = values
			const action = isEditMode ? UpdateFacility : CreateFacility
			const id = selectedFacility?.id ? selectedFacility.id : null

			if (isEditMode) {
				payload.id = id
			}
			console.log(payload)
			const response = await dispatch(action({ id, payload }))
			if (response.error) {
				message.error(response.payload.message)
			} else {
				message.success(response.payload.data.message)
				formik.resetForm()
				dispatch(resetSelectedFacility())
				dispatch(closeDrawer())
			}
		},
	})

	useEffect(() => {
		if (selectedFacility) {
			formik.setValues({
				name: selectedFacility?.name || '',
				facilityTypeId: selectedFacility?.facilityTypeId || '',
				contactNumber: selectedFacility?.contactNumber || '',
			})
		}
	}, [selectedFacility])

	const handleCloseDrawer = () => {
		dispatch(closeDrawer())
		dispatch(resetSelectedFacility())
		formik.resetForm()
	}

	const actionButton = (
		<Button
			type='danger'
			onClick={() => {
				console.log('Custom action button clicked')
			}}
		>
			Custom Action
		</Button>
	)

	return (
		<Drawer
			title={isEditMode ? 'Edit Facility' : 'Add Facility'}
			visible={isDrawerOpen}
			onClose={handleCloseDrawer}
			className='add-edit-drawer'
			width={720}
		>
			<DynamicFormComponent
				fieldConfigs={FacilityFieldConfigs}
				formik={formik}
				isLoading={loading === 'pending'}
				actionButton={actionButton}
				initialValues={selectedFacility || initialValues}
			/>
		</Drawer>
	)
}

export default FacilityAddEditDrawer
