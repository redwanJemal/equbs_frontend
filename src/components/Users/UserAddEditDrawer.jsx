/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Drawer, message } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { UserFieldConfigs } from './config'
import DynamicFormComponent from '../DynamicForm'
import { CreateUser, UpdateUser, resetSelectedUser } from '@/stores/users'
import { closeDrawer } from '@/stores/drawerSlice'

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

const UserAddEditDrawer = () => {
	const loading = useSelector((state) => state.users.detailLoading)
	const selectedUser = useSelector((state) => state.users.selectedUser)
	const isEditMode = !!selectedUser?.id
	const isDrawerOpen = useSelector((state) => state.drawer.isOpen)

	const dispatch = useDispatch()

	const initialValues = {
		userName: '',
		birthdate: '',
		password: '',
		email: '',
		isActive: '',
		facilityId: '',
		phoneNumber: '',
	}

	const validationSchema = buildValidationSchema(UserFieldConfigs)

	const formik = useFormik({
		initialValues: selectedUser || initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			const payload = values
			const action = isEditMode ? UpdateUser : CreateUser
			const id = selectedUser?.id ? selectedUser.id : null

			const response = await dispatch(action({ id, payload }))
			if (response.error) {
				message.error(response.payload.message)
			} else {
				message.success(response.payload.data.message)
				formik.resetForm()
				dispatch(resetSelectedUser())
				dispatch(closeDrawer())
			}
		},
	})

	useEffect(() => {
		if (selectedUser) {
			formik.setValues({
				userName: selectedUser?.userName || '',
				password: selectedUser?.password || '',
				email: selectedUser?.email || '',
				isActive: selectedUser?.isActive ? 'true' : 'false',
				facilityId: selectedUser?.facility?.id || '',
				phoneNumber: selectedUser?.phoneNumber || '',
			})
		}
	}, [selectedUser])

	const handleCloseDrawer = () => {
		dispatch(closeDrawer())
		dispatch(resetSelectedUser())
		formik.resetForm()
	}

	const actionButton = (
		<Button
			type='danger'
			onClick={() => {
				// Custom action for the button
				console.log('Custom action button clicked')
			}}
		>
			Custom Action
		</Button>
	)

	return (
		<Drawer
			title={isEditMode ? 'Edit User' : 'Add User'}
			visible={isDrawerOpen}
			onClose={handleCloseDrawer}
			className='add-edit-drawer'
			width={720}
		>
			<DynamicFormComponent
				fieldConfigs={UserFieldConfigs}
				formik={formik}
				isLoading={loading === 'pending'}
				actionButton={actionButton}
				initialValues={selectedUser || initialValues} // Pass initial values to the form
			/>
		</Drawer>
	)
}

export default UserAddEditDrawer
