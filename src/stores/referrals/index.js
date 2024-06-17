import { createSlice } from '@reduxjs/toolkit'
import {
	CreateReferral,
	UpdateReferral,
	AcceptReferral,
	RejectReferral,
	GetAllReferrals,
	GetReferralOut,
	GetReferralIn,
} from './thunk'

const initialState = {
	loading: false,
	referrals: [],
	referralIns: [],
	referralOuts: [],
	selectedReferral: null,
	highlightedRowId: null,
	queryParameters: {
		page: 1,
		limit: 10,
		filters: {},
		include: 'facilityType',
		term: '',
		sortBy: '',
		sortOrder: '',
	},
	error: null,
	meta: {
		limit: 10,
		page: 1,
	},
}

const referralSlice = createSlice({
	name: 'referral',
	initialState,
	reducers: {
		setReferralQueryParameters(state, action) {
			state.queryParameters = { ...state.queryParameters, ...action.payload }
		},
		setReferralInQueryParameters(state, action) {
			state.queryParameters = { ...state.queryParameters, ...action.payload }
		},
		resetSelectedReferral(state) {
			state.selectedReferral = null
		},
		resetHighlightedRow(state) {
			state.highlightedRowId = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(GetAllReferrals.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(GetAllReferrals.fulfilled, (state, action) => {
				state.referrals = action.payload.data.items
				state.meta = action.payload.data.meta
				state.loading = 'idle'
			})
			.addCase(GetAllReferrals.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(CreateReferral.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(CreateReferral.fulfilled, (state, action) => {
				state.referrals.unshift(action.payload.data)
				state.loading = 'idle'
			})
			.addCase(CreateReferral.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(AcceptReferral.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(AcceptReferral.fulfilled, (state, action) => {
				const referralId = action.payload.data
				state.referrals = state.referrals.map((referral) =>
					referral.id === referralId
						? { ...referral, status: 'Accepted' }
						: referral
				)
				state.loading = 'idle'
			})
			.addCase(AcceptReferral.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(RejectReferral.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(RejectReferral.fulfilled, (state, action) => {
				const referralId = action.payload.data
				state.referrals = state.referrals.map((referral) =>
					referral.id === referralId
						? { ...referral, status: 'Rejected' }
						: referral
				)
				state.loading = 'idle'
			})
			.addCase(RejectReferral.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(GetReferralOut.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(GetReferralOut.fulfilled, (state, action) => {
				state.referralOuts = action.payload.data.items
				state.meta = action.payload.data.meta
				state.loading = 'idle'
			})
			.addCase(GetReferralOut.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(GetReferralIn.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(GetReferralIn.fulfilled, (state, action) => {
				state.referralIns = action.payload.data.items
				state.meta = action.payload.data.meta
				state.loading = 'idle'
			})
			.addCase(GetReferralIn.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
	},
})

export const {
	setReferralQueryParameters,
	setReferralInQueryParameters,
	resetSelectedReferral,
	resetHighlightedRow,
} = referralSlice.actions

export {
	CreateReferral,
	UpdateReferral,
	AcceptReferral,
	RejectReferral,
	GetAllReferrals,
	GetReferralOut,
	GetReferralIn,
}

export default referralSlice.reducer
