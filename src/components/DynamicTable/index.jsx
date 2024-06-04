/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Table, Spin, Grid } from 'antd'
import NoDataAvailable from './NoDataAvailable' // You can create a simple component for this
import TableSkeletonWithImage from './TableSkeletonWithImage'

const { useBreakpoint } = Grid

const DynamicTable = ({
	config,
	columnsConfig,
	loading,
	highlightedRowId,
	onSelectChange,
}) => {
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [highlightedRow, setHighlightedRow] = useState(null)
	const screens = useBreakpoint()

	useEffect(() => {
		if (highlightedRowId) {
			setHighlightedRow(highlightedRowId)
			setTimeout(() => {
				setHighlightedRow(null)
			}, 5000) // Highlight for 5 seconds
		}
	}, [highlightedRowId])

	// Filter columns based on the current screen size and calculate total width
	const getResponsiveColumns = () => {
		return columnsConfig
			.filter((col) => {
				if (!col.responsive) return true
				if (screens.lg && col.responsive.includes('lg')) return true
				if (screens.md && col.responsive.includes('md')) return true
				if (screens.sm && col.responsive.includes('sm')) return true
				if (screens.xs && col.responsive.includes('xs')) return true
				return false
			})
			.map((col) => ({
				...col,
				render: (text, record) => config.theme[col.key](record),
			}))
	}

	const columns = getResponsiveColumns()

	// Calculate the total width of the visible columns
	const totalWidth = columns.reduce((sum, col) => sum + (col.width || 0), 0)

	const rowSelection = {
		selectedRowKeys,
		onChange: (selectedRowKeys, selectedRows) => {
			setSelectedRowKeys(selectedRowKeys)
			onSelectChange(selectedRowKeys, selectedRows)
		},
	}

	return (
		<div className='table-container'>
			<Table
				rowSelection={rowSelection}
				dataSource={config?.list}
				columns={columns}
				loading={{
					indicator: <Spin size='large' />,
					spinning: loading === 'pending',
				}}
				rowKey='id'
				pagination={false}
				scroll={{ y: 400, x: totalWidth }} // Set the height for the scrollable area and enable horizontal scrolling
				locale={{
					emptyText:
						loading !== 'pending' ? (
							<NoDataAvailable />
						) : (
							<TableSkeletonWithImage />
						),
				}}
				onRow={(record) => ({
					onMouseEnter: () => {
						// Handle row hover
					},
					onMouseLeave: () => {
						// Handle row leave
					},
					style: {
						cursor: 'pointer',
						transition: 'background-color 0.3s',
					},
					className: highlightedRow === record.id ? 'highlighted-row' : '',
				})}
			/>
		</div>
	)
}

export default DynamicTable
