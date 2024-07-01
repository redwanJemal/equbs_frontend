/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Menu } from '@/components'

const ActionDropDown = ({ actions, onActionSelected }) => {
	const handleClick = (e) => {
		onActionSelected(e.key)
	}

	return (
		<Menu onClick={handleClick}>
			{actions?.map((action) => (
				<Menu.Item key={action.value}>{action.name}</Menu.Item>
			))}
		</Menu>
	)
}

export default ActionDropDown
