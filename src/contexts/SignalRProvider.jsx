/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect, useContext } from 'react'
import * as signalR from '@microsoft/signalr'
import { getToken } from '../auth'
import notificationSoundFile from '@/assets/notification.wav'
import { useSelector } from 'react-redux'

// Create a context for SignalR
const SignalRContext = createContext()

// Create a provider component
export const SignalRProvider = ({ children }) => {
	const [connection, setConnection] = useState(null)
	const [messages, setMessages] = useState([])
	const [unreadCount, setUnreadCount] = useState(0)
	const profile = useSelector((state) => state.users.profile)

	const notificationSound = new Audio(notificationSoundFile)

	useEffect(() => {
		const BASE_URL = import.meta.env.VITE_BASE_URL
		const token = getToken()

		const newConnection = new signalR.HubConnectionBuilder()
			.withUrl(`${BASE_URL}chathub`, {
				accessTokenFactory: () => token,
				withCredentials: true,
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
							if (senderId !== profile?.identityId) {
								setUnreadCount((prevCount) => prevCount + 1)
								notificationSound.play()
							}
						})
					})
					.catch((e) => console.log('Connection failed: ', e))
			}
		}
	}, [connection])

	const clearUnreadCount = () => {
		setUnreadCount(0)
	}

	return (
		<SignalRContext.Provider
			value={{ connection, messages, unreadCount, clearUnreadCount }}
		>
			{children}
		</SignalRContext.Provider>
	)
}

// Custom hook to use the SignalR context
export const useSignalR = () => {
	return useContext(SignalRContext)
}
