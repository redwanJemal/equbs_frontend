/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Button, Tooltip } from '@/components'
import { EditOutlined, DeleteOutlined } from '@/icons'
import { useNavigate } from 'react-router-dom'
import { userStatusEnum } from '@/utils/enums'

const tableView = ({ list, onDetail, onDelete }) => {
	const navigate = useNavigate()

	const handleMenuClick = (item, action) => {
		if (action === 'detail') {
			onDetail(item?.id)
		} else if (action === 'delete') {
			onDelete(item?.id)
		}
	}

	const handleRedirect = (userId) => {
		navigate(`/subscription?userId=${userId}`)
	}
	return {
		list: list,
		theme: {
			actions: (item) => (
				<div className='flex'>
					<Tooltip title='edit'>
						<Button
							type='primary'
							shape='circle'
							onClick={() => handleMenuClick(item, 'detail')}
							icon={<EditOutlined />}
						/>
					</Tooltip>
					<Tooltip title='subscription'>
						<Button
							danger
							shape='circle'
							onClick={() => handleRedirect(item.id)}
							icon={<DeleteOutlined />}
						/>
					</Tooltip>
				</div>
			),
			fullName: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[250px]'>
					{item?.fullName}
				</div>
			),
			email: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[250px]'>
					{item?.email}
				</div>
			),
			phoneNumber: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.phoneNumber}
				</div>
			),
			status: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{userStatusEnum(item?.status)}
				</div>
			),
			roles: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.roles?.map((role) => role.roleName).join(', ')}
				</div>
			),
		},
	}
}

export default tableView
