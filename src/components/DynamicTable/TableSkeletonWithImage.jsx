/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Skeleton } from 'antd'

const TableSkeletonWithImage = () => {
	return (
		<Skeleton
			active
			avatar
			paragraph={{
				rows: 3,
			}}
		/>
	)
}

export default TableSkeletonWithImage
