/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import * as signalR from '@microsoft/signalr'
import { getToken } from '../auth' // Import the getToken function to retrieve the token

const ChatPage = () => {
	const [connection, setConnection] = useState(null)
	const [messages, setMessages] = useState([])
	const [message, setMessage] = useState('')
	const [recipientIds, setRecipientIds] = useState('')

	useEffect(() => {
		const token = getToken() // Retrieve the token

		const newConnection = new signalR.HubConnectionBuilder()
			.withUrl('https://localhost:59101/chathub', {
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
						console.log('Connected!')

						connection.on('ReceiveMessage', (senderId, message) => {
							setMessages((messages) => [...messages, { senderId, message }])
						})
					})
					.catch((e) => console.log('Connection failed: ', e))
			}
		}
	}, [connection])

	const sendMessage = async () => {
		console.log(connection)
		if (
			connection &&
			connection.state === signalR.HubConnectionState.Connected
		) {
			try {
				const recipientArray = recipientIds.split(',').map((id) => id.trim())
				if (recipientArray.length > 1) {
					console.log('we are here sending for many users')
					await connection.send(
						'SendMessageToUsers',
						recipientArray,
						'3564fe7c-6903-48f7-a804-04914f34f0fc',
						message
					)
				} else {
					console.log('we are here sending for single user')
					await connection.send(
						'SendMessageToUser',
						recipientArray[0],
						'3564fe7c-6903-48f7-a804-04914f34f0fc',
						message
					)
				}
				setMessage('')
			} catch (e) {
				console.log(e)
			}
		} else {
			alert('No connection to server yet.')
		}
	}

	return (
		<div className='flex flex-col items-center p-6 bg-gray-100 min-h-screen'>
			<h1 className='text-2xl font-bold mb-4'>Chat</h1>
			<div className='w-full max-w-md'>
				<input
					type='text'
					value={recipientIds}
					onChange={(e) => setRecipientIds(e.target.value)}
					placeholder='Recipient IDs (comma-separated)'
					className='w-full p-2 mb-4 border rounded'
				/>
				<input
					type='text'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder='Message'
					className='w-full p-2 mb-4 border rounded'
				/>
				<button
					onClick={sendMessage}
					className='w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
				>
					Send
				</button>
			</div>
			<div className='w-full max-w-md mt-6'>
				<h2 className='text-xl font-semibold mb-2'>Messages</h2>
				<div className='bg-white p-4 border rounded shadow'>
					{messages.map((m, index) => (
						<div key={index} className='mb-2'>
							<strong>{m.senderId}</strong>: {m.message}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default ChatPage
