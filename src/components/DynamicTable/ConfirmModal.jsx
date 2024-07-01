/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react'
import { Modal } from '@/components'
import { ExclamationCircleOutlined } from '@/icons'

const ConfirmModal = ({ title, detail, confirm, cancel }) => {
	return (
		<Modal
			title={title}
			visible={true}
			onOk={confirm}
			onCancel={cancel}
			okText='Delete'
			cancelText='Cancel'
		>
			<ExclamationCircleOutlined />
			<p>{detail}</p>
		</Modal>
	)
}

export default ConfirmModal
