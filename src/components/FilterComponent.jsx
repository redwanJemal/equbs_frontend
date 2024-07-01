/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Dropdown, Menu, Checkbox, Button, Divider } from '@/components'
import { FilterOutlined } from '@ant-design/icons'

const FilterComponent = ({
	categories,
	onCategoryChange,
	statusOptions,
	onStatusChange,
	onApplyFilters,
	onResetFilters,
}) => {
	const [selectedCategories, setSelectedCategories] = useState([])
	const [selectedStatuses, setSelectedStatuses] = useState([])

	const handleCategoryChange = (checkedValues) => {
		setSelectedCategories(checkedValues)
		onCategoryChange(checkedValues)
	}

	const handleStatusChange = (checkedValues) => {
		setSelectedStatuses(checkedValues)
		onStatusChange(checkedValues)
	}

	const menu = (
		<Menu>
			<Menu.ItemGroup title='Categories'>
				<div className='ml-4'>
					<Checkbox.Group
						options={categories}
						value={selectedCategories}
						onChange={handleCategoryChange}
						style={{ display: 'flex', flexDirection: 'column' }}
					/>
				</div>
			</Menu.ItemGroup>
			<Divider />
			<Menu.ItemGroup title='Statuses'>
				<div className='ml-4'>
					<Checkbox.Group
						options={statusOptions}
						value={selectedStatuses}
						onChange={handleStatusChange}
						style={{ display: 'flex', flexDirection: 'column' }}
					/>
				</div>
			</Menu.ItemGroup>
			<Divider />
			<Menu.Item>
				<Button
					type='primary'
					onClick={onApplyFilters}
					style={{ width: '100%' }}
				>
					Apply Filters
				</Button>
			</Menu.Item>
			<Menu.Item>
				<Button onClick={onResetFilters} style={{ width: '100%' }}>
					Reset Filters
				</Button>
			</Menu.Item>
		</Menu>
	)

	return (
		<Dropdown overlay={menu} trigger={['click']}>
			<Button>
				Filters <FilterOutlined />
			</Button>
		</Dropdown>
	)
}

export default FilterComponent
