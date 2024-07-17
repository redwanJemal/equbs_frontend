/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Drawer, message } from '@/components'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { TransactionFieldConfigs } from './config'
import { closeDrawer } from '@/stores/drawerSlice'
import {
	CreateTransaction,
	UpdateTransaction,
	resetSelectedTransaction,
} from '@/stores/transactions'
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

const TransactionAddEditDrawer = () => {
	const loading = useSelector((state) => state.transactions.detailLoading)
	const selectedTransaction = useSelector(
		(state) => state.transactions.selectedTransaction
	)
	const isEditMode = !!selectedTransaction?.id
	const isDrawerOpen = useSelector((state) => state.drawer.isOpen)

	const dispatch = useDispatch()

	const initialValues = {
		subscriptionId: '',
		date: '',
		amount: '',
		mode: '',
		transactionNumber: '',
		bankAccount: '',
	}

	const validationSchema = buildValidationSchema(TransactionFieldConfigs)

	const formik = useFormik({
		initialValues: selectedTransaction || initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			// Convert date to UTC before sending
			const payload = {
				...values,
				date: values.date ? moment(values.date).utc().format() : '',
			}

			const action = isEditMode ? UpdateTransaction : CreateTransaction
			const id = selectedTransaction?.id ? selectedTransaction.id : null

			if (isEditMode) {
				payload.id = id
			}
			const response = await dispatch(action({ id, payload }))
			if (response.error) {
				message.error(
					`Failed to ${isEditMode ? 'Update' : 'Create'} Transaction`
				)
			} else {
				message.success(
					`Succeeded on ${isEditMode ? 'Updating' : 'Creating'} Transaction`
				)
				formik.resetForm()
				dispatch(resetSelectedTransaction())
				dispatch(closeDrawer())
			}
		},
	})

	useEffect(() => {
		if (selectedTransaction) {
			formik.setValues({
				subscriptionId: selectedTransaction?.subscriptionId || '',
				// date: selectedTransaction?.date || '',
				amount: selectedTransaction?.amount || '',
				mode: selectedTransaction?.mode || '',
				transactionNumber: selectedTransaction?.transactionNumber || '',
				bankAccount: selectedTransaction?.bankAccount || '',
			})
		}
	}, [selectedTransaction])

	const handleCloseDrawer = () => {
		dispatch(closeDrawer())
		dispatch(resetSelectedTransaction())
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
			title={isEditMode ? 'Edit Transaction' : 'Add Transaction'}
			visible={isDrawerOpen}
			onClose={handleCloseDrawer}
			className='add-edit-drawer'
			width={720}
		>
			<DynamicFormComponent
				fieldConfigs={TransactionFieldConfigs}
				formik={formik}
				isLoading={loading === 'pending'}
				actionButton={actionButton}
				initialValues={selectedTransaction || initialValues}
			/>
		</Drawer>
	)
}

export default TransactionAddEditDrawer
