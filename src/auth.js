import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const keycloakConfig = {
	url: 'http://localhost:18080/realms/equb/protocol/openid-connect/token',
	clientId: 'equb-public-client',
	grantType: 'password',
}

export const login = async (username, password) => {
	try {
		const response = await axios.post(
			keycloakConfig.url,
			new URLSearchParams({
				client_id: keycloakConfig.clientId,
				grant_type: keycloakConfig.grantType,
				username: username,
				password: password,
			}),
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}
		)

		const { access_token, refresh_token } = response.data

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
