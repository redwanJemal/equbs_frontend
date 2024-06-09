import { createListenerMiddleware } from '@reduxjs/toolkit'
import { GetAllFacilities, setQueryParameters } from '@/stores/facility'
import { buildQueryString } from '@/utils/buildQueryString'

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
	actionCreator: setQueryParameters,
	effect: async (action, listenerApi) => {
		const state = listenerApi.getState()
		const queryParameters = state.facilities.queryParameters
		await listenerApi.dispatch(
			GetAllFacilities(buildQueryString(queryParameters))
		)

		const facilitiesState = listenerApi.getState().facilities
		if (facilitiesState.error) {
			console.error('Error fetching facilities:', facilitiesState.error)
		} else {
			console.log('Facilities fetched successfully')
		}
	},
})

export default listenerMiddleware
