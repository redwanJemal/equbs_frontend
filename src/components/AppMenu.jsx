/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import {
	UploadOutlined,
	DashboardOutlined,
	FileTextOutlined,
	SettingOutlined,
	TeamOutlined,
	ApartmentOutlined,
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
		'/referral-feedback': '4',
		'/chatbot-communication': '5',
		'/generate-reports': '6',
		'/historical-data': '7',
		'/users': '8',
		'/account-deactivation': '9',
		'/catchment-creation': '10',
		'/catchment-deactivation': '11',
		'/activity-monitoring': '12',
		'/equbs': '13',
		'/facility-type': '14',
	}

	const keyToOpenKey = {
		2: 'sub1',
		3: 'sub1',
		4: 'sub1',
		5: 'sub1',
		6: 'sub2',
		7: 'sub2',
		8: 'sub3',
		9: 'sub3',
		10: 'sub4',
		11: 'sub4',
		14: 'sub5',
		13: 'sub5',
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
			style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
		>
			<Menu.Item key='1' icon={<DashboardOutlined />}>
				<Link to='/dashboard'>Dashboard</Link>
			</Menu.Item>
			{/* <SubMenu
				key='sub5'
				icon={<FileTextOutlined />}
				title='Facility Management'
			>
				<Menu.Item key='13'>
					<Link to='/list'>Facility List</Link>
				</Menu.Item>
				<Menu.Item key='14'>
					<Link to='/facility-type'>Facility Type</Link>
				</Menu.Item>
			</SubMenu> */}
			<Menu.Item key='13' icon={<FileTextOutlined />}>
				<Link to='/equbs'>Equbs</Link>
			</Menu.Item>
			<Menu.Item key='8' icon={<TeamOutlined />}>
				<Link to='/users'>User Management</Link>
			</Menu.Item>
			<SubMenu
				key='sub1'
				icon={<UploadOutlined />}
				title='Subscription Management'
			>
				<Menu.Item key='2'>
					<Link to='/subscription'>Equb Subscription</Link>
				</Menu.Item>
				<Menu.Item key='3'>
					<Link to='/transactions'>Subscription Transaction</Link>
				</Menu.Item>
				{/* <Menu.Item key='4'>
					<Link to='/referral-feedback'>Referral Feedback</Link>
				</Menu.Item>
				<Menu.Item key='5'>
					<Link to='/chatbot-communication'>Chatbot Communication</Link>
				</Menu.Item> */}
			</SubMenu>
			<SubMenu key='sub2' icon={<FileTextOutlined />} title='Reports'>
				<Menu.Item key='6'>
					<Link to='/generate-reports'>Generate Reports</Link>
				</Menu.Item>
				<Menu.Item key='7'>
					<Link to='/historical-data'>View Historical Data</Link>
				</Menu.Item>
			</SubMenu>
			{/* <SubMenu key='sub3' icon={<SettingOutlined />} title='User Management'>
				<Menu.Item key='8'>
					<Link to='/account-creation'>User Account Creation</Link>
				</Menu.Item>
				<Menu.Item key='9'>
					<Link to='/account-deactivation'>User Account Deactivation</Link>
				</Menu.Item>
			</SubMenu> */}
			<SubMenu
				key='sub4'
				icon={<ApartmentOutlined />}
				title='Catchment Management'
			>
				<Menu.Item key='10'>
					<Link to='/catchment-creation'>Catchment Creation</Link>
				</Menu.Item>
				<Menu.Item key='11'>
					<Link to='/catchment-deactivation'>Catchment Deactivation</Link>
				</Menu.Item>
			</SubMenu>
			<Menu.Item
				key='settings'
				icon={<SettingOutlined />}
				style={{ marginTop: 'auto' }}
			>
				<Link to='/settings'>Settings</Link>
			</Menu.Item>
		</Menu>
	)
}

export default AppMenu
