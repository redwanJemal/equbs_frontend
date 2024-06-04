/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, useIntl } from 'react-intl'

import enUS from './en-US/index.js'
import amET from './am-ET/index.js'
import aoET from './ao-ET/index.js'
import zhCN from './zh-CN/index.js'

export const localeConfig = {
	en_US: enUS,
	am_ET: amET,
	ao_ET: aoET,
	zh_CN: zhCN,
}

export const localeToLanguageId = {
	en_US: 'english',
	am_ET: 'amharic',
	ao_ET: 'oromo',
	zh_CN: 'chinese',
}

export const LocaleFormatter = (props) => {
	const { id, children, ...rest } = props
	const notChildProps = { ...rest, children: undefined }

	return <FormattedMessage {...notChildProps} id={id} />
}

LocaleFormatter.propTypes = {
	id: PropTypes.oneOf(Object.keys(enUS)).isRequired,
	children: PropTypes.node,
}

export const useLocale = () => {
	const { formatMessage: _formatMessage, ...rest } = useIntl()
	const formatMessage = (descriptor) => _formatMessage(descriptor)

	return {
		...rest,
		formatMessage,
	}
}
