/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BsThreeDotsVertical, BsTrash } from 'react-icons/bs'
import { Button, Dropdown, Menu, Tooltip } from 'antd'
import { FaEdit, FaPowerOff, FaSync } from 'react-icons/fa'

const tableView = ({ list, onDetail, onDelete, onReactivate }) => {
	const handleMenuClick = (item, action) => {
		if (action === 'detail') {
			onDetail(item?.id)
		} else if (action === 'delete') {
			onDelete(item?.id)
		} else if (action === 'reactive') {
			onReactivate(item?.id)
		}
	}

	return {
		list: list,
		theme: {
			actions: (item) => (
				<div className='flex'>
					<Tooltip title='Edit'>
						<Button
							type='primary'
							shape='circle'
							onClick={() => handleMenuClick(item, 'detail')}
							icon={<FaEdit />}
						/>
					</Tooltip>
					{item.status == 1 ? (
						<Tooltip title='Deactivate'>
							<Button
								danger
								shape='circle'
								onClick={() => handleMenuClick(item, 'delete')}
								icon={<FaPowerOff />}
							/>
						</Tooltip>
					) : (
						<Tooltip title='Reactivate'>
							<Button
								className='!bg-green-500 !border-green-500'
								type='primary'
								shape='circle'
								onClick={() => handleMenuClick(item, 'reactive')}
								icon={<FaSync />}
							/>
						</Tooltip>
					)}
				</div>
			),
			facilityName: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[250px]'>
					{item?.name}
				</div>
			),
			facilityType: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.facilityType?.name}
				</div>
			),
			contactNumber: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.contactNumber}
				</div>
			),
			isActive: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[100px]'>
					{item?.status == 1 ? 'Active' : 'Inactive'}
				</div>
			),
		},
	}
}

export default tableView
