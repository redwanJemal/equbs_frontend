/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Avatar, Badge, Card, Dropdown, Menu } from '@/components'

const UserCard = ({ user }) => {
	const menu = (
		<Menu>
			<Menu.Item key='1'>Detail</Menu.Item>
			<Menu.Item key='2' className='erf-success-bg erf-success-color'>
				Accept
			</Menu.Item>
			<Menu.Item key='3' className='erf-danger-bg erf-danger-color'>
				Reject
			</Menu.Item>
		</Menu>
	)

	const status = (text) => {
		switch (text) {
			case 'Emergency':
				return 'green'
			case 'Cold':
				return 'red'
		}
	}

	return (
		<Badge.Ribbon
			color={status(user.status)}
			text={user.status}
			placement='start'
		>
			<Card className='hover:shadow-md hover:border-2'>
				<div className='flex justify-end items-center mb-4'>
					{/* <Badge color={status(user.status)} text={user.status} /> */}

					<Dropdown className='' overlay={menu} trigger={['click']}>
						<EllipsisOutlined style={{ fontSize: '24px' }} />
					</Dropdown>
				</div>
				<div className='flex justify-center mb-4'>
					<Avatar size={64} src={user.avatar} icon={<UserOutlined />} />
				</div>
				<div className='text-center mb-2'>
					<div className='text-xl '>{user.name}</div>
				</div>
				<div className='text-center'>
					<div className=''>{user.email}</div>
				</div>
			</Card>
		</Badge.Ribbon>
	)
}
const ReferalInCard = () => {
	const users = [
		{
			id: 1,
			name: 'Arsho Medical Laboratories',
			email: 'info@arsho.com',
			avatar: 'http://localhost:5173/src/assets/mohlogo.png', // Placeholder image
			status: 'Emergency',
		},
		{
			id: 2,
			name: 'Black Lion Hospital',
			email: 'info@blacklion.com',
			avatar: 'https://dha.jsi.com/wp-content/uploads/2022/04/MOH.png', // Placeholder image
			status: 'Cold',
		},
		{
			id: 3,
			name: 'Mekelle University Ayder Referral Hospital',
			email: 'info@mekele.com',
			avatar: 'https://www.aau.edu.et/wp-content/uploads/2016/02/logoCopy.png', // Placeholder image
			status: 'Emergency',
		},
		{
			id: 4,
			name: 'Saint Paul Hospital',
			email: 'info@saintpaul.com',
			avatar:
				'https://addishiwotgeneralhospital.com/wp-content/uploads/2020/08/blue-logo-addis-hiwot-hospital.png', // Placeholder image
			status: 'Cold',
		},
	]

	return (
		<>
			<div className='p-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
				{users.map((user) => (
					<UserCard key={user.id} user={user} />
				))}
			</div>
		</>
	)
}

export default ReferalInCard
