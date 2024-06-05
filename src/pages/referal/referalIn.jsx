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
import { facilityColumnsConfig } from '@/components/Pages/Facility/config'
import DataTable from '@/components/DynamicTable/DataTable'
import referralOutTableView from '@/components/Pages/Referal/tableView'
import ReferralOutAddEditDrawer from '@/components/Pages/Referal/referral-addEdit'
import { referralOutColumnsConfig } from '@/components/Pages/Referal/config'
import ReferralInDetail from '@/components/Pages/ReferralIn/referral-addEdit'
import referralInTableView from '@/components/Pages/ReferralIn/tableView'

const sampleData = [
	{
		facilityName: 'Addis Ababa Health Center',
		firstName: 'Alemu',
		lastName: 'Gebre',
		cardNumber: '12345',
		referralTypeId: 1,
		reasonForReferral: 'Routine Checkup',
		status: 'Pending',
	},
	{
		facilityName: 'Gondar General Hospital',
		firstName: 'Fatima',
		lastName: 'Mohammed',
		cardNumber: '67890',
		referralTypeId: 2,
		reasonForReferral: 'Emergency Surgery',
		status: 'Accepted',
	},
	{
		facilityName: 'Bahir Dar Clinic',
		firstName: 'Hassan',
		lastName: 'Ahmed',
		cardNumber: '54321',
		referralTypeId: 1,
		reasonForReferral: 'Follow-up Visit',
		status: 'Rejected',
	},
	{
		facilityName: 'Adama Medical Center',
		firstName: 'Sara',
		lastName: 'Ali',
		cardNumber: '98765',
		referralTypeId: 2,
		reasonForReferral: 'Severe Injury',
		status: 'Pending',
	},
	{
		facilityName: 'Mekele Health Institute',
		firstName: 'Abdi',
		lastName: 'Nur',
		cardNumber: '11223',
		referralTypeId: 1,
		reasonForReferral: 'Regular Checkup',
		status: 'Accepted',
	},
	{
		facilityName: 'Hawassa Regional Hospital',
		firstName: 'Muna',
		lastName: 'Ibrahim',
		cardNumber: '44556',
		referralTypeId: 2,
		reasonForReferral: 'Accident',
		status: 'Rejected',
	},
	{
		facilityName: 'Jimma Health Center',
		firstName: 'Yusuf',
		lastName: 'Mohammed',
		cardNumber: '33445',
		referralTypeId: 1,
		reasonForReferral: 'Routine Checkup',
		status: 'Pending',
	},
	{
		facilityName: 'Dire Dawa Clinic',
		firstName: 'Leyla',
		lastName: 'Ahmed',
		cardNumber: '55667',
		referralTypeId: 2,
		reasonForReferral: 'Severe Illness',
		status: 'Accepted',
	},
	{
		facilityName: 'Harar General Hospital',
		firstName: 'Aisha',
		lastName: 'Ali',
		cardNumber: '77889',
		referralTypeId: 1,
		reasonForReferral: 'Pregnancy Checkup',
		status: 'Rejected',
	},
	{
		facilityName: 'Awassa Health Center',
		firstName: 'Omar',
		lastName: 'Abdullah',
		cardNumber: '99000',
		referralTypeId: 2,
		reasonForReferral: 'Emergency Case',
		status: 'Pending',
	},
]

const ReferraInPage = () => {
	const [queryParameters, setQueryParameters] = useState({
		page: 1,
		limit: 10,
		filters: {},
		include: 'facilityType',
		term: '',
		sortBy: '',
		sortOrder: '',
	})
	const dispatch = useDispatch()
	const [selectedData, setSelectedData] = useState(null)

	useEffect(() => {
		dispatch(GetAllFacilities(buildQueryString(queryParameters)))
	}, [dispatch, queryParameters])

	const { facilities, loading, meta, highlightedRowId } = useSelector(
		(state) => state.facilities
	)
	const isOpenDrawer = useSelector((state) => state.drawer.isOpen)

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
		setQueryParameters({
			...queryParameters,
			page: newPageNumber,
		})
	}

	return (
		<>
			<DataTable
				pageId={'referralIns'}
				data={sampleData}
				config={referralInTableView({
					list: sampleData,
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
				title={'Referral Ins'}
				highlightedRowId={highlightedRowId}
				DrawerComponent={ReferralInDetail}
			/>
		</>
	)
}

export default ReferraInPage
