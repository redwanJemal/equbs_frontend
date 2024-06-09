import { createSlice } from '@reduxjs/toolkit'
import {
	CreateFacility,
	UpdateFacility,
	GetAllFacilities,
	GetFacilityById,
	DeleteFacility,
	ReactivateFacility,
} from './thunk'

const initialState = {
	loading: false,
	detailLoading: false,
	facilities: [],
	selectedFacility: null,
	highlightedRowId: null,
	error: null,
	queryParameters: {
		page: 1,
		limit: 10,
		filters: {},
		include: 'facilityType',
		term: '',
		sortBy: '',
		sortOrder: '',
	},
	meta: {
		limit: 10,
		page: 1,
	},
}

const facilitySlice = createSlice({
	name: 'facility',
	initialState,
	reducers: {
		setQueryParameters(state, action) {
			state.queryParameters = { ...state.queryParameters, ...action.payload }
		},
		resetSelectedFacility(state) {
			state.selectedFacility = null
		},
		resetHighlightedRow(state) {
			state.highlightedRowId = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(GetAllFacilities.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(GetAllFacilities.fulfilled, (state, action) => {
				state.facilities = action.payload.data.items
				state.meta = action.payload.data.meta
				state.loading = 'idle'
			})
			.addCase(GetAllFacilities.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(GetFacilityById.pending, (state) => {
				state.loading = 'pending'
				state.detailLoading = 'pending'
			})
			.addCase(GetFacilityById.fulfilled, (state, action) => {
				state.selectedFacility = action.payload.data
				state.detailLoading = 'idle'
				state.loading = 'idle'
			})
			.addCase(GetFacilityById.rejected, (state, action) => {
				state.detailLoading = 'idle'
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(CreateFacility.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(CreateFacility.fulfilled, (state, action) => {
				state.facilities.unshift(action.payload.data)
				state.loading = 'idle'
				state.highlightedRowId = action.payload.data.id
			})
			.addCase(CreateFacility.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(UpdateFacility.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(UpdateFacility.fulfilled, (state, action) => {
				const updatedFacility = action.payload.data
				state.facilities = state.facilities.map((facility) =>
					facility.id === updatedFacility.id ? updatedFacility : facility
				)
				state.loading = 'idle'
				state.highlightedRowId = updatedFacility.id
			})
			.addCase(UpdateFacility.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(DeleteFacility.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(DeleteFacility.fulfilled, (state, action) => {
				const facilityId = action.payload.data
				state.facilities = state.facilities.map((facility) =>
					facility.id === facilityId ? { ...facility, status: 2 } : facility
				)
				state.highlightedRowId = facilityId
				state.loading = 'idle'
			})
			.addCase(DeleteFacility.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(ReactivateFacility.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(ReactivateFacility.fulfilled, (state, action) => {
				const facilityId = action.payload.data
				state.facilities = state.facilities.map((facility) =>
					facility.id === facilityId ? { ...facility, status: 1 } : facility
				)
				state.highlightedRowId = facilityId
				state.loading = 'idle'
			})
			.addCase(ReactivateFacility.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
	},
})

export const {
	setQueryParameters,
	resetSelectedFacility,
	resetHighlightedRow,
} = facilitySlice.actions

export {
	CreateFacility,
	UpdateFacility,
	GetAllFacilities,
	GetFacilityById,
	DeleteFacility,
	ReactivateFacility,
}

export default facilitySlice.reducer
