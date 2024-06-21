import axios from 'axios'

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

		return response.data
	} catch (error) {
		console.error('Login error:', error)
		throw error
	}
}

export const getToken = () => {
	return localStorage.getItem('access_token')
}

export const logout = () => {
	localStorage.removeItem('access_token')
	localStorage.removeItem('refresh_token')
}
