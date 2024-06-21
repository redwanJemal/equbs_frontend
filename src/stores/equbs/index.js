import { createSlice } from '@reduxjs/toolkit'
import { createEqub, updateEqub, getAllEqubs, getEqubById } from './thunk'

const initialState = {
	loading: false,
	equbs: [],
	selectedEqub: null,
	highlightedRowId: null,
	queryParameters: {
		page: 1,
		limit: 10,
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

const equbSlice = createSlice({
	name: 'equb',
	initialState,
	reducers: {
		setEqubQueryParameters(state, action) {
			state.queryParameters = { ...state.queryParameters, ...action.payload }
		},
		resetSelectedEqub(state) {
			state.selectedEqub = null
		},
		resetHighlightedRow(state) {
			state.highlightedRowId = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllEqubs.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(getAllEqubs.fulfilled, (state, action) => {
				state.equbs = action.payload.data.items
				state.meta = action.payload.data.meta
				state.loading = 'idle'
			})
			.addCase(getAllEqubs.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(createEqub.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(createEqub.fulfilled, (state, action) => {
				state.equbs.unshift(action.payload.data)
				state.loading = 'idle'
			})
			.addCase(createEqub.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(updateEqub.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(updateEqub.fulfilled, (state, action) => {
				state.equbs = state.equbs.map((equb) =>
					equb.id === action.payload.data.id
						? { ...equb, ...action.payload.data }
						: equb
				)
				state.loading = 'idle'
			})
			.addCase(updateEqub.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
			.addCase(getEqubById.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(getEqubById.fulfilled, (state, action) => {
				state.selectedEqub = action.payload.data
				state.loading = 'idle'
			})
			.addCase(getEqubById.rejected, (state, action) => {
				state.loading = 'idle'
				state.error = action.error.message
			})
	},
})

export const {
	setEqubQueryParameters,
	resetSelectedEqub,
	resetHighlightedRow,
} = equbSlice.actions

export { createEqub, updateEqub, getAllEqubs, getEqubById }

export default equbSlice.reducer
