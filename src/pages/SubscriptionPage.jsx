/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '@/components'
import { openDrawer } from '@/stores/drawerSlice'
import {
	// GetSubscriptionById,
	// ReactivateSubscription,
	setSubscriptionQueryParameters,
} from '@/stores/subscription'
import DataTable from '@/components/DynamicTable/DataTable'
import { subscriptionColumnsConfig } from '@/components/Pages/subscription/config'
import SubscriptionAddEditDrawer from '@/components/Pages/subscription/SubscriptionAddEditDrawer'
import SubscriptionTableView from '@/components/Pages/subscription/SubscriptionTableView'
import { buildQueryString } from '@/utils/buildQueryString'
import { useNavigate } from 'react-router-dom'

const SubscriptionPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [selectedData, setSelectedData] = useState(null)

	// Get userId from URL query parameters
	const params = new URLSearchParams(location.search)
	const userId = params.get('userId')

	useEffect(() => {
		// Dispatch the setSubscriptionQueryParameters action on initial load
		dispatch(
			setSubscriptionQueryParameters({
				page: 1,
				pageSize: 10,
				filters: {
					userId: userId,
					isCompleted: false,
				},
			})
		)
	}, [dispatch, userId])

	const { subscriptions, loading, meta, highlightedRowId, queryParameters } =
		useSelector((state) => state.equbSubscription)
	const isOpenDrawer = useSelector((state) => state.drawer.isOpen)

	const handleDetail = async (id) => {
		// console.log('Detail for ID is:', id)
		// const response = await dispatch(GetSubscriptionById({ id }))
		// if (!response.error) {
		// 	setSelectedData(response.payload.data.data)
		// 	dispatch(openDrawer())
		// } else {
		// 	message.error('Failed to get subscription detail')
		// }
	}

	const handleDelete = async (id) => {
		// console.log('Delete ID:', id)
		// const response = await dispatch(DeleteSubscription(id))
		// if (response?.payload?.status == 204) {
		// 	message.success('Subscription Deactivation success')
		// } else {
		// 	message.error('Subscription Deactivation Failed')
		// }
	}

	const handleRactivation = async (id) => {
		// console.log('reactivate subscription with id =>', id)
		// const response = await dispatch(ReactivateSubscription(id))
		// if (response?.payload?.status == 204) {
		// 	message.success('Subscription Reactivation success')
		// } else {
		// 	message.error('Subscription Reactivation Failed')
		// }
		// console.log(response)
	}

	const confirmDeletion = (id) => {
		Modal.confirm({
			title: 'Are you sure you want to deactivate this subscription?',
			content: 'This action cannot be undone.',
			onOk: () => handleDelete(id),
			onCancel: () => console.log('Deactivation cancelled'),
		})
	}

	const confirmReactivation = (id) => {
		Modal.confirm({
			title: 'Are you sure you want to reactivate this subscription?',
			content: 'This action cannot be undone.',
			onOk: () => handleRactivation(id),
			onCancel: () => console.log('Reactivation cancelled'),
		})
	}

	const onFilterApply = (item) => {
		console.log('Filter applied:', item)
	}

	const confirmBulkDeletion = (selectedItems) => {
		Modal.confirm({
			title: 'Are you sure you want to delete these subscriptions?',
			content: 'This action cannot be undone.',
			onOk: () => handleBulkDelete(selectedItems),
			onCancel: () => console.log('Bulk deletion cancelled'),
		})
	}

	const handleBulkDelete = (selectedItems) => {
		console.log('bulk delete,', selectedItems)
	}

	const onActionSelected = (action, selectedItems) => {
		if (action === 'delete') {
			confirmBulkDeletion(selectedItems)
		}
	}

	const onSortApply = (value) => {
		console.log('Sort applied:', value)
	}

	const handleRedirect = (subscriptionId) => {
		navigate(`/transactions?subscriptionId=${subscriptionId}`)
	}

	const handleSearch = (searchValue) => {
		console.log('Search value:', searchValue)
		dispatch(
			setSubscriptionQueryParameters({
				...queryParameters,
				term: searchValue,
			})
		)
	}

	const onPaginateApply = async (newPageNumber) => {
		dispatch(
			setSubscriptionQueryParameters({
				...queryParameters,
				page: newPageNumber,
			})
		)
	}

	return (
		<>
			<DataTable
				pageId={'subscriptions'}
				data={subscriptions}
				config={SubscriptionTableView({
					list: subscriptions,
					onDelete: confirmDeletion,
					onDetail: handleDetail,
					onRedirect: handleRedirect,
				})}
				columnsConfig={subscriptionColumnsConfig}
				handleSearch={handleSearch}
				handleDetail={handleDetail}
				handleDelete={confirmDeletion}
				confirmDeletion={confirmDeletion}
				onPaginate={onPaginateApply}
				meta={meta}
				loading={loading}
				openDrawer={isOpenDrawer}
				setOpenDrawer={() => dispatch(openDrawer())}
				selectedData={selectedData}
				actionOptions={[
					{ name: 'Delete', value: 'delete' },
					{ name: 'Detail', value: 'detail' },
				]}
				filterOptions={[
					{ name: 'User', value: 'user' },
					{ name: 'Equb', value: 'equb' },
				]}
				sortOptions={[
					{ name: 'Start Date Ascending', value: 'start_date_asc' },
					{ name: 'Start Date Descending', value: 'start_date_desc' },
				]}
				onActionSelected={onActionSelected}
				onFilterApply={onFilterApply}
				onSortApply={onSortApply}
				title={'Subscriptions'}
				highlightedRowId={highlightedRowId}
				DrawerComponent={SubscriptionAddEditDrawer}
			/>
		</>
	)
}

export default SubscriptionPage
