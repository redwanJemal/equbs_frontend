import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './global.store'
import userReducer from './users'
import drawerReducer from './drawerSlice'
import facilityReducer from './facility'
import listenerMiddleware from './listenerMiddleware'

const store = configureStore({
	reducer: {
		drawer: drawerReducer,
		global: globalReducer,
		users: userReducer,
		facilities: facilityReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export default store
