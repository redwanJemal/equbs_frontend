import { createListenerMiddleware } from '@reduxjs/toolkit'
import { GetAllUsers, setUserQueryParameters } from '@/stores/users'
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
