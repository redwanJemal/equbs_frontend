/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import * as signalR from '@microsoft/signalr'
import { getToken } from '../auth' // Import the getToken function to retrieve the token
import notificationSoundFile from '@/assets/notification.wav' // Import the notification sound file
import { useSelector } from 'react-redux'

const ChatPage = () => {
	const BASE_URL = import.meta.env.VITE_BASE_URL

	const [connection, setConnection] = useState(null)
	const [messages, setMessages] = useState([])
	const [message, setMessage] = useState('')
	const [recipientIds, setRecipientIds] = useState('')
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
						console.log('Connected!')

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
		console.log(connection)
		if (
			connection &&
			connection.state === signalR.HubConnectionState.Connected
		) {
			try {
				const recipientArray = recipientIds.split(',').map((id) => id.trim())
				if (recipientArray.length > 1) {
					console.log('Sending message to multiple users')
					await connection.send('SendMessageToUsers', recipientArray, message)
				} else {
					console.log('Sending message to a single user')
					await connection.send('SendMessageToUser', recipientArray[0], message)
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
