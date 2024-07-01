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
	highlightedRowId: null,
	profile: null, // Add profile state
	error: null,
	meta: {
		limit: 10,
		page: 1,
	},
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserQueryParameters(state, action) {
			state.queryParameters = { ...state.queryParameters, ...action.payload }
		},
		resetSelectedUser(state) {
			state.selectedUser = null
		},
		resetHighlightedRow(state) {
			state.highlightedRowId = null
		},
		setUserProfile(state, action) {
			state.profile = action.payload
			localStorage.setItem('user_info', JSON.stringify(action.payload)) // Save profile to local storage
		},
		userLogout(state) {
			state.profile = null
			localStorage.removeItem('access_token')
			localStorage.removeItem('refresh_token')
			localStorage.removeItem('user_info')
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
				state.users.unshift(action.payload.data)
				state.loading = 'idle'
				state.highlightedRowId = action.payload.data.id
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
				state.highlightedRowId = updatedUser.id
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
	setUserProfile,
	userLogout,
} = userSlice.actions

export { CreateUser, UpdateUser, GetAllUsers, GetUserById, DeleteUser }

export default userSlice.reducer
