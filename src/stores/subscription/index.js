import { createSlice } from '@reduxjs/toolkit'
import {
	CreateSubscription,
	GetAllSubscriptions,
	UpdateSubscription,
} from './thunk'

export const subscriptionSlice = createSlice({
	name: 'subscriptions',
	initialState: {
		loading: false,
		subscriptions: [],
		selectedSubscription: null,
		highlightedRowId: null,
		queryParameters: {
			page: 1,
			pageSize: 10,
			filters: {},
			term: '',
			orderBy: '',
			descending: false,
		},
		error: null,
		meta: {
			limit: 10,
			page: 1,
		},
	},
	reducers: {
		setSubscriptionQueryParameters(state, action) {
			state.queryParameters = { ...state.queryParameters, ...action.payload }
		},
		resetSelectedSubscription(state) {
			state.selectedSubscription = null
		},
		resetHighlightedRow(state) {
			state.highlightedRowId = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(GetAllSubscriptions.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(GetAllSubscriptions.fulfilled, (state, action) => {
				state.subscriptions = action.payload.data.items
				state.meta = action.payload.data.meta
				state.loading = 'idle'
			})
			.addCase(GetAllSubscriptions.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(CreateSubscription.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(CreateSubscription.fulfilled, (state, action) => {
				var subscription = action.payload.data
				console.log(subscription)
				state.subscriptions.unshift(subscription)
				state.highlightedRowId = subscription.id // Set highlightedRowId
				state.loading = 'idle'
			})
			.addCase(CreateSubscription.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(UpdateSubscription.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(UpdateSubscription.fulfilled, (state, action) => {
				const index = state.subscriptions.findIndex(
					(sub) => sub.id === action.payload.data.id
				)
				if (index !== -1) {
					state.subscriptions[index] = action.payload.data
				}
				state.loading = 'idle'
			})
			.addCase(UpdateSubscription.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
	},
})

export const {
	setSubscriptionQueryParameters,
	resetSelectedSubscription,
	resetHighlightedRow,
} = subscriptionSlice.actions

export { CreateSubscription, UpdateSubscription, GetAllSubscriptions }
export default subscriptionSlice.reducer
