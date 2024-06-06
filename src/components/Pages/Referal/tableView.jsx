/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BsThreeDotsVertical, BsTrash } from 'react-icons/bs'
import { Button, Dropdown, Menu, Tag, Tooltip } from 'antd'
import { FaEdit, FaPowerOff, FaSync } from 'react-icons/fa'
import { InfoCircleOutlined } from '@ant-design/icons'

const referralOutTableView = ({ list, onDetail, onFeedback, onReactivate }) => {
	const handleMenuClick = (item, action) => {
		if (action === 'detail') {
			onDetail(item?.id)
		} else if (action === 'feedback') {
			onFeedback(item?.id)
		} else if (action === 'reactive') {
			onReactivate(item?.id)
		}
	}

	return {
		list: list,
		theme: {
			status: (item) => (
				<div className='flex gap-2'>
					<div className='table-row-color text-sm leading-[18px]'>
						{item?.status === 'Pending' && <Tag color='orange'>Pending</Tag>}
						{item?.status === 'Accepted' && <Tag color='green'>Accepted</Tag>}
						{item?.status === 'Rejected' && <Tag color='red'>Rejected</Tag>}
					</div>
					<Tooltip title='Rejection Feedback'>
						{item?.status === 'Rejected' && (
							<InfoCircleOutlined
								onClick={() => handleMenuClick(item, 'feedback')}
							/>
						)}
					</Tooltip>
				</div>
			),
			facilityName: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[250px]'>
					{item?.facilityName}
				</div>
			),
			fullName: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[200px]'>
					{item?.firstName} {item?.lastName}
				</div>
			),
			cardNumber: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.cardNumber}
				</div>
			),
			referralTypeId: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.referralTypeId === 1 ? 'Cold' : 'Emergency'}
				</div>
			),
			reasonForReferral: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[200px]'>
					{item?.reasonForReferral}
				</div>
			),
			// status: (item) => (
			// 	<div className='table-row-color text-sm leading-[18px] w-[100px]'>
			// 		<div
			// 			className='p-1 text-white rounded-lg w-min px-2'
			// 			style={{
			// 				background:
			// 					item?.status === 'Pending'
			// 						? 'yellow'
			// 						: item?.status === 'Accepted'
			// 						? 'green'
			// 						: 'red',
			// 			}}
			// 		>
			// 			{item?.status}
			// 		</div>
			// 	</div>
			// ),
		},
	}
}

export default referralOutTableView
