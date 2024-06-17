/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, message } from 'antd'
import { openDrawer } from '@/stores/drawerSlice'
import DataTable from '@/components/DynamicTable/DataTable'
import referralOutTableView from '@/components/Pages/Referal/tableView'
import ReferralOutAddEditDrawer from '@/components/Pages/Referal/referral-addEdit'
import { referralOutColumnsConfig } from '@/components/Pages/Referal/config'
import { setReferralQueryParameters } from '@/stores/referrals'
import { SAMPLE_FACILITY_ID } from '@/constants/apiUrls'

const ReferralOutPage = () => {
	const dispatch = useDispatch()
	const [selectedData, setSelectedData] = useState(null)

	useEffect(() => {
		// Dispatch the setQueryParameters action on initial load
		dispatch(
			setReferralQueryParameters({
				page: 1,
				pageSize: 10,
				filters: { facilityId: SAMPLE_FACILITY_ID },
			})
		)
	}, [dispatch])

	const { referralOuts, loading, meta, highlightedRowId, queryParameters } =
		useSelector((state) => state.referrals)
	const [filteredData, setFilteredData] = useState(referralOuts)
	const isOpenDrawer = useSelector((state) => state.drawer.isOpen)
	const [modalOpen, setModalOpen] = useState(false)

	const handleDetail = async (id) => {
		console.log('Detail for ID is:', id)
		const response = await dispatch(GetFacilityById({ id }))
		if (!response.error) {
			setSelectedData(response.payload.data.data)
			dispatch(openDrawer())
		} else {
			message.error('Failed to get facility detail')
		}
	}

	const handleFeedback = async (id) => {
		setModalOpen(true)
	}

	const handleDelete = async (id) => {
		console.log('Delete ID:', id)
		const response = await dispatch(DeleteFacility(id))
		if (response?.payload?.status == 204) {
			message.success('Facility Deactivation success')
		} else {
			message.error('Facility Deactivation Failed')
		}
	}

	const handleReactivation = async (id) => {
		console.log('reactivate facility with id =>', id)
		const response = await dispatch(ReactivateFacility(id))
		if (response?.payload?.status == 204) {
			message.success('Facility Reactivation success')
		} else {
			message.error('Facility Reactivation Failed')
		}
		console.log(response)
	}

	const confirmDeletion = (id) => {
		Modal.confirm({
			title: 'Are you sure you want to delete this facility?',
			content: 'This action cannot be undone.',
			onOk: () => handleDelete(id),
			onCancel: () => console.log('Deletion cancelled'),
		})
	}

	const confirmReactivation = (id) => {
		Modal.confirm({
			title: 'Are you sure you want to reactivate this facility?',
			content: 'This action cannot be undone.',
			onOk: () => handleReactivation(id),
			onCancel: () => console.log('reactivate cancelled'),
		})
	}

	const onFilterApply = (filters) => {
		// const filtered = referrals.filter(
		// 	(item) =>
		// 		(filters.categories.length === 0 ||
		// 			filters.categories.includes(
		// 				item.referralTypeId === 1 ? 'Cold' : 'Emergency'
		// 			)) &&
		// 		(filters.statuses.length === 0 ||
		// 			filters.statuses.includes(item.status))
		// )
		// setFilteredData(filtered)
		// setQueryParameters((prev) => ({
		// 	...prev,
		// 	filters,
		// }))
	}

	const confirmBulkDeletion = (selectedItems) => {
		Modal.confirm({
			title: 'Are you sure you want to delete these facilities?',
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
	}

	const onPaginateApply = async (newPageNumber) => {
		console.log('Paginate to page:', newPageNumber)
		setQueryParameters({
			...queryParameters,
			page: newPageNumber,
		})
	}

	const filterOptions = {
		categories: ['Cold', 'Emergency'],
		statuses: ['Pending', 'Accepted', 'Rejected'],
	}

	return (
		<>
			<DataTable
				addText={'Create Referral'}
				pageId={'referralOuts'}
				data={filteredData}
				config={referralOutTableView({
					list: filteredData,
					onFeedback: handleFeedback,
					onDetail: handleDetail,
					onReactivate: confirmReactivation,
				})}
				columnsConfig={referralOutColumnsConfig}
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
				filterOptions={filterOptions}
				sortOptions={[
					{ name: 'Name Ascending', value: 'name_asc' },
					{ name: 'Name Descending', value: 'name_desc' },
				]}
				onActionSelected={onActionSelected}
				onFilterApply={onFilterApply}
				onSortApply={onSortApply}
				title={'Referral Outs'}
				highlightedRowId={highlightedRowId}
				DrawerComponent={ReferralOutAddEditDrawer}
			/>
			<Modal
				title='Feedback'
				centered
				open={modalOpen}
				onOk={() => setModalOpen(false)}
				onCancel={() => setModalOpen(false)}
				width={1000}
			>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Modal>
		</>
	)
}

export default ReferralOutPage
