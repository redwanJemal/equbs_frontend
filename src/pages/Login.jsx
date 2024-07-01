/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Button, Checkbox, message } from '@/components'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Logo from '@/assets/equb.png'
import { login } from '@/auth'
import { setUserProfile, userLogout } from '@/stores/users'

const LoginForm = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)

	const onFinish = async (values) => {
		setLoading(true)
		try {
			const { userInfo } = await login(values.username, values.password)
			dispatch(setUserProfile(userInfo)) // Save the user profile to the Redux store
			message.success('Login successful!')
			navigate('/dashboard') // Navigate to the dashboard page
		} catch (error) {
			console.error('Login failed:', error)
			message.error('Login failed. Please check your credentials.')
			dispatch(userLogout()) // Clear the user profile in case of login failure
		} finally {
			setLoading(false)
		}
	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
		message.error('Login failed. Please check your credentials.')
	}

	return (
		<div className='flex min-h-screen flex-1'>
			<div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
				<div className='mx-auto w-full max-w-sm lg:w-96'>
					<div className='text-center mb-6'>
						<img src={Logo} alt='logo' className='w-12 mx-auto' />
						<h2 className='mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900'>
							Ebrish Equb
						</h2>
					</div>
					<Form
						name='login'
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						initialValues={{ autoLogin: true }}
						className='space-y-6'
					>
						<Form.Item
							name='username'
							rules={[
								{ required: true, message: 'Please enter your username!' },
							]}
						>
							<Input
								size='large'
								prefix={<UserOutlined className='prefixIcon' />}
								placeholder='Username'
							/>
						</Form.Item>
						<Form.Item
							name='password'
							rules={[
								{ required: true, message: 'Please enter your password!' },
							]}
						>
							<Input.Password
								size='large'
								prefix={<LockOutlined className='prefixIcon' />}
								placeholder='Password'
							/>
						</Form.Item>
						<Form.Item>
							<Form.Item name='autoLogin' valuePropName='checked' noStyle>
								<Checkbox>Auto login</Checkbox>
							</Form.Item>
							<a className='float-right'>Forgot password</a>
						</Form.Item>
						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
								className='w-full'
								loading={loading}
							>
								Login
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
			<div className='relative hidden w-0 flex-1 lg:block'>
				<img
					className='absolute inset-0 h-full w-full object-cover'
					src='https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80'
					alt=''
				/>
			</div>
		</div>
	)
}

export default LoginForm
