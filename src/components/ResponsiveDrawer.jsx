/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Drawer } from 'antd'
import { useSelector } from 'react-redux'
import Logo from '@/assets/moh.png'
import AppMenu from './AppMenu'
import { useLocale } from '@/locales'

const ResponsiveDrawer = ({ visible, onClose }) => {
	const theme = useSelector((state) => state.global.theme)
	const { formatMessage } = useLocale()

	return (
		<Drawer
			placement='left'
			closable={false}
			onClose={onClose}
			open={visible}
			width='70vw'
			style={{
				padding: 0,
			}}
			// bodyStyle={{ padding: 0 }}
			wraper={{
				background: theme === 'dark' ? '#001529' : '#0773bb',
			}}
		>
			<div className='flex items-center text-white font-bold'>
				<div className='logo' style={{ padding: 16 }}>
					<img src={Logo} alt='Logo' width='36' height='36' />
				</div>
				<div>{formatMessage({ id: 'global.header.application' })}</div>
			</div>
			<AppMenu theme={theme === 'dark' ? 'dark' : 'light'} />
		</Drawer>
	)
}

export default ResponsiveDrawer
