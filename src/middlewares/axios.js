import axios from 'axios'
import { getToken } from '../auth'

const BASE_URL = import.meta.env.VITE_BASE_URL

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	// withCredentials: false,
})

axiosInstance.interceptors.request.use(
	(config) => {
		const token = getToken()
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			window.location = '/login' // Redirect to the login page
		}
		return Promise.reject(error)
	}
)

export default axiosInstance
