/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { BsThreeDotsVertical, BsTrash } from 'react-icons/bs'
import { Button, Dropdown, Menu, Tooltip } from 'antd'
import { FaEdit } from 'react-icons/fa'

const tableView = ({ list, onDetail, onDelete }) => {
	const handleMenuClick = (item, action) => {
		if (action === 'detail') {
			onDetail(item?.id)
		} else if (action === 'delete') {
			onDelete(item?.id)
		}
	}

	const getMenu = (item) => (
		<Menu onClick={(e) => handleMenuClick(item, e.key)}>
			<Menu.Item key='detail'>Detail</Menu.Item>
			<Menu.Item className='hover:!bg-red-600 hover:!text-white' key='delete'>
				Delete
			</Menu.Item>
		</Menu>
	)

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
					<Tooltip title='delete'>
						<Button
							danger
							shape='circle'
							onClick={() => handleMenuClick(item, 'delete')}
							icon={<BsTrash />}
						/>
					</Tooltip>
				</div>
			),
			userName: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[250px]'>
					{item?.userName}
				</div>
			),
			email: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[250px]'>
					{item?.email}
				</div>
			),
			isActive: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[100px]'>
					{item?.isActive ? 'Active' : 'Inactive'}
				</div>
			),
			facilityId: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[250px]'>
					{item?.facility?.name}
				</div>
			),
			phoneNumber: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.phoneNumber}
				</div>
			),
		},
	}
}

export default tableView
