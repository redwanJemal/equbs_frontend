import { createAsyncThunk } from '@reduxjs/toolkit'
import api from './api'

const GetAllUsers = createAsyncThunk('get:api/v1/users', async (payload) => {
	const response = await api.GetAllUsers(payload)
	// Extracting only the serializable parts of the response
	const data = response.data
	const status = response.status
	return { data, status }
})

const CreateUser = createAsyncThunk(
	'post:api/v1/users/create',
	async ({ payload }, { rejectWithValue }) => {
		try {
			const response = await api.CreateUser(payload)
			const data = response.data
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const GetUserById = createAsyncThunk(
	'get:api/v1/users/{id}',
	async ({ id }, { rejectWithValue }) => {
		try {
			const response = await api.GetUserById(id)
			const data = response.data
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const UpdateUser = createAsyncThunk(
	'post:api/v1/users/update',
	async ({ id, payload }, { rejectWithValue }) => {
		try {
			const response = await api.UpdateUser({ id, payload })
			const data = response.data
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const DeleteUser = createAsyncThunk(
	'get:api/v1/users/delete/{id}',
	async (id, { rejectWithValue }) => {
		try {
			const response = await api.DeleteUser(id)
			const data = response.data
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

export { CreateUser, UpdateUser, GetAllUsers, GetUserById, DeleteUser }
