import axiosInstance from '@/middlewares/axios'

const getAllSubscriptions = async (params) => {
	let url = 'api/v1/equb-subscription'
	if (params) url = url.concat(params)
	const response = await axiosInstance.get(url)
	return response
}

const createSubscription = async (payload) => {
	const url = 'api/v1/equb-subscription'
	const response = await axiosInstance.post(url, payload)
	return response
}

const updateSubscription = async (id, payload) => {
	const url = `api/v1/equb-subscription/${id}`
	const response = await axiosInstance.put(url, payload)
	return response
}

const getSubscriptionById = async (id) => {
	const url = `api/v1/equb-subscription/${id}`
	const response = await axiosInstance.get(url)
	return response
}

const deleteSubscription = async (id) => {
	const url = `api/v1/equb-subscription/${id}`
	const response = await axiosInstance.delete(url)
	return response
}

const approveSubscription = async (id) => {
	const url = `api/v1/equb-subscription/${id}/approve`
	const response = await axiosInstance.put(url)
	return response
}

export default {
	getAllSubscriptions,
	createSubscription,
	updateSubscription,
	getSubscriptionById,
	deleteSubscription,
	approveSubscription,
}
