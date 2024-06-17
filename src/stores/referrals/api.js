import {
	REFERRAL_CREATE_URL,
	REFERRAL_ACCEPT_URL,
	REFERRAL_REJECT_URL,
	REFERRAL_GET_ALL_URL,
	REFERRAL_GET_OUT_URL,
	REFERRAL_GET_IN_URL,
} from '@/constants/apiUrls'
import axiosInstance from '@/middlewares/axios'

const GetAllReferrals = async (params) => {
	let url = REFERRAL_GET_ALL_URL
	if (params) url = url.concat(params)
	const response = await axiosInstance.get(url)
	return response
}

const CreateReferral = async (payload) => {
	const url = REFERRAL_CREATE_URL
	const response = await axiosInstance.post(url, payload)
	return response
}

const AcceptReferral = async (id) => {
	const url = REFERRAL_ACCEPT_URL.replace('{id}', id)
	const response = await axiosInstance.post(url)
	return response
}

const RejectReferral = async (id) => {
	const url = REFERRAL_REJECT_URL.replace('{id}', id)
	const response = await axiosInstance.post(url)
	return response
}

const GetReferralOut = async (params) => {
	let url = REFERRAL_GET_OUT_URL
	if (params) url = url.concat(params)
	const response = await axiosInstance.get(url)
	return response
}

const GetReferralIn = async (params) => {
	let url = REFERRAL_GET_IN_URL
	if (params) url = url.concat(params)
	const response = await axiosInstance.get(url)
	return response
}

export default {
	CreateReferral,
	AcceptReferral,
	RejectReferral,
	GetAllReferrals,
	GetReferralOut,
	GetReferralIn,
}
