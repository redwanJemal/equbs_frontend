/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Button } from '@/components'
import { PlusCircleOutlined } from '@ant-design/icons'

const AddButton = ({ setOpenDrawer, title }) => {
	return (
		<Button
			type='primary'
			icon={<PlusCircleOutlined />}
			onClick={() => setOpenDrawer(true)}
		>
			Add {title}
		</Button>
	)
}

export default AddButton
