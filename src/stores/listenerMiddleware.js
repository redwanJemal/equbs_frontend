import { createListenerMiddleware } from '@reduxjs/toolkit'
import { GetAllFacilities, setQueryParameters } from '@/stores/facility'
import { GetAllUsers, setUserQueryParameters } from '@/stores/users'
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

// User listener
listenerMiddleware.startListening({
	actionCreator: setUserQueryParameters,
	effect: async (action, listenerApi) => {
		const state = listenerApi.getState()
		const queryParameters = state.users.queryParameters
		await listenerApi.dispatch(GetAllUsers(buildQueryString(queryParameters)))

		const usersState = listenerApi.getState().users
		if (usersState.error) {
			console.error('Error fetching users:', usersState.error)
		} else {
			console.log('Users fetched successfully')
		}
	},
})

export default listenerMiddleware
