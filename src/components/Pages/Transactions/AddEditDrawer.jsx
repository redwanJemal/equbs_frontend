/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Drawer, message } from '@/components'
import { useFormik } from 'formik'
import moment from 'moment'
import { TransactionFieldConfigs } from './config'
import { closeDrawer } from '@/stores/drawerSlice'
import {
	CreateTransaction,
	UpdateTransaction,
	resetSelectedTransaction,
} from '@/stores/transactions'
import DynamicFormComponent from '@/components/DynamicForm'
import { buildValidationSchema } from '@/utils/validationUtils'

const TransactionAddEditDrawer = () => {
	const loading = useSelector((state) => state.transactions.detailLoading)
	const selectedSubscriptionId = useSelector(
		(state) => state.transactions.selectedSubscriptionId
	)
	const selectedTransaction = useSelector(
		(state) => state.transactions.selectedTransaction
	)
	const isEditMode = !!selectedTransaction?.id
	const isDrawerOpen = useSelector((state) => state.drawer.isOpen)

	const dispatch = useDispatch()

	const initialValues = {
		subscriptionId: selectedSubscriptionId || '',
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
				amount: selectedTransaction?.amount || '',
				mode: selectedTransaction?.mode || '',
				transactionNumber: selectedTransaction?.transactionNumber || '',
				date: moment(selectedTransaction?.date),
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
				fieldConfigs={TransactionFieldConfigs.filter(
					(field) => field.id !== 'subscriptionId'
				)} // Filter out subscriptionId field
				formik={formik}
				isLoading={loading === 'pending'}
				actionButton={actionButton}
				initialValues={selectedTransaction || initialValues}
			/>
			{selectedSubscriptionId && (
				<input
					type='hidden'
					name='subscriptionId'
					value={selectedSubscriptionId}
					onChange={formik.handleChange}
				/>
			)}
		</Drawer>
	)
}

export default TransactionAddEditDrawer
