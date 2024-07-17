/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { rotationTypeEnum } from '@/utils/enums'
import { Button, Popover, Tooltip } from '@/components'
import moment from 'moment'
import { EyeOutlined, EditOutlined, MoneyCollectOutlined } from '@/icons'
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

	const Description = ({ lable, value }) => {
		return (
			<div className='flex'>
				<span className='text-gray-500'>{lable}:</span>{' '}
				<span className='ml-4 font-bold'>{value}</span>
			</div>
		)
	}

	const subscriptionDetail = (item) => {
		return (
			<div className='grid grid-cols-2 gap-2'>
				<Description key={'name'} lable={'Name'} value={item?.user?.userName} />
				<Description
					key={'phone'}
					lable={'Phone'}
					value={item?.user?.userEmail}
				/>
				<Description key={'equb'} lable={'Equb'} value={item?.equb?.equbName} />
				<Description
					key={'timeLine'}
					lable={'Time Line'}
					value={item?.timeline}
				/>
				<Description
					key={'rotation'}
					lable={'Rotation'}
					value={rotationTypeEnum(item?.rotation)}
				/>
				<Description key={'amount'} lable={'Amount'} value={item?.amount} />
				<Description
					key={'paid'}
					lable={'Completed Payments'}
					value={item?.savedDays}
				/>
				<Description
					key={'payment'}
					lable={'Payment Day Remaining'}
					value={item?.receivingDayCount - item?.savedDays}
				/>
			</div>
		)
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
				<div className='flex flex-row justify-center items-center table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.user?.userName}
					<div className='ml-2'>
						<Popover
							content={subscriptionDetail(item)}
							title='Subscription Detail'
						>
							<span>
								<EyeOutlined className='m-auto w-10 h-10' />
							</span>
						</Popover>
					</div>
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
			paid: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item.savedDays}
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
