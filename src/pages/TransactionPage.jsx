/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, message } from '@/components'
import { openDrawer } from '@/stores/drawerSlice'
import {
	ApproveTransaction,
	DeleteTransaction,
	GetTransactionById,
	ReactivateTransaction,
	resetSelectedTransactionId,
	setSelectedTransactionId,
	setTransactionQueryParameters,
} from '@/stores/transactions'
import DataTable from '@/components/DynamicTable/DataTable'
import TransactionTableView from '@/components/Pages/Transactions/tableView'
import { transactionColumnsConfig } from '@/components/Pages/Transactions/config'
import TransactionAddEditDrawer from '@/components/Pages/Transactions/AddEditDrawer'

const TransactionPage = () => {
	const dispatch = useDispatch()
	const [selectedData, setSelectedData] = useState(null)

	const params = new URLSearchParams(location.search)
	const subscriptionId = params.get('subscriptionId')

	useEffect(() => {
		// Dispatch the setTransactionQueryParameters action on initial load
		if (subscriptionId) {
			dispatch(setSelectedTransactionId(subscriptionId))
		} else {
			dispatch(resetSelectedTransactionId())
		}
		dispatch(
			setTransactionQueryParameters({
				page: 1,
				pageSize: 10,
				filters: {
					subscriptionId: subscriptionId,
				},
			})
		)
	}, [dispatch, subscriptionId])

	const { transactions, loading, meta, highlightedRowId, queryParameters } =
		useSelector((state) => state.transactions)
	const isOpenDrawer = useSelector((state) => state.drawer.isOpen)

	const handleDetail = async (id) => {
		console.log('Detail for ID is:', id)
		const response = await dispatch(GetTransactionById({ id }))
		if (!response.error) {
			console.log(response?.payload?.data)
			setSelectedData(response.payload.data)
			dispatch(openDrawer())
		} else {
			message.error('Failed to get transaction detail')
		}
	}

	const handleDelete = async (id) => {
		console.log('Delete ID:', id)
		const response = await dispatch(DeleteTransaction(id))
		if (response?.payload?.status == 204) {
			message.success('Transaction Deactivation success')
		} else {
			message.error('Transaction Deactivation Failed')
		}
	}

	const handleApproval = async (id) => {
		console.log('approve transaction with id =>', id)
		const response = await dispatch(ApproveTransaction(id))
		if (response?.payload?.status == 204) {
			message.success('Transaction Approval success')
		} else {
			message.error('Transaction Approval Failed')
		}
		console.log(response)
	}

	const confirmDeletion = (id) => {
		Modal.confirm({
			title: 'Are you sure you want to deactivate this transaction?',
			content: 'This action cannot be undone.',
			onOk: () => handleDelete(id),
			onCancel: () => console.log('Deactivation cancelled'),
		})
	}

	const confirmApproval = (id) => {
		Modal.confirm({
			title: 'Are you sure you want to approve this transaction?',
			content: 'This action cannot be undone.',
			onOk: () => handleApproval(id),
			onCancel: () => console.log('Approve cancelled'),
		})
	}

	const onFilterApply = (item) => {
		console.log('Filter applied:', item)
	}

	const confirmBulkDeletion = (selectedItems) => {
		Modal.confirm({
			title: 'Are you sure you want to delete these transactions?',
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

	const handleSearch = (searchValue) => {
		console.log('Search value:', searchValue)
		dispatch(
			setTransactionQueryParameters({
				...queryParameters,
				term: searchValue,
			})
		)
	}

	const onPaginateApply = async (newPageNumber) => {
		dispatch(
			setTransactionQueryParameters({
				...queryParameters,
				page: newPageNumber,
			})
		)
	}

	return (
		<>
			<DataTable
				pageId={'transactions'}
				data={transactions}
				config={TransactionTableView({
					list: transactions,
					onDelete: confirmDeletion,
					onDetail: handleDetail,
					onApprove: confirmApproval,
				})}
				columnsConfig={transactionColumnsConfig}
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
					{ name: 'Listing Type', value: 'listing_type' },
					{ name: 'Availability', value: 'availability' },
				]}
				sortOptions={[
					{ name: 'Name Ascending', value: 'name_asc' },
					{ name: 'Name Descending', value: 'name_desc' },
				]}
				onActionSelected={onActionSelected}
				onFilterApply={onFilterApply}
				onSortApply={onSortApply}
				title={'Transactions'}
				highlightedRowId={highlightedRowId}
				DrawerComponent={TransactionAddEditDrawer}
				showAdd={subscriptionId}
			/>
		</>
	)
}

export default TransactionPage
