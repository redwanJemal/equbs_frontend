/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Tooltip } from 'antd'
import { FaEdit, FaPowerOff, FaSync } from 'react-icons/fa'

const SubscriptionTableView = ({ list, onDetail, onDelete, onReactivate }) => {
	const handleMenuClick = (item, action) => {
		if (action === 'detail') {
			onDetail(item?.id)
		} else if (action === 'delete') {
			onDelete(item?.id)
		} else if (action === 'reactive') {
			onReactivate(item?.id)
		}
	}

	const rotationTypeEnum = (rotationType) => {
		switch (rotationType) {
			case 1:
				return 'Daily'
			case 2:
				return 'Weekely'
			case 3:
				return 'Monthly'
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
			userName: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.user?.userName}
				</div>
			),
			equbName: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[200px]'>
					{item?.equb?.equbName}
				</div>
			),
			startDate: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.startDate}
				</div>
			),
			rotation: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{rotationTypeEnum(item?.rotation)}
				</div>
			),
			timeline: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.timeline}
				</div>
			),
		},
	}
}

export default SubscriptionTableView
