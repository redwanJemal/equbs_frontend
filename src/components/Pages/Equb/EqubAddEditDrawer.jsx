/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Drawer, message } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { EqubFieldConfigs } from './config'
import { closeDrawer } from '@/stores/drawerSlice'
import { createEqub, updateEqub, resetSelectedEqub } from '@/stores/equbs'
import DynamicFormComponent from '@/components/DynamicForm'
import moment from 'moment'

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

const EqubAddEditDrawer = () => {
	const loading = useSelector((state) => state.equbs.loading)
	const selectedEqub = useSelector((state) => state.equbs.selectedEqub)
	const isEditMode = !!selectedEqub?.id
	const isDrawerOpen = useSelector((state) => state.drawer.isOpen)

	const dispatch = useDispatch()

	const initialValues = {
		name: '',
		description: '',
		commissionRate: 0,
	}

	const validationSchema = buildValidationSchema(EqubFieldConfigs)

	const formik = useFormik({
		initialValues: selectedEqub || initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			const payload = values

			console.log(payload)
			const action = isEditMode ? updateEqub : createEqub
			const id = selectedEqub?.id ? selectedEqub.id : null

			if (isEditMode) {
				payload.id = id
			}
			const response = await dispatch(action({ id, payload }))
			if (response.error) {
				message.error(`Failed to ${isEditMode ? 'Update' : 'Create'} Equb`)
			} else {
				message.success(
					`Succeeded in ${isEditMode ? 'Updating' : 'Creating'} Equb`
				)
				formik.resetForm()
				dispatch(resetSelectedEqub())
				dispatch(closeDrawer())
			}
		},
	})

	useEffect(() => {
		if (selectedEqub) {
			formik.setValues({
				name: selectedEqub?.name || '',
				description: selectedEqub?.description || '',
				commissionRate: selectedEqub?.commissionRate || 0,
			})
		}
	}, [selectedEqub])

	const handleCloseDrawer = () => {
		dispatch(closeDrawer())
		dispatch(resetSelectedEqub())
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
			title={isEditMode ? 'Edit Equb' : 'Add Equb'}
			visible={isDrawerOpen}
			onClose={handleCloseDrawer}
			className='add-edit-drawer'
			width={720}
		>
			<DynamicFormComponent
				fieldConfigs={EqubFieldConfigs}
				formik={formik}
				isLoading={loading === 'pending'}
				actionButton={actionButton}
				initialValues={selectedEqub || initialValues}
			/>
		</Drawer>
	)
}

export default EqubAddEditDrawer
