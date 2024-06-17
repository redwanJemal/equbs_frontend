/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, message } from 'antd'
import { buildQueryString } from '@/utils/buildQueryString'
import { openDrawer } from '@/stores/drawerSlice'
import {
	DeleteFacility,
	GetAllFacilities,
	GetFacilityById,
	ReactivateFacility,
} from '@/stores/facility'
import DataTable from '@/components/DynamicTable/DataTable'
import { referralOutColumnsConfig } from '@/components/Pages/Referal/config'
import ReferralInDetail from '@/components/Pages/ReferralIn/referral-addEdit'
import referralInTableView from '@/components/Pages/ReferralIn/tableView'
import { setReferralInQueryParameters } from '@/stores/referrals'
import { SAMPLE_FACILITY_ID } from '@/constants/apiUrls'

const ReferraInPage = () => {
	const dispatch = useDispatch()
	const [selectedData, setSelectedData] = useState(null)

	useEffect(() => {
		// Dispatch the setQueryParameters action on initial load
		dispatch(
			setReferralInQueryParameters({
				page: 1,
				pageSize: 10,
				filters: { facilityId: SAMPLE_FACILITY_ID },
			})
		)
	}, [dispatch])

	const { referralIns, queryParameters, loading, meta, highlightedRowId } =
		useSelector((state) => state.referrals)

	const isOpenDrawer = useSelector((state) => state.drawer.isOpen)

	const handleDetail = async (id) => {
		console.log('Detail for ID is:', id)
		dispatch(openDrawer())

		// const response = await dispatch(GetFacilityById({ id }))
		// if (!response.error) {
		// 	setSelectedData(response.payload.data.data)
		// 	dispatch(openDrawer())
		// } else {
		// 	message.error('Failed to get facility detail')
		// }
	}

	const handleDelete = async (id) => {
		console.log('Delete ID:', id)
		const response = await dispatch(DeleteFacility(id))
		if (response?.payload?.status == 204) {
			message.success('Facility Diactivation success')
		} else {
			message.error('Facility Diactivation Failed')
		}
	}

	const handleRactivation = async (id) => {
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
			onOk: () => handleRactivation(id),
			onCancel: () => console.log('reactivate cancelled'),
		})
	}

	const onFilterApply = (item) => {
		console.log('Filter applied:', item)
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
		setReferralInQueryParameters({
			...queryParameters,
			page: newPageNumber,
		})
	}

	return (
		<>
			<DataTable
				pageId={'referralIns'}
				data={referralIns}
				config={referralInTableView({
					list: referralIns,
					onDelete: confirmDeletion,
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
				filterOptions={[
					{ name: 'Listing Type', value: 'listing_type' },
					{ name: 'Availability', value: 'availability' },
				]}
				onActionSelected={onActionSelected}
				onFilterApply={onFilterApply}
				onSortApply={onSortApply}
				title={'Referral Ins'}
				showAdd={false}
				highlightedRowId={highlightedRowId}
				DrawerComponent={ReferralInDetail}
			/>
		</>
	)
}

export default ReferraInPage
