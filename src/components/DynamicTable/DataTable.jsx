/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button, Drawer, Modal, Space, Dropdown } from 'antd'
import {
	SearchOutlined,
	PlusCircleOutlined,
	ExclamationCircleOutlined,
	FilterOutlined,
	SortAscendingOutlined,
} from '@ant-design/icons'
import Pagination from './CustomPagination'
import ActionDropDown from './ActionDropDown'
import { FaShieldAlt } from 'react-icons/fa'
import DynamicTable from '.'

const { confirm } = Modal

const DataTable = ({
	pageId,
	confirmModalDetail = 'Are you sure you want to delete this',
	config,
	columnsConfig,
	handleSearch,
	confirmDeletion,
	onPaginate,
	meta,
	loading,
	openDrawer,
	setOpenDrawer,
	selectedData,
	confirmDelete,
	setConfirmDelete,
	actionOptions,
	filterOptions,
	sortOptions,
	onFilterApply,
	onActionSelected,
	onSortApply,
	title,
	itemToDelete,
	setItemToDelete,
	DrawerComponent,
	highlightedRowId,
}) => {
	const [searchValue, setSearchValue] = useState('')
	const [isDrawerOpen, setIsDrawerOpen] = useState(openDrawer)
	const [isConfirmModalVisible, setIsConfirmModalVisible] =
		useState(confirmDelete)
	const [selectedItems, setSelectedItems] = useState([]) // To store selected items
	const dispatch = useDispatch()

	const handleSearchChange = (e) => {
		setSearchValue(e.target.value)
	}

	const handleSearchClick = () => {
		handleSearch(searchValue)
	}

	const showDeleteConfirm = () => {
		confirm({
			title: `${title} ${confirmModalDetail}`,
			icon: <ExclamationCircleOutlined />,
			content: 'Do you want to delete these items?',
			onOk() {
				confirmDeletion(itemToDelete)
				setItemToDelete(null)
			},
			onCancel() {
				setItemToDelete(null)
			},
		})
	}

	useEffect(() => {
		if (confirmDelete) {
			showDeleteConfirm()
			setConfirmDelete(false)
		}
	}, [confirmDelete])

	useEffect(() => {
		setIsDrawerOpen(openDrawer)
	}, [openDrawer])

	const handleSelectChange = (selectedRowKeys, selectedRows) => {
		setSelectedItems(selectedRows)
	}

	return (
		<div className='h-full'>
			<div className='flex justify-between px-4'>
				<h3>{title}</h3>
				<Space>
					<Input
						placeholder='Search'
						value={searchValue}
						onChange={handleSearchChange}
						suffix={<SearchOutlined onClick={handleSearchClick} />}
					/>
					<Button
						icon={<PlusCircleOutlined />}
						onClick={() => setOpenDrawer(true)}
					>
						Add
					</Button>
					<Dropdown
						overlay={
							<ActionDropDown
								actions={actionOptions}
								onActionSelected={(action) =>
									onActionSelected(action, selectedItems)
								}
							/>
						}
					>
						<Button icon={<FaShieldAlt />}>Actions</Button>
					</Dropdown>
					<Dropdown
						overlay={
							<ActionDropDown
								actions={sortOptions}
								onActionSelected={onSortApply}
							/>
						}
					>
						<Button icon={<SortAscendingOutlined />}>Sort</Button>
					</Dropdown>
					<Dropdown
						overlay={
							<ActionDropDown
								actions={filterOptions}
								onActionSelected={onFilterApply}
							/>
						}
					>
						<Button icon={<FilterOutlined />}>Filters</Button>
					</Dropdown>
				</Space>
			</div>
			<DynamicTable
				config={config}
				columnsConfig={columnsConfig}
				loading={loading}
				highlightedRowId={highlightedRowId} // Pass newly added user ID to the table
				onSelectChange={handleSelectChange} // Handle row selection change
			/>
			<Pagination
				totalItems={meta?.total}
				itemsPerPage={10}
				meta={meta}
				onPaginate={onPaginate}
			/>
			{DrawerComponent && (
				<DrawerComponent
					openDrawer={isDrawerOpen}
					setOpenDrawer={setOpenDrawer}
					userData={selectedData}
				/>
			)}
		</div>
	)
}

export default DataTable