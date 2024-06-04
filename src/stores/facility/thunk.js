import { createAsyncThunk } from '@reduxjs/toolkit'
import api from './api'

const GetAllFacilities = createAsyncThunk(
	'get:api/v1/facilities',
	async (payload) => {
		const response = await api.GetAllFacilities(payload)
		const data = response.data
		const status = response.status
		return { data, status }
	}
)

const CreateFacility = createAsyncThunk(
	'post:api/v1/facilities/create',
	async ({ payload }, { rejectWithValue }) => {
		try {
			const response = await api.CreateFacility(payload)
			const data = response.data
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const GetFacilityById = createAsyncThunk(
	'get:api/v1/facilities/{id}',
	async ({ id }, { rejectWithValue }) => {
		try {
			const response = await api.GetFacilityById(id)
			const data = response.data
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const UpdateFacility = createAsyncThunk(
	'post:api/v1/facilities/',
	async ({ id, payload }, { rejectWithValue }) => {
		try {
			const response = await api.UpdateFacility({ id, payload })
			const data = response.data
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const DeleteFacility = createAsyncThunk(
	'get:api/v1/facilities/{id}/deactivate',
	async (id, { rejectWithValue }) => {
		try {
			const response = await api.DeleteFacility(id)
			const data = id
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const ReactivateFacility = createAsyncThunk(
	'get:api/v1/facilities/{id}/reactivate',
	async (id, { rejectWithValue }) => {
		try {
			const response = await api.ReactivateFacility(id)
			const data = id
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

export {
	CreateFacility,
	UpdateFacility,
	GetAllFacilities,
	GetFacilityById,
	DeleteFacility,
	ReactivateFacility,
}
