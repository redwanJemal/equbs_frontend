/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { FaSpinner, FaUsers } from 'react-icons/fa' // Importing Font Awesome icon

const DashboardStatCard = ({
	title = 'Total Tenant',
	totalCount = 32,
	loading,
	Icon = FaUsers,
}) => {
	return (
		<div className='flex flex-col gap-3 p-8 rounded-lg border border-gray-300 hover:border-2'>
			<Icon className='icon-color h-10 w-10' />
			<div className='flex gap-4'>
				<div className='flex flex-col gap-2'>
					<h4 className='text-color text-xl'>{title}</h4>
					{loading === 'idle' && <h1 className='text-color'>{totalCount}</h1>}
					{loading === 'pending' && <FaSpinner />}
				</div>
			</div>
		</div>
	)
}

export default DashboardStatCard
