import { createAsyncThunk } from '@reduxjs/toolkit'
import api from './api'

export const GetAllSubscriptions = createAsyncThunk(
	'get:api/v1/subscriptions',
	async (payload) => {
		const response = await api.getAllSubscriptions(payload)
		const data = response.data
		const status = response.status
		return { data, status }
	}
)

export const CreateSubscription = createAsyncThunk(
	'post:api/v1/subscriptions',
	async ({ payload }, { rejectWithValue }) => {
		try {
			const response = await api.createSubscription(payload)
			const data = response.data
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

export const UpdateSubscription = createAsyncThunk(
	'put:api/v1/subscriptions',
	async ({ id, payload }, { rejectWithValue }) => {
		try {
			const response = await api.updateSubscription(id, payload)
			const data = payload
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)
