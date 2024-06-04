/* eslint-disable no-unused-vars */
import React from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
const App = () => (
	<Result
		status='403'
		title='403'
		subTitle='Sorry, you are not authorized to access this page.'
		extra={
			<Button type='primary'>
				{' '}
				<Link to='/dashboard'>Back Home</Link>
			</Button>
		}
	/>
)
export default App
