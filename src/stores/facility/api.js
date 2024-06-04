import {
	FACILITY_CREATE_URL,
	FACILITY_GET_BY_ID_URL,
	FACILITY_LIST_ALL_URL,
	FACILITY_UPDATE_URL,
} from '@/constants/apiUrls'
import axiosInstance from '@/middlewares/axios'

const GetAllFacilities = async (params) => {
	let url = FACILITY_LIST_ALL_URL
	if (params) url = url.concat(params)
	const response = await axiosInstance.get(url)
	return response
}

const CreateFacility = async (payload) => {
	const url = FACILITY_CREATE_URL
	const response = await axiosInstance.post(url, payload)
	return response
}

const UpdateFacility = async ({ id, payload }) => {
	const url = `${FACILITY_UPDATE_URL}/${id}`
	const response = await axiosInstance.put(url, payload)
	return response
}

const GetFacilityById = async (id) => {
	const url = `${FACILITY_GET_BY_ID_URL}/${id}`
	const response = await axiosInstance.get(url)
	return response
}

const DeleteFacility = async (id) => {
	const url = `${FACILITY_GET_BY_ID_URL}/${id}/deactivate`
	const response = await axiosInstance.put(url)
	return response
}

const ReactivateFacility = async (id) => {
	const url = `${FACILITY_GET_BY_ID_URL}/${id}/activate`
	const response = await axiosInstance.put(url)
	return response
}

export default {
	CreateFacility,
	UpdateFacility,
	GetAllFacilities,
	GetFacilityById,
	DeleteFacility,
	ReactivateFacility,
}
