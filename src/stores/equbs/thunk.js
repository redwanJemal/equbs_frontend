import { createAsyncThunk } from '@reduxjs/toolkit'
import api from './api'

const createEqub = createAsyncThunk(
	'equbs/create',
	async ({ payload }, { rejectWithValue }) => {
		try {
			const response = await api.createEqub(payload)
			const data = response.data
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const updateEqub = createAsyncThunk(
	'equbs/update',
	async ({ id, payload }, { rejectWithValue }) => {
		try {
			const response = await api.updateEqub(id, payload)
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

const getAllEqubs = createAsyncThunk('equbs/getAll', async (params) => {
	const response = await api.getAllEqubs(params)
	const data = response.data
	const status = response.status
	return { data, status }
})

const getEqubById = createAsyncThunk(
	'equbs/getById',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await api.getEqubById(payload.id)
			const data = response.data
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

export { createEqub, updateEqub, getAllEqubs, getEqubById }
