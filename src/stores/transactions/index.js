import { createSlice } from '@reduxjs/toolkit'
import {
	CreateTransaction,
	UpdateTransaction,
	ApproveTransaction,
	GetAllTransactions,
	GetTransactionById,
	DeleteTransaction,
	ReactivateTransaction,
} from './thunk'

const initialState = {
	loading: false,
	transactions: [],
	selectedTransaction: null,
	highlightedRowId: null,
	queryParameters: {
		page: 1,
		pageSize: 10,
		searchTerm: '',
		orderBy: '',
		descending: false,
	},
	error: null,
	meta: {
		limit: 10,
		page: 1,
	},
}

const transactionSlice = createSlice({
	name: 'transaction',
	initialState,
	reducers: {
		setTransactionQueryParameters(state, action) {
			state.queryParameters = { ...state.queryParameters, ...action.payload }
		},
		resetSelectedTransaction(state) {
			state.selectedTransaction = null
		},
		resetHighlightedRow(state) {
			state.highlightedRowId = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(GetAllTransactions.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(GetAllTransactions.fulfilled, (state, action) => {
				state.transactions = action.payload.data.items
				state.meta = action.payload.data.meta
				state.loading = 'idle'
			})
			.addCase(GetAllTransactions.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(CreateTransaction.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(CreateTransaction.fulfilled, (state, action) => {
				state.transactions.unshift(action.payload.data)
				state.loading = 'idle'
			})
			.addCase(CreateTransaction.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(UpdateTransaction.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(UpdateTransaction.fulfilled, (state, action) => {
				const updatedTransaction = action.payload.data
				state.transactions = state.transactions.map((transaction) =>
					transaction.id === updatedTransaction.id
						? updatedTransaction
						: transaction
				)
				state.loading = 'idle'
			})
			.addCase(UpdateTransaction.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(ApproveTransaction.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(ApproveTransaction.fulfilled, (state, action) => {
				const approvedTransactionId = action.payload.data
				state.transactions = state.transactions.map((transaction) =>
					transaction.id === approvedTransactionId
						? { ...transaction, isApproved: true }
						: transaction
				)
				state.loading = 'idle'
			})
			.addCase(ApproveTransaction.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(GetTransactionById.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(GetTransactionById.fulfilled, (state, action) => {
				state.selectedTransaction = action.payload.data
				state.loading = 'idle'
			})
			.addCase(GetTransactionById.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(DeleteTransaction.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(DeleteTransaction.fulfilled, (state, action) => {
				const deletedTransactionId = action.payload.data
				state.transactions = state.transactions.filter(
					(transaction) => transaction.id !== deletedTransactionId
				)
				state.loading = 'idle'
			})
			.addCase(DeleteTransaction.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(ReactivateTransaction.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(ReactivateTransaction.fulfilled, (state, action) => {
				const reactivatedTransactionId = action.payload.data
				state.transactions = state.transactions.map((transaction) =>
					transaction.id === reactivatedTransactionId
						? { ...transaction, isApproved: false }
						: transaction
				)
				state.loading = 'idle'
			})
			.addCase(ReactivateTransaction.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
	},
})

export const {
	setTransactionQueryParameters,
	resetSelectedTransaction,
	resetHighlightedRow,
} = transactionSlice.actions

export {
	CreateTransaction,
	UpdateTransaction,
	ApproveTransaction,
	GetAllTransactions,
	GetTransactionById,
	DeleteTransaction,
	ReactivateTransaction,
}

export default transactionSlice.reducer
