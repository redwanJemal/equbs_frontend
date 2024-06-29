/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { paymentModeEnum, transactionStatusEnum } from '@/utils/enums'
import { Button, Tooltip } from 'antd'
import { FaEdit, FaPowerOff, FaSync } from 'react-icons/fa'

const TransactionTableView = ({ list, onDetail, onDelete, onReactivate }) => {
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
					{item.isApproved ? (
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
			subscriptionName: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[350px]'>
					{`${item.userFirstName} ${item.userLastName} => ${item.equbName}`}
				</div>
			),
			date: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.date}
				</div>
			),
			amount: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[100px]'>
					{item?.amount}
				</div>
			),
			mode: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[50px]'>
					{paymentModeEnum(item?.mode)}
				</div>
			),
			transactionNumber: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.transactionNumber ?? '-'}
				</div>
			),
			bankAccount: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.bankAccount ?? '-'}
				</div>
			),
			status: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{transactionStatusEnum(item.isApproved)}
				</div>
			),
		},
	}
}

export default TransactionTableView
