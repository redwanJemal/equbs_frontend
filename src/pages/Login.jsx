/* eslint-disable no-unused-vars */
import React from 'react'
import {
	LockOutlined,
	UserOutlined,
	AlipayCircleOutlined,
	TaobaoCircleOutlined,
	WeiboCircleOutlined,
} from '@ant-design/icons'
import { Form, Input, Button, Checkbox, Space, message, theme } from 'antd'
import { useNavigate } from 'react-router-dom'

import Logo from '@/assets/logomoh.png'

const LoginForm = () => {
	const { token } = theme.useToken()
	const navigate = useNavigate()

	const iconStyles = {
		marginInlineStart: '16px',
		color: `rgba(${token.colorTextBase}, 0.2)`,
		fontSize: '24px',
		verticalAlign: 'middle',
		cursor: 'pointer',
	}

	const onFinish = (values) => {
		console.log('Success:', values)
		message.success('Login successful!')
		navigate('/dashboard') // Navigate to the dashboard page
	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
		message.error('Login failed. Please check your credentials.')
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='bg-white p-6 max-w-lg mx-auto shadow-lg rounded-lg w-full'>
				<div className='text-center mb-6'>
					<img src={Logo} alt='logo' className='w-12 mx-auto' />
					<h2 className='text-2xl font-semibold'>MOH</h2>
					<p className='text-gray-600'>Electronic Referral System</p>
				</div>
				<Form
					name='login'
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					initialValues={{ autoLogin: true }}
				>
					<Form.Item
						name='username'
						rules={[{ required: true, message: 'Please enter your username!' }]}
					>
						<Input
							size='large'
							prefix={<UserOutlined className='prefixIcon' />}
							placeholder='Username: admin or user'
						/>
					</Form.Item>
					<Form.Item
						name='password'
						rules={[{ required: true, message: 'Please enter your password!' }]}
					>
						<Input.Password
							size='large'
							prefix={<LockOutlined className='prefixIcon' />}
							placeholder='Password: ant.design'
						/>
					</Form.Item>
					<Form.Item>
						<Form.Item name='autoLogin' valuePropName='checked' noStyle>
							<Checkbox>Auto login</Checkbox>
						</Form.Item>
						<a className='float-right'>Forgot password</a>
					</Form.Item>
					<Form.Item>
						<Button type='primary' htmlType='submit' className='w-full'>
							Login
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}

export default LoginForm