/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Pagination } from 'antd'

const CustomPagination = ({ totalItems, itemsPerPage, onPaginate, meta }) => {
	const handlePageChange = (page) => {
		onPaginate(page)
	}

	return (
		<Pagination
			current={meta?.current_page}
			total={totalItems}
			pageSize={itemsPerPage}
			onChange={handlePageChange}
			showSizeChanger={false}
		/>
	)
}

export default CustomPagination
