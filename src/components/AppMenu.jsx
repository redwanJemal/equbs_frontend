/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import {
	DashboardOutlined,
	MoneyCollectOutlined,
	FolderAddOutlined,
	TransactionOutlined,
	UserOutlined,
	FileSearchOutlined,
	HistoryOutlined,
	SettingOutlined,
} from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'

const { SubMenu } = Menu

const AppMenu = ({ theme }) => {
	const location = useLocation()
	const [openKeys, setOpenKeys] = useState([])

	const pathToKey = {
		'/': '1',
		'/subscription': '2',
		'/transactions': '3',
		'/chatbot-communication': '5',
		'/generate-reports': '6',
		'/historical-data': '7',
		'/users': '8',
		'/account-deactivation': '9',
		'/equbs': '13',
	}

	const keyToOpenKey = {
		2: 'sub1',
		3: 'sub1',
		6: 'sub2',
		7: 'sub2',
		8: 'sub3',
		9: 'sub3',
		13: 'sub4',
	}

	const selectedKey = pathToKey[location.pathname] || '1'

	useEffect(() => {
		const openKey = keyToOpenKey[selectedKey]
		if (openKey) {
			setOpenKeys([openKey])
		} else {
			setOpenKeys([])
		}
	}, [location.pathname, selectedKey])

	const handleOpenChange = (keys) => {
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
		setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
	}

	return (
		<Menu
			theme={theme}
			mode='inline'
			selectedKeys={[selectedKey]}
			openKeys={openKeys}
			onOpenChange={handleOpenChange}
			className='h-screen'
			style={{ display: 'flex', flexDirection: 'column' }}
		>
			<Menu.Item key='1' icon={<DashboardOutlined />}>
				<Link to='/dashboard'>Dashboard</Link>
			</Menu.Item>
			<Menu.Item key='13' icon={<MoneyCollectOutlined />}>
				<Link to='/equbs'>Equbs</Link>
			</Menu.Item>
			<Menu.Item key='2' icon={<FolderAddOutlined />}>
				<Link to='/subscription'>Equb Subscription</Link>
			</Menu.Item>
			<Menu.Item key='3' icon={<TransactionOutlined />}>
				<Link to='/transactions'>Subscription Transaction</Link>
			</Menu.Item>
			<Menu.Item key='8' icon={<UserOutlined />}>
				<Link to='/users'>User Management</Link>
			</Menu.Item>
		</Menu>
	)
}

export default AppMenu
