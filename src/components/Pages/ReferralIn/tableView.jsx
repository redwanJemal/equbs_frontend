/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BsThreeDotsVertical, BsTrash } from 'react-icons/bs'
import { Button, Dropdown, Menu, Tag, Tooltip } from 'antd'
import { FaEdit, FaPowerOff, FaSync } from 'react-icons/fa'
import { EyeOutlined } from '@ant-design/icons'

const referralInTableView = ({ list, onDetail, onDelete, onReactivate }) => {
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
			status: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[100px]'>
					<EyeOutlined
						onClick={() => handleMenuClick(item, 'detail')}
						style={{
							fontSize: 20,
						}}
					/>
				</div>
			),
			facilityName: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[250px]'>
					{item?.facilityName}
				</div>
			),
			fullName: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[200px]'>
					{item?.patientFullName}
				</div>
			),
			cardNumber: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.cardNumber}
				</div>
			),
			referralTypeId: (item) => (
				<div className='table-row-color text-sm leading-[18px] w-[150px]'>
					{item?.referralType}
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

export default referralInTableView
