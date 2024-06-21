import axiosInstance from '@/middlewares/axios'

const EQUB_CREATE_URL = '/api/v1/equbs'
const EQUB_UPDATE_URL = '/api/v1/equbs/{id}'
const EQUB_GET_ALL_URL = '/api/v1/equbs'
const EQUB_GET_BY_ID_URL = '/api/v1/equbs/{id}'

const createEqub = async (payload) => {
	const response = await axiosInstance.post(EQUB_CREATE_URL, payload)
	return response
}

const updateEqub = async (id, payload) => {
	const url = EQUB_UPDATE_URL.replace('{id}', id)
	const response = await axiosInstance.put(url, payload)
	return response
}

const getAllEqubs = async (params) => {
	let url = EQUB_GET_ALL_URL
	if (params) url = `${url}?${new URLSearchParams(params).toString()}`
	const response = await axiosInstance.get(url)
	return response
}

const getEqubById = async (id) => {
	const url = EQUB_GET_BY_ID_URL.replace('{id}', id)
	const response = await axiosInstance.get(url)
	return response
}

export default {
	createEqub,
	updateEqub,
	getAllEqubs,
	getEqubById,
}
