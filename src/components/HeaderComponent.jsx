/* eslint-disable react/prop-types */
import {
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
	SunOutlined,
	MoonOutlined,
	GlobalOutlined,
} from '@ant-design/icons'
import { Dropdown, Layout, Tooltip } from '@/components'
import { useNavigate } from 'react-router-dom'
import Avatar from '@/assets/react.svg'

const { Header } = Layout

const HeaderComponent = ({ collapsed, toggle, theme, onChangeTheme }) => {
	const navigate = useNavigate()

	const onActionClick = (action) => {
		switch (action) {
			case 'userInfo':
				return
			case 'userSetting':
				return
			case 'logout':
				navigate('/login')
				return
			default:
				return
		}
	}

	const toLogin = () => {
		navigate('/login')
	}

	const selectLocale = ({ key }) => {
		localStorage.setItem('locale', key)
	}

	return (
		<Header className='layout-page-header bg-2'>
			<div className='logo' style={{ width: collapsed ? 80 : 200 }}>
				<img
					src='/path/to/react-logo.svg'
					alt=''
					style={{ marginRight: collapsed ? '2px' : '20px' }}
				/>
				<img src='/path/to/antd-logo.svg' alt='' />
			</div>
			<div className='layout-page-header-main'>
				<div onClick={toggle}>
					<span id='sidebar-trigger'>
						{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
					</span>
				</div>
				<div className='actions'>
					<Tooltip
						title={
							theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
						}
					>
						<span onClick={onChangeTheme}>
							{theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
						</span>
					</Tooltip>
					<Dropdown
						overlay={
							<Dropdown.Menu onClick={selectLocale}>
								<Dropdown.Menu.Item
									key='zh_CN'
									disabled={localStorage.getItem('locale') === 'zh_CN'}
								>
									<GlobalOutlined /> 简体中文
								</Dropdown.Menu.Item>
								<Dropdown.Menu.Item
									key='en_US'
									disabled={localStorage.getItem('locale') === 'en_US'}
								>
									<GlobalOutlined /> English
								</Dropdown.Menu.Item>
							</Dropdown.Menu>
						}
					>
						<span>
							<GlobalOutlined id='language-change' />
						</span>
					</Dropdown>
					{localStorage.getItem('logged') ? (
						<Dropdown
							overlay={
								<Dropdown.Menu>
									<Dropdown.Menu.Item
										key='1'
										onClick={() => navigate('/dashboard')}
									>
										<UserOutlined /> Account
									</Dropdown.Menu.Item>
									<Dropdown.Menu.Item
										key='2'
										onClick={() => onActionClick('logout')}
									>
										<LogoutOutlined /> Logout
									</Dropdown.Menu.Item>
								</Dropdown.Menu>
							}
						>
							<span className='user-action'>
								<img src={Avatar} className='user-avatar' alt='avatar' />
							</span>
						</Dropdown>
					) : (
						<span style={{ cursor: 'pointer' }} onClick={toLogin}>
							Login
						</span>
					)}
				</div>
			</div>
		</Header>
	)
}

export default HeaderComponent
