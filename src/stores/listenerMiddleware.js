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
import { getAllEqubs, setEqubQueryParameters } from './equbs'
import {
	GetAllSubscriptions,
	setSubscriptionQueryParameters,
} from './subscription'
import {
	GetAllTransactions,
	setTransactionQueryParameters,
} from './transactions'

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

listenerMiddleware.startListening({
	actionCreator: setEqubQueryParameters,
	effect: async (action, listenerApi) => {
		const state = listenerApi.getState()
		const queryParameters = state.equbs.queryParameters
		await listenerApi.dispatch(getAllEqubs(buildQueryString(queryParameters)))

		const equbsState = listenerApi.getState().equbs
		if (equbsState.error) {
			console.error('Error fetching equbs:', equbsState.error)
		} else {
			console.log('Equbs fetched successfully')
		}
	},
})

listenerMiddleware.startListening({
	actionCreator: setSubscriptionQueryParameters,
	effect: async (action, listenerApi) => {
		const state = listenerApi.getState()
		const queryParameters = state.equbSubscription.queryParameters
		await listenerApi.dispatch(
			GetAllSubscriptions(buildQueryString(queryParameters))
		)

		const subscriptionsState = listenerApi.getState().equbSubscription
		if (subscriptionsState.error) {
			console.error('Error fetching subscriptions:', subscriptionsState.error)
		} else {
			console.log('Subscriptions fetched successfully')
		}
	},
})

listenerMiddleware.startListening({
	actionCreator: setTransactionQueryParameters,
	effect: async (action, listenerApi) => {
		const state = listenerApi.getState()
		const queryParameters = state.transactions.queryParameters
		await listenerApi.dispatch(
			GetAllTransactions(buildQueryString(queryParameters))
		)

		const transactionsState = listenerApi.getState().transactions
		if (transactionsState.error) {
			console.error('Error fetching transactions:', transactionsState.error)
		} else {
			console.log('Transactions fetched successfully')
		}
	},
})

export default listenerMiddleware
