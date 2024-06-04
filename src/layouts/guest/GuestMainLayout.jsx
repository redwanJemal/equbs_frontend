import { useState } from 'react'

import { Layout, theme } from 'antd'
import SideMenu from '@/components/SideMenu'
import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'
const { Content } = Layout

const MainLayout = () => {
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken()

	const toggleCollapse = () => {
		setCollapsed(!collapsed)
	}

	return (
		<Layout>
			<SideMenu collapsed={collapsed} />
			<Layout>
				<Header collapsed={collapsed} toggleCollapse={toggleCollapse} />
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	)
}
export default MainLayout
