/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Layout } from '@/components'
import Logo from '@/assets/equb.png'
import { useSelector } from 'react-redux'
import AppMenu from './AppMenu'
import { useLocale } from '@/locales'

const { Sider } = Layout

const SiderMenu = ({ collapsed }) => {
	const { formatMessage } = useLocale()
	const theme = useSelector((state) => state.global.theme)

	return (
		<Sider
			theme={theme === 'dark' ? 'dark' : 'light'}
			trigger={null}
			collapsible
			collapsed={collapsed}
			className={`bg-1 red ${!collapsed ? 'sider-large' : ''}`}
		>
			<div className='flex items-center p-4 text-white font-bold'>
				<img src={Logo} alt='Logo' width='42' height='42' />
				{!collapsed && (
					<div>{formatMessage({ id: 'global.header.application' })}</div>
				)}
			</div>
			<AppMenu theme={theme === 'dark' ? 'dark' : 'light'} />
		</Sider>
	)
}

export default SiderMenu
