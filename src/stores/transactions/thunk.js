import { createAsyncThunk } from '@reduxjs/toolkit'
import api from './api'

const GetAllTransactions = createAsyncThunk(
	'get:api/v1/transactions',
	async (payload) => {
		const response = await api.getAllTransactions(payload)
		const data = response.data
		const status = response.status
		return { data, status }
	}
)

const CreateTransaction = createAsyncThunk(
	'post:api/v1/transactions/create',
	async ({ payload }, { rejectWithValue }) => {
		try {
			const response = await api.createTransaction(payload)
			const data = response.data
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const UpdateTransaction = createAsyncThunk(
	'put:api/v1/transactions/update',
	async ({ id, payload }, { rejectWithValue }) => {
		try {
			const response = await api.updateTransaction(id, payload)
			const data = payload
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const ApproveTransaction = createAsyncThunk(
	'post:api/v1/transactions/{id}/approve',
	async (id, { rejectWithValue }) => {
		try {
			const response = await api.approveTransaction(id)
			const data = id
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const GetTransactionById = createAsyncThunk(
	'get:api/v1/transactions/{id}',
	async ({ id }, { rejectWithValue }) => {
		try {
			const response = await api.getTransactionById(id)
			const data = response.data
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const DeleteTransaction = createAsyncThunk(
	'delete:api/v1/transactions/{id}',
	async (id, { rejectWithValue }) => {
		try {
			const response = await api.deleteTransaction(id)
			const data = id
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const ReactivateTransaction = createAsyncThunk(
	'post:api/v1/transactions/{id}/reactivate',
	async (id, { rejectWithValue }) => {
		try {
			const response = await api.reactivateTransaction(id)
			const data = id
			const status = response.status
			return { data, status }
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

export {
	GetAllTransactions,
	CreateTransaction,
	UpdateTransaction,
	ApproveTransaction,
	GetTransactionById,
	DeleteTransaction,
	ReactivateTransaction,
}
