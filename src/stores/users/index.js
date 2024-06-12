import { createSlice } from '@reduxjs/toolkit'
import {
	CreateUser,
	UpdateUser,
	GetAllUsers,
	GetUserById,
	DeleteUser,
} from './thunk'

const initialState = {
	loading: false,
	detailLoading: false,
	users: [],
	selectedUser: null,
	highlightedRowId: null, // Add highlightedRowId to state
	error: null,
	meta: {
		limit: 10,
		page: 1,
	},
}

const userlSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserQueryParameters(state, action) {
			state.queryParameters = { ...state.queryParameters, ...action.payload }
		},
		resetSelectedUser(state) {
			console.log('setting selected user')
			state.selectedUser = null
		},
		resetHighlightedRow(state) {
			state.highlightedRowId = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(GetAllUsers.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(GetAllUsers.fulfilled, (state, action) => {
				state.users = action.payload.data.items
				state.meta = action.payload.data.meta
				state.loading = 'idle'
			})
			.addCase(GetAllUsers.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(GetUserById.pending, (state) => {
				state.loading = 'pending'
				state.detailLoading = 'pending'
			})
			.addCase(GetUserById.fulfilled, (state, action) => {
				console.log(action.payload.data)
				state.selectedUser = action.payload.data
				state.detailLoading = 'idle'
				state.loading = 'idle'
			})
			.addCase(GetUserById.rejected, (state, action) => {
				state.detailLoading = 'idle'
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(CreateUser.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(CreateUser.fulfilled, (state, action) => {
				state.users.unshift(action.payload.data.data)
				state.loading = 'idle'
				state.highlightedRowId = action.payload.data.data.id // Set highlightedRowId
			})
			.addCase(CreateUser.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(UpdateUser.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(UpdateUser.fulfilled, (state, action) => {
				const updatedUser = action.payload.data.data
				state.users = state.users.map((user) =>
					user.id === updatedUser.id ? updatedUser : user
				)
				state.loading = 'idle'
				state.highlightedRowId = updatedUser.id // Set highlightedRowId
			})
			.addCase(UpdateUser.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(DeleteUser.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(DeleteUser.fulfilled, (state, action) => {
				const deletedUserId = action.payload.data.data
				state.users = state.users.filter((user) => user.id !== deletedUserId)
				state.loading = 'idle'
			})
			.addCase(DeleteUser.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
	},
})

export const {
	setUserQueryParameters,
	resetSelectedUser,
	resetHighlightedRow,
} = userlSlice.actions

export { CreateUser, UpdateUser, GetAllUsers, GetUserById, DeleteUser }

export default userlSlice.reducer
