/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from '@/components'
import { useSelector } from 'react-redux'
import HeaderBar from '@/components/HeaderBar'
import ResponsiveDrawer from '@/components/ResponsiveDrawer'
import SiderMenu from '@/components/SideMenu'

const ResponsiveLayout = () => {
	const [collapsed, setCollapsed] = useState(false)
	const [mobileView, setMobileView] = useState(window.innerWidth <= 768)
	const [drawerVisible, setDrawerVisible] = useState(false)
	const theme = useSelector((state) => state.global.theme)

	const toggle = () => {
		if (mobileView) {
			setDrawerVisible(!drawerVisible)
		} else {
			setCollapsed(!collapsed)
		}
	}

	const handleResize = () => {
		if (window.innerWidth <= 768) {
			setMobileView(true)
			setCollapsed(true)
		} else {
			setMobileView(false)
			setCollapsed(false)
			setDrawerVisible(false)
		}
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<Layout className={`bg-1 theme-${theme}`} style={{ minHeight: '100vh' }}>
			{!mobileView && <SiderMenu collapsed={collapsed} />}
			<Layout className='site-layout'>
				<HeaderBar collapsed={collapsed} toggle={toggle} />
				{/* <ContentArea /> */}
				<div className='px-4'>
					<Outlet />
				</div>
				{/* <FooterBar /> */}
			</Layout>
			{mobileView && (
				<ResponsiveDrawer
					visible={drawerVisible}
					onClose={() => setDrawerVisible(false)}
				/>
			)}
		</Layout>
	)
}

export default ResponsiveLayout
