/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Layout, Button, Dropdown, Avatar, Menu, theme as antTheme } from 'antd'
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	LogoutOutlined,
	GlobalOutlined,
} from '@ant-design/icons'
import ThemeToggleButton from './ThemeToggleButton'
import LanguageMenu from './LanguageMenu'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '@/stores/users'

const { Header } = Layout

const ProfileMenu = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const profileMenuItems = [
		{
			key: 'profile',
			icon: <UserOutlined />,
			label: 'Profile',
			onClick: () => navigate('/profile'), // Navigate to the profile page
		},
		{
			key: 'logout',
			icon: <LogoutOutlined />,
			label: 'Logout',
			onClick: () => {
				dispatch(userLogout())
				navigate('/login')
			},
		},
	]

	return <Menu items={profileMenuItems} />
}

const HeaderBar = ({ collapsed, toggle }) => {
	const token = antTheme.useToken()
	const profile = useSelector((state) => state.users.profile)

	return (
		<Header
			className='flex justify-between items-center px-4 layout-page-header bg-2'
			style={{ backgroundColor: token.token.colorBgContainer }}
		>
			<Button
				type='text'
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={toggle}
			/>
			<div className='flex items-center'>
				<ThemeToggleButton />
				<Dropdown overlay={<LanguageMenu />} trigger={['click']}>
					<Button type='secondary' icon={<GlobalOutlined />}></Button>
				</Dropdown>
				<Dropdown
					overlay={<ProfileMenu />}
					trigger={['click']}
					className='ml-4'
				>
					<div className='flex items-center cursor-pointer'>
						<Avatar icon={<UserOutlined />} />
						<span className='ml-2'>{profile?.name}</span>
					</div>
				</Dropdown>
			</div>
		</Header>
	)
}

export default HeaderBar
