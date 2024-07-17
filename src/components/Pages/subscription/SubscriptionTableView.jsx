/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { rotationTypeEnum } from '@/utils/enums'
import { Button, Tooltip } from '@/components'
import moment from 'moment'
import { EditOutlined, MoneyCollectOutlined, PoweroffOutlined } from '@/icons'
import { useNavigate } from 'react-router-dom'

const SubscriptionTableView = ({ list, onDetail, onDelete, onReactivate }) => {
	const navigate = useNavigate()
	const handleMenuClick = (item, action) => {
		if (action === 'detail') {
			onDetail(item?.id)
		} else if (action === 'delete') {
			onDelete(item?.id)
		} else if (action === 'reactive') {
			onReactivate(item?.id)
		}
	}

	const handleRedirect = (subscriptionId) => {
		navigate(`/transactions?subscriptionId=${subscriptionId}`)
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
							icon={<EditOutlined />}
						/>
					</Tooltip>
					<Tooltip title='Transactions'>
						<Button
							shape='circle'
							onClick={() => handleRedirect(item.id)}
							icon={<MoneyCollectOutlined />}
						/>
					</Tooltip>
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
			// startDate: (item) => (
			// 	<div className='table-row-color text-sm leading-[18px] w-[150px]'>
			// 		{moment(item?.startDate).format('YYYY-MM-DD')}
			// 	</div>
			// ),
			rotation: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{rotationTypeEnum(item?.rotation)}
				</div>
			),
			timeline: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.timeline ?? '-'}
				</div>
			),
			remainingDays: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.timeline - item.savedDays}
				</div>
			),
			receivingDayCount: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.receivingDayCount - item.savedDays}
				</div>
			),
		},
	}
}

export default SubscriptionTableView
