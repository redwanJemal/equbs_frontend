/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import DataTable from '@/components/DynamicTable/DataTable'
import tableView from '@/components/Users/tableView'
import PropertyUnitAddEditDrawer from '@/components/Users/PropertyUnitAddEditDrawer'

const sampleData = [
	{
		id: 1,
		thumbnail: 'https://via.placeholder.com/150',
		name: 'Unit 1',
		type: 'For Rent',
		price: '1000',
		availability: 'Available',
		property: { name: 'Property A' },
		actions: [],
	},
	{
		id: 2,
		thumbnail: 'https://via.placeholder.com/150',
		name: 'Unit 2',
		type: 'For Sale',
		price: '2000',
		availability: 'Occupied',
		property: { name: 'Property B' },
		actions: [],
	},
	{
		id: 3,
		thumbnail: 'https://via.placeholder.com/150',
		name: 'Unit 3',
		type: 'For Rent',
		price: '1500',
		availability: 'Available',
		property: { name: 'Property C' },
		actions: [],
	},
]

const columnsConfig = [
	{ title: 'Thumbnail', dataIndex: 'thumbnail', key: 'thumbnail' },
	{ title: 'Actions', dataIndex: 'actions', key: 'actions' },
	{ title: 'Name', dataIndex: 'name', key: 'name' },
	{ title: 'Type', dataIndex: 'type', key: 'type' },
	{ title: 'Price', dataIndex: 'price', key: 'price' },
	{ title: 'Availability', dataIndex: 'availability', key: 'availability' },
	{ title: 'Property', dataIndex: 'property', key: 'property' },
]

const sampleMeta = {
	current_page: 1,
	last_page: 1,
	total: 3,
	from: 1,
	to: 3,
}

const PropertyUnit = () => {
	const [queryParameters, setQueryParameters] = useState({
		page: 1,
		limit: 10,
		filters: {},
		include: 'property',
		term: '',
		sortBy: '',
		sortOrder: '',
	})
	const dispatch = useDispatch()

	const data = sampleData
	const loading = false
	const meta = sampleMeta

	const handleDetail = async (id) => {
		console.log('Detail for ID:', id)
	}

	const handleDelete = async (id) => {
		console.log('Delete ID:', id)
	}

	const confirmDeletion = async (id) => {
		console.log('Confirmed deletion for ID:', id)
	}

	const onFilterApply = (item) => {
		console.log('Filter applied:', item)
	}

	const onActionSelected = (item) => {
		console.log('Action selected:', item)
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
		<DataTable
			pageId={'propertyUnits'}
			data={data}
			config={tableView({
				list: data,
				onDelete: handleDelete,
				onDetail: handleDetail,
			})}
			columnsConfig={columnsConfig}
			handleSearch={handleSearch}
			handleDetail={handleDetail}
			handleDelete={handleDelete}
			confirmDeletion={confirmDeletion}
			onPaginate={onPaginateApply}
			meta={meta}
			loading={loading}
			openDrawer={false}
			setOpenDrawer={() => {}}
			selectedData={null}
			confirmDelete={false}
			setConfirmDelete={() => {}}
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
			title={'Property Unit'}
			itemToDelete={null}
			setItemToDelete={() => {}}
			DrawerComponent={PropertyUnitAddEditDrawer}
		/>
	)
}

export default PropertyUnit
