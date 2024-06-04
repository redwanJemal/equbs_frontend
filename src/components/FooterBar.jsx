/* eslint-disable no-unused-vars */
import React from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

const FooterBar = () => {
	return (
		<Footer
			style={{
				textAlign: 'center',
				width: '100%',
				position: 'fixed',
				bottom: 0,
			}}
		>
			©2024 Created by Your Company
		</Footer>
	)
}

export default FooterBar
