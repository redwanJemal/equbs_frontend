import { createListenerMiddleware } from '@reduxjs/toolkit'
import { GetAllFacilities, setQueryParameters } from '@/stores/facility'
import { GetAllUsers, setUserQueryParameters } from '@/stores/users'
import {
	GetReferralIn,
	GetReferralOut,
	setReferralInQueryParameters,
	setReferralQueryParameters,
} from '@/stores/referrals'
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

// Referral listener
listenerMiddleware.startListening({
	actionCreator: setReferralQueryParameters,
	effect: async (action, listenerApi) => {
		const state = listenerApi.getState()
		const queryParameters = state.referrals.queryParameters
		await listenerApi.dispatch(
			GetReferralOut(buildQueryString(queryParameters))
		)

		const referralsState = listenerApi.getState().referrals
		if (referralsState.error) {
			console.error('Error fetching referrals:', referralsState.error)
		} else {
			console.log('Referrals fetched successfully')
		}
	},
})

// Referral listener
listenerMiddleware.startListening({
	actionCreator: setReferralInQueryParameters,
	effect: async (action, listenerApi) => {
		const state = listenerApi.getState()
		const queryParameters = state.referrals.queryParameters
		await listenerApi.dispatch(GetReferralIn(buildQueryString(queryParameters)))

		const referralsState = listenerApi.getState().referrals
		if (referralsState.error) {
			console.error('Error fetching referral ins:', referralsState.error)
		} else {
			console.log('Referrals ins fetched successfully')
		}
	},
})

export default listenerMiddleware
