import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	// withCredentials: false,
})

axiosInstance.interceptors.request.use(
	(config) => {
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(error)
	}
)

export default axiosInstance
