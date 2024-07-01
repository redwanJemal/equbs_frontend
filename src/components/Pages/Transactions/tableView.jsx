/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { paymentModeEnum } from '@/utils/enums'
import { Button, Tag, Tooltip } from 'antd'
import { FaEdit, FaPowerOff, FaSync } from 'react-icons/fa'

const TransactionTableView = ({ list, onDetail, onDelete, onApprove }) => {
	const handleMenuClick = (item, action) => {
		if (action === 'detail') {
			onDetail(item?.id)
		} else if (action === 'delete') {
			onDelete(item?.id)
		} else if (action === 'approve') {
			onApprove(item?.id)
		}
	}

	const transactionStatusEnum = (transactionStatus) => {
		switch (transactionStatus) {
			case true:
				return <Tag color='#87d068'>Approved</Tag>
			case false:
				return <Tag color='#2db7f5'>Pending</Tag>
			default:
				return <Tag color='#2db7f5'>Pending</Tag>
		}
	}

	return {
		list: list,
		theme: {
			actions: (item) =>
				!item?.isApproved && (
					<>
						{' '}
						<Tooltip title='Edit'>
							<Button
								type='primary'
								shape='circle'
								onClick={() => handleMenuClick(item, 'detail')}
								icon={<FaEdit />}
							/>
						</Tooltip>
						<Tooltip title='Approve'>
							<Button
								className='!bg-green-500 !border-green-500'
								type='primary'
								shape='circle'
								onClick={() => handleMenuClick(item, 'approve')}
								icon={<FaSync />}
							/>
						</Tooltip>
					</>
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
