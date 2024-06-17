import { createAsyncThunk } from '@reduxjs/toolkit'
import api from './api'

const GetAllReferrals = createAsyncThunk(
	'get:api/v1/referrals',
	async (payload) => {
		const response = await api.GetAllReferrals(payload)
		const data = response.data
		const status = response.status
		return { data, status }
	}
)

const CreateReferral = createAsyncThunk(
	'post:api/v1/referrals/create',
	async ({ payload }, { rejectWithValue }) => {
		try {
			const response = await api.CreateReferral(payload)
			const data = payload
			const status = response.status
			if (status === 204 || status === 200) {
				data['id'] = response.data
			}
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const UpdateReferral = createAsyncThunk(
	'post:api/v1/referrals/update',
	async ({ payload }, { rejectWithValue }) => {
		try {
			const response = await api.CreateReferral(payload)
			const data = payload
			const status = response.status
			if (status === 204 || status === 200) {
				data['id'] = response.data
			}
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const AcceptReferral = createAsyncThunk(
	'post:api/v1/referrals/{id}/accept',
	async (id, { rejectWithValue }) => {
		try {
			const response = await api.AcceptReferral(id)
			const data = id
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const RejectReferral = createAsyncThunk(
	'post:api/v1/referrals/{id}/reject',
	async (id, { rejectWithValue }) => {
		try {
			const response = await api.RejectReferral(id)
			const data = id
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const GetReferralOut = createAsyncThunk(
	'get:api/v1/referrals/out',
	async (payload) => {
		const response = await api.GetReferralOut(payload)
		const data = response.data
		const status = response.status
		return { data, status }
	}
)

const GetReferralIn = createAsyncThunk(
	'get:api/v1/referrals/in',
	async (payload) => {
		const response = await api.GetReferralIn(payload)
		const data = response.data
		const status = response.status
		return { data, status }
	}
)

export {
	CreateReferral,
	UpdateReferral,
	AcceptReferral,
	RejectReferral,
	GetAllReferrals,
	GetReferralOut,
	GetReferralIn,
}
