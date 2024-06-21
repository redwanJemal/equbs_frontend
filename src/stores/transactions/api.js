import {
	TRANSACTION_CREATE_URL,
	TRANSACTION_UPDATE_URL,
	TRANSACTION_APPROVE_URL,
	TRANSACTION_GET_ALL_URL,
	TRANSACTION_GET_BY_ID_URL,
	TRANSACTION_DELETE_URL,
	TRANSACTION_REACTIVATE_URL,
} from '@/constants/apiUrls'
import axiosInstance from '@/middlewares/axios'

const getAllTransactions = async (params) => {
	let url = TRANSACTION_GET_ALL_URL
	if (params) url = url.concat(params)
	const response = await axiosInstance.get(url)
	return response
}

const createTransaction = async (payload) => {
	const url = TRANSACTION_CREATE_URL
	const response = await axiosInstance.post(url, payload)
	return response
}

const updateTransaction = async (id, payload) => {
	const url = TRANSACTION_UPDATE_URL.replace('{id}', id)
	const response = await axiosInstance.put(url, payload)
	return response
}

const approveTransaction = async (id) => {
	const url = TRANSACTION_APPROVE_URL.replace('{id}', id)
	const response = await axiosInstance.post(url)
	return response
}

const getTransactionById = async (id) => {
	const url = TRANSACTION_GET_BY_ID_URL.replace('{id}', id)
	const response = await axiosInstance.get(url)
	return response
}

const deleteTransaction = async (id) => {
	const url = TRANSACTION_DELETE_URL.replace('{id}', id)
	const response = await axiosInstance.delete(url)
	return response
}

const reactivateTransaction = async (id) => {
	const url = TRANSACTION_REACTIVATE_URL.replace('{id}', id)
	const response = await axiosInstance.post(url)
	return response
}

export default {
	getAllTransactions,
	createTransaction,
	updateTransaction,
	approveTransaction,
	getTransactionById,
	deleteTransaction,
	reactivateTransaction,
}
