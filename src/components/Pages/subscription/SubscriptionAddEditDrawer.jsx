/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Drawer, message } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { SubscriptionFieldConfigs } from './config'
import { closeDrawer } from '@/stores/drawerSlice'
import {
	CreateSubscription,
	UpdateSubscription,
	resetSelectedSubscription,
} from '@/stores/subscription'
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

const SubscriptionAddEditDrawer = () => {
	const loading = useSelector((state) => state.equbSubscription.detailLoading)
	const selectedSubscription = useSelector(
		(state) => state.equbSubscription.selectedSubscription
	)
	const isEditMode = !!selectedSubscription?.id
	const isDrawerOpen = useSelector((state) => state.drawer.isOpen)

	const dispatch = useDispatch()

	const initialValues = {
		userId: '',
		equbId: '',
		startDate: '',
		rotation: '',
		timeline: 0,
		amount: 0,
	}

	const validationSchema = buildValidationSchema(SubscriptionFieldConfigs)

	const formik = useFormik({
		initialValues: selectedSubscription || initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			const payload = values
			const action = isEditMode ? UpdateSubscription : CreateSubscription
			const id = selectedSubscription?.id ? selectedSubscription.id : null

			if (isEditMode) {
				payload.id = id
			}

			const response = await dispatch(action({ id, payload }))
			if (response.error) {
				if (response?.payload?.code == 'Subscription.AlreadyExists') {
					return message.error(`User has already subscribed to this equb`)
				}
				message.error(
					`Failed to ${isEditMode ? 'Update' : 'Create'} Subscription`
				)
			} else {
				message.success(
					`Succedded on ${isEditMode ? 'Updating' : 'Creating'} Subscription`
				)
				formik.resetForm()
				dispatch(resetSelectedSubscription())
				dispatch(closeDrawer())
			}
		},
	})

	useEffect(() => {
		if (selectedSubscription) {
			formik.setValues({
				userId: selectedSubscription?.userId || '',
				equbId: selectedSubscription?.equbId || '',
				startDate: selectedSubscription?.startDate || '',
				rotation: selectedSubscription?.rotation || '',
				timeline: selectedSubscription?.timeline || 0,
			})
		}
	}, [selectedSubscription])

	const handleCloseDrawer = () => {
		dispatch(closeDrawer())
		dispatch(resetSelectedSubscription())
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
			title={isEditMode ? 'Edit Subscription' : 'Add Subscription'}
			visible={isDrawerOpen}
			onClose={handleCloseDrawer}
			className='add-edit-drawer'
			width={720}
		>
			<DynamicFormComponent
				fieldConfigs={SubscriptionFieldConfigs}
				formik={formik}
				isLoading={loading === 'pending'}
				actionButton={actionButton}
				initialValues={selectedSubscription || initialValues}
			/>
		</Drawer>
	)
}

export default SubscriptionAddEditDrawer
