/* eslint-disable react/prop-types */
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Button, Layout, theme } from '@/components'

const { Header: AntHeader } = Layout

const Header = ({ collapsed, toggleCollapse }) => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	return (
		<AntHeader
			style={{
				padding: 0,
				background: colorBgContainer,
			}}
		>
			<Button
				type='text'
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={toggleCollapse}
				style={{
					fontSize: '16px',
					width: 64,
					height: 64,
				}}
			/>
		</AntHeader>
	)
}

export default Header
