/* eslint-disable no-unused-vars */
import React from 'react'
import { Menu } from 'antd'
import { useDispatch } from 'react-redux'
import { useLocale } from '@/locales'
import { setLocale } from '@/stores/global.store'

const LanguageMenu = () => {
	const dispatch = useDispatch()
	const { formatMessage } = useLocale()

	const languageMenuItems = [
		{
			key: 'en_US',
			label: formatMessage({ id: 'global.language.english' }),
			onClick: () => dispatch(setLocale('en_US')),
		},
		{
			key: 'am_ET',
			label: formatMessage({ id: 'global.language.amharic' }),
			onClick: () => dispatch(setLocale('am_ET')),
		},
		{
			key: 'ao_ET',
			label: formatMessage({ id: 'global.language.oromo' }),
			onClick: () => dispatch(setLocale('ao_ET')),
		},
		// {
		// 	key: 'zh_CN',
		// 	label: formatMessage({ id: 'global.language.chinese' }),
		// 	onClick: () => dispatch(setLocale('zh_CN')),
		// },
	]
	return <Menu items={languageMenuItems} />
}

export default LanguageMenu
