/* eslint-disable no-unused-vars */
import React from 'react'
import { Layout, Card, Row, Col } from '@/components'
import { useSelector } from 'react-redux'

const { Content } = Layout

const ContentArea = () => {
	const theme = useSelector((state) => state.global.theme) // Fetch the theme from the Redux store

	const exampleContent = []
	for (let i = 0; i < 10; i++) {
		exampleContent.push(
			<Col span={8} key={i} style={{ marginBottom: '16px' }}>
				<Card
					title={`Card ${i + 1}`}
					bordered={false}
					className={`card-${theme}`}
				>
					Example content for card {i + 1}.
				</Card>
			</Col>
		)
	}

	return (
		<Content
			style={{
				margin: '24px 16px',
				padding: 24,
				minHeight: 280,
				overflowY: 'auto', // Make content scrollable
				maxHeight: 'calc(100vh - 128px)', // Adjust height for header and footer
			}}
		>
			<Row gutter={16}>{exampleContent}</Row>
		</Content>
	)
}

export default ContentArea
