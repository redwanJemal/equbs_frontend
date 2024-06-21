import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './global.store'
import userReducer from './users'
import drawerReducer from './drawerSlice'
import equbReducer from './equbs'
import subscriptionReducer from './subscription'
import transactionReducer from './transactions'
import listenerMiddleware from './listenerMiddleware'

const store = configureStore({
	reducer: {
		drawer: drawerReducer,
		global: globalReducer,
		users: userReducer,
		equbs: equbReducer,
		equbSubscription: subscriptionReducer,
		transactions: transactionReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export default store
