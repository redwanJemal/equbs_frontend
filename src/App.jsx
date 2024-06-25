/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { ConfigProvider, Spin, theme as antdTheme } from 'antd'
import { IntlProvider } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { LocaleFormatter, localeConfig } from './locales'
import './styles/index.css'
import './App.css'
import enUS from './locales/en-US'
import zhCN from './locales/zh-CN'
import AppRoutes from './Routes'
import { setGlobalState } from './stores/global.store'
import { getUserInfo } from './auth'
import { setUserProfile } from './stores/users'
import { SignalRProvider } from './contexts/SignalRProvider'

const App = () => {
	const { locale } = useSelector((state) => state.global)
	const { theme, loading } = useSelector((state) => state.global)
	const dispatch = useDispatch()

	// Initial theme setup and system theme change listener
	useEffect(() => {
		const savedTheme =
			localStorage.getItem('theme') ||
			(window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light')
		dispatch(setGlobalState({ theme: savedTheme }))
		document.body.className = `${savedTheme}-theme`

		const setTheme = (dark) => {
			const newTheme = dark ? 'dark' : 'light'
			dispatch(setGlobalState({ theme: newTheme }))
			localStorage.setItem('theme', newTheme)
			document.body.className = `${newTheme}-theme`
		}

		const mql = window.matchMedia('(prefers-color-scheme: dark)')
		const matchMode = (e) => setTheme(e.matches)
		mql.addEventListener('change', matchMode)

		return () => mql.removeEventListener('change', matchMode)
	}, [dispatch])

	// Set locale for dayjs
	useEffect(() => {
		const locales = {
			en_US: 'en',
			zh_CN: 'zh-cn',
			am_ET: 'am',
			ao_ET: 'ao',
		}
		dayjs.locale(locales[locale])
	}, [locale])

	// Get Ant Design locale
	const getAntdLocale = () => {
		const antdLocales = {
			en_US: enUS,
			zh_CN: zhCN,
			am_ET: enUS, // Use English locale as fallback
			ao_ET: enUS, // Use English locale as fallback
		}
		return antdLocales[locale] || enUS
	}

	useEffect(() => {
		const userInfo = getUserInfo()
		if (userInfo) {
			dispatch(setUserProfile(userInfo))
		}
	}, [dispatch])

	return (
		<SignalRProvider>
			{' '}
			{/* Wrap your app with SignalRProvider */}
			<ConfigProvider
				locale={getAntdLocale()}
				componentSize='middle'
				theme={{
					token: { colorPrimary: '#9eadaa' },
					algorithm:
						theme === 'dark'
							? antdTheme.darkAlgorithm
							: antdTheme.defaultAlgorithm,
				}}
			>
				<IntlProvider
					locale={locale.split('_')[0]}
					messages={localeConfig[locale]}
				>
					<Spin
						spinning={loading}
						className='app-loading-wrapper'
						style={{
							backgroundColor:
								theme === 'dark'
									? 'rgba(0, 0, 0, 0.44)'
									: 'rgba(255, 255, 255, 0.44)',
						}}
						tip={<LocaleFormatter id='global.tips.loading' />}
					>
						<AppRoutes />
					</Spin>
				</IntlProvider>
			</ConfigProvider>
		</SignalRProvider>
	)
}

export default App
