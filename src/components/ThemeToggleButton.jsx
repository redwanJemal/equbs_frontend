/* eslint-disable no-unused-vars */
import React from 'react'
import { Button, Tooltip } from '@/components'
import { useDispatch, useSelector } from 'react-redux'
import { useLocale } from '@/locales'
import { toggleTheme } from '@/stores/global.store'
import moonIcon from '@/assets/moon.svg'
import sunIcon from '@/assets/sun.svg'

const ThemeToggleButton = () => {
	const dispatch = useDispatch()
	const theme = useSelector((state) => state.global.theme)
	const { formatMessage } = useLocale()

	const handleToggleTheme = () => {
		dispatch(toggleTheme())
	}

	return (
		<Tooltip
			title={
				theme === 'light'
					? formatMessage({ id: 'global.header.theme.swith_to_dark' })
					: formatMessage({ id: 'global.header.theme.swith_to_light' })
			}
		>
			<Button
				onClick={handleToggleTheme}
				type='secondary'
				icon={
					theme === 'light' ? (
						<img src={sunIcon} alt='Switch to dark theme' />
					) : (
						<img src={moonIcon} alt='Switch to light theme' />
					)
				}
			/>
		</Tooltip>
	)
}

export default ThemeToggleButton
