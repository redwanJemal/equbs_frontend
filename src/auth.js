import { jwtDecode } from 'jwt-decode'
import axiosInstance from './middlewares/axios'

export const login = async (username, password) => {
	try {
		const response = await axiosInstance.post('/api/v1/auth/login', {
			username,
			password,
		})

		const { access_token, refresh_token, roles } = response.data

		// Store tokens in localStorage or sessionStorage
		localStorage.setItem('access_token', access_token)
		localStorage.setItem('refresh_token', refresh_token)

		// Decode the access token to extract user information
		const decodedToken = jwtDecode(access_token)
		const userInfo = {
			name: decodedToken.name,
			preferred_username: decodedToken.preferred_username,
			email: decodedToken.email,
			email_verified: decodedToken.email_verified,
			identityId: decodedToken.sub,
			roles: roles, // Add roles here
		}

		// Store user info in localStorage or sessionStorage
		localStorage.setItem('user_info', JSON.stringify(userInfo))

		return { access_token, refresh_token, userInfo }
	} catch (error) {
		console.error('Login error:', error)
		throw error
	}
}

export const getToken = () => {
	return localStorage.getItem('access_token')
}

export const getUserInfo = () => {
	const userInfo = localStorage.getItem('user_info')
	return userInfo ? JSON.parse(userInfo) : null
}
