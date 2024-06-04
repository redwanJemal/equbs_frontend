import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	theme: localStorage.getItem('theme') || 'light',
	locale: localStorage.getItem('locale') || 'en_US',
	loading: false,
}

const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		setGlobalState(state, action) {
			return { ...state, ...action.payload }
		},
		toggleTheme(state) {
			const newTheme = state.theme === 'light' ? 'dark' : 'light'
			state.theme = newTheme
			localStorage.setItem('theme', newTheme)
			document.body.className = `${newTheme}-theme`
		},
		setLocale(state, action) {
			state.locale = action.payload
			localStorage.setItem('locale', action.payload)
		},
	},
})

export const { setGlobalState, toggleTheme, setLocale } = globalSlice.actions
export default globalSlice.reducer
