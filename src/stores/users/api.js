import {
	USER_CREATE_URL,
	USER_DELETE_URL,
	USER_GET_BY_ID_URL,
	USER_LIST_ALL_URL,
	USER_UPDATE_URL,
} from '@/constants/apiUrls'
import axiosInstance from '@/middlewares/axios'

const GetAllUsers = async (params) => {
	let url = USER_LIST_ALL_URL
	if (params) url = url.concat(params)
	const response = await axiosInstance.get(url)
	return response
}

const CreateUser = async (payload) => {
	const url = USER_CREATE_URL
	const response = await axiosInstance.post(url, payload)
	return response
}

const UpdateUser = async ({ id, payload }) => {
	const url = `${USER_UPDATE_URL}/${id}`
	const response = await axiosInstance.post(url, payload)
	return response
}

const GetUserById = async (id) => {
	const url = `${USER_GET_BY_ID_URL}/${id}`
	const response = await axiosInstance.get(url)
	return response
}

const DeleteUser = async (id) => {
	const url = `${USER_DELETE_URL}/${id}`
	const response = await axiosInstance.delete(url)
	return response
}

export default {
	CreateUser,
	UpdateUser,
	GetAllUsers,
	GetUserById,
	DeleteUser,
}
