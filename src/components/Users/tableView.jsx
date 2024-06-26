/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { BsThreeDotsVertical, BsTrash } from 'react-icons/bs'
import { Button, Dropdown, Menu, Tooltip } from 'antd'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

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
							icon={<FaEdit />}
						/>
					</Tooltip>
					<Tooltip title='subscription'>
						<Button
							danger
							shape='circle'
							onClick={() => handleRedirect(item.id)}
							icon={<BsTrash />}
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
			roles: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.roles?.map((role) => role.roleName).join(', ')}
				</div>
			),
		},
	}
}

export default tableView
