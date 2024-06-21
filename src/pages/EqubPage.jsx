/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, message } from 'antd'
import { openDrawer } from '@/stores/drawerSlice'
import { getEqubById, setEqubQueryParameters } from '@/stores/equbs'
import { equbColumnsConfig } from '@/components/Pages/Equb/config'
import EqubAddEditDrawer from '@/components/Pages/Equb/EqubAddEditDrawer'
import DataTable from '@/components/DynamicTable/DataTable'
import EqubTableView from '@/components/Pages/Equb/EqubTableView'

const EqubPage = () => {
	const dispatch = useDispatch()
	const [selectedData, setSelectedData] = useState(null)

	useEffect(() => {
		// Dispatch the setEqubQueryParameters action on initial load
		dispatch(setEqubQueryParameters({ page: 1, pageSize: 10 }))
	}, [dispatch])

	const { equbs, loading, meta, highlightedRowId, queryParameters } =
		useSelector((state) => state.equbs)
	const isOpenDrawer = useSelector((state) => state.drawer.isOpen)

	const handleDetail = async (id) => {
		console.log('Detail for ID is:', id)
		const response = await dispatch(getEqubById({ id }))
		if (!response.error) {
			setSelectedData(response.payload.data.data)
			dispatch(openDrawer())
		} else {
			message.error('Failed to get equb detail')
		}
	}

	const handleDelete = async (id) => {
		// console.log('Delete ID:', id)
		// const response = await dispatch(deleteEqub(id))
		// if (response?.payload?.status == 204) {
		// 	message.success('Equb Deactivation success')
		// } else {
		// 	message.error('Equb Deactivation Failed')
		// }
	}

	const handleRactivation = async (id) => {
		// console.log('reactivate equb with id =>', id)
		// const response = await dispatch(reactivateEqub(id))
		// if (response?.payload?.status == 204) {
		// 	message.success('Equb Reactivation success')
		// } else {
		// 	message.error('Equb Reactivation Failed')
		// }
		// console.log(response)
	}

	const confirmDeletion = (id) => {
		Modal.confirm({
			title: 'Are you sure you want to deactivate this equb?',
			content: 'This action cannot be undone.',
			onOk: () => handleDelete(id),
			onCancel: () => console.log('Deactivation cancelled'),
		})
	}

	const confirmReactivation = (id) => {
		Modal.confirm({
			title: 'Are you sure you want to reactivate this equb?',
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
			title: 'Are you sure you want to delete these equbs?',
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
			setEqubQueryParameters({
				...queryParameters,
				term: searchValue,
			})
		)
	}

	const onPaginateApply = async (newPageNumber) => {
		dispatch(
			setEqubQueryParameters({
				...queryParameters,
				page: newPageNumber,
			})
		)
	}

	return (
		<>
			<DataTable
				pageId={'equbs'}
				data={equbs}
				config={EqubTableView({
					list: equbs,
					onDelete: confirmDeletion,
					onDetail: handleDetail,
					onReactivate: confirmReactivation,
				})}
				columnsConfig={equbColumnsConfig}
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
				title={'Equbs'}
				highlightedRowId={highlightedRowId}
				DrawerComponent={EqubAddEditDrawer}
			/>
		</>
	)
}

export default EqubPage
