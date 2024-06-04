/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, message } from 'antd'
import DataTable from '@/components/DynamicTable/DataTable'
import tableView from '@/components/Users/tableView'
import { userColumnsConfig } from '@/components/Users/config'
import { DeleteUser, GetAllUsers, GetUserById } from '@/stores/users'
import { buildQueryString } from '@/utils/buildQueryString'
import UserAddEditDrawer from '@/components/Users/UserAddEditDrawer'
import { openDrawer } from '@/stores/drawerSlice'

const UsersPage = () => {
	const [queryParameters, setQueryParameters] = useState({
		page: 1,
		limit: 10,
		filters: {},
		include: 'roles,permission',
		term: '',
		sortBy: '',
		sortOrder: '',
	})
	const dispatch = useDispatch()
	const [selectedData, setSelectedData] = useState(null)

	useEffect(() => {
		dispatch(GetAllUsers(buildQueryString(queryParameters)))
	}, [dispatch, queryParameters])

	const { users, loading, meta, highlightedRowId } = useSelector(
		(state) => state.users
	)

	const isOpenDrawer = useSelector((state) => state.drawer.isOpen)

	const handleDetail = async (id) => {
		const response = await dispatch(GetUserById({ id }))
		if (!response.error) {
			setSelectedData(response.payload.data.data)
			dispatch(openDrawer())
		} else {
			message.error('Failed to get user detail')
		}
	}

	const handleDelete = async (id) => {
		console.log('Delete ID:', id)
		const response = await dispatch(DeleteUser(id))
		if (!response.error) {
			message.success('User deleted successfully')
			dispatch(GetAllUsers(buildQueryString(queryParameters)))
		} else {
			message.error('Failed to delete user')
		}
	}

	const confirmDeletion = (id) => {
		Modal.confirm({
			title: 'Are you sure you want to delete this user?',
			content: 'This action cannot be undone.',
			onOk: () => handleDelete(id),
			onCancel: () => console.log('Deletion cancelled'),
		})
	}

	const onFilterApply = (item) => {
		console.log('Filter applied:', item)
	}

	const confirmBulkDeletion = (selectedItems) => {
		Modal.confirm({
			title: 'Are you sure you want to delete these users?',
			content: 'This action cannot be undone.',
			onOk: () => handleBulkDelete(selectedItems),
			onCancel: () => console.log('Bulk deletion cancelled'),
		})
	}

	const handleBulkDelete = (selectedItems) => {
		console.log('bulk delete,', selectedItems)
		// bulk delete option
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
				pageId={'users'}
				data={users}
				config={tableView({
					list: users,
					onDelete: confirmDeletion,
					onDetail: handleDetail,
				})}
				columnsConfig={userColumnsConfig}
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
				highlightedRowId={highlightedRowId}
				title={'Users'}
				DrawerComponent={UserAddEditDrawer}
			/>
		</>
	)
}

export default UsersPage
