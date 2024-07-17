/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import * as signalR from '@microsoft/signalr'
import { getToken } from '../auth' // Import the getToken function to retrieve the token
import notificationSoundFile from '@/assets/notification.wav' // Import the notification sound file
import { useSelector } from 'react-redux'
import {
	Layout,
	List,
	Avatar,
	Input,
	Button,
	Typography,
	Modal,
	Select,
} from 'antd'
import { SendOutlined } from '@ant-design/icons'

const { Sider, Content } = Layout
const { TextArea } = Input
const { Title } = Typography
const { Option } = Select

const users = [
	{ id: 1, name: 'John Doe', avatar: 'https://via.placeholder.com/32' },
	{ id: 2, name: 'Jane Smith', avatar: 'https://via.placeholder.com/32' },
	// Add more users here
]

const ChatPage = () => {
	const BASE_URL = import.meta.env.VITE_BASE_URL
	const [connection, setConnection] = useState(null)
	const [messages, setMessages] = useState([])
	const [message, setMessage] = useState('')
	const [recipientIds, setRecipientIds] = useState([])
	const [selectedUser, setSelectedUser] = useState(null)
	const [isComposeModalVisible, setIsComposeModalVisible] = useState(false)
	const profile = useSelector((state) => state.users.profile)

	// Create a ref to store the audio element
	const notificationSound = new Audio(notificationSoundFile)

	useEffect(() => {
		const token = getToken() // Retrieve the token

		const newConnection = new signalR.HubConnectionBuilder()
			.withUrl(`${BASE_URL}chathub`, {
				accessTokenFactory: () => token, // Provide the token for authentication
				withCredentials: true, // Include credentials
			})
			.withAutomaticReconnect()
			.build()

		setConnection(newConnection)
	}, [])

	useEffect(() => {
		if (connection) {
			if (connection.state === signalR.HubConnectionState.Disconnected) {
				connection
					.start()
					.then(() => {
						connection.on('ReceiveMessage', (senderId, message) => {
							console.log('Message received:', { senderId, message })
							setMessages((messages) => [...messages, { senderId, message }])

							// Play the notification sound only if the message is not sent by the logged-in user
							if (senderId !== profile?.identityId) {
								notificationSound.play()
							}
						})
					})
					.catch((e) => console.log('Connection failed: ', e))
			}
		}
	}, [connection])

	const sendMessage = async () => {
		if (
			connection &&
			connection.state === signalR.HubConnectionState.Connected
		) {
			try {
				if (recipientIds.length > 1) {
					console.log('Sending message to multiple users')
					await connection.send('SendMessageToUsers', recipientIds, message)
				} else if (recipientIds.length === 1) {
					console.log('Sending message to a single user')
					await connection.send('SendMessageToUser', recipientIds[0], message)
				}
				setMessage('')
				setRecipientIds([])
				setIsComposeModalVisible(false)
			} catch (e) {
				console.log(e)
			}
		} else {
			alert('No connection to server yet.')
		}
	}

	const selectUser = (user) => {
		setSelectedUser(user)
		// Load user's messages here
		setMessages([
			{ id: 1, text: 'Hello!', senderId: user.id },
			{ id: 2, text: 'Hi there!', senderId: profile?.identityId },
			// Add more messages here
		])
	}

	const openComposeModal = () => {
		setIsComposeModalVisible(true)
	}

	const handleSendMessageToMultipleUsers = () => {
		if (message.trim() && recipientIds.length > 0) {
			sendMessage()
		}
	}

	return (
		<Layout className='h-[600px]'>
			<Sider
				width={300}
				className='!bg-gray-500 !text-white border border-gray-200'
			>
				<div className='p-4 flex justify-between items-center'>
					<Title level={4} className='m-0'>
						Users
					</Title>
					<Button type='primary' onClick={openComposeModal}>
						Compose
					</Button>
				</div>
				<List
					itemLayout='horizontal'
					dataSource={users}
					renderItem={(user) => (
						<List.Item
							onClick={() => selectUser(user)}
							className='cursor-pointer hover:bg-gray-300'
						>
							<List.Item.Meta
								avatar={<Avatar src={user.avatar} />}
								title={user.name}
							/>
						</List.Item>
					)}
				/>
			</Sider>
			<Content className='p-4 flex flex-col'>
				{selectedUser ? (
					<>
						<div className='flex-grow overflow-auto'>
							<div className='flex flex-col space-y-2 p-4'>
								{messages.map((message, index) => (
									<div
										key={index}
										className={`flex ${
											message.senderId === profile?.identityId
												? 'justify-end'
												: 'justify-start'
										}`}
									>
										<div
											className={`p-2 rounded-lg ${
												message.senderId === profile?.identityId
													? 'bg-[#0773bb] text-white'
													: 'bg-gray-300'
											}`}
										>
											{message.text}
										</div>
									</div>
								))}
							</div>
						</div>
						<div className='p-4 bg-white border-t border-gray-200 flex'>
							<TextArea
								rows={2}
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder='Type your message...'
								className='mb-2 flex-grow mr-2'
							/>
							<Button
								type='primary'
								onClick={sendMessage}
								icon={<SendOutlined />}
								style={{ backgroundColor: '#0773bb', borderColor: '#0773bb' }}
							>
								Send
							</Button>
						</div>
					</>
				) : (
					<div className='flex items-center justify-center h-full text-gray-500'>
						Select a user to start chatting
					</div>
				)}
			</Content>
			<Modal
				title='Compose Message'
				visible={isComposeModalVisible}
				onCancel={() => setIsComposeModalVisible(false)}
				footer={[
					<Button key='cancel' onClick={() => setIsComposeModalVisible(false)}>
						Cancel
					</Button>,
					<Button
						key='send'
						type='primary'
						onClick={handleSendMessageToMultipleUsers}
						style={{ backgroundColor: '#0773bb', borderColor: '#0773bb' }}
					>
						Send
					</Button>,
				]}
			>
				<Select
					mode='multiple'
					style={{ width: '100%' }}
					placeholder='Select users'
					value={recipientIds}
					onChange={setRecipientIds}
				>
					{users.map((user) => (
						<Option key={user.id} value={user.id}>
							{user.name}
						</Option>
					))}
				</Select>
				<TextArea
					rows={4}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder='Type your message...'
					className='mt-2'
				/>
			</Modal>
		</Layout>
	)
}

export default ChatPage
