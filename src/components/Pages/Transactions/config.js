import * as Yup from 'yup'

export const TransactionFieldConfigs = [
	{
		id: 'subscriptionId',
		name: 'subscriptionId',
		type: 'select_api',
		optionLabelKey: 'subscriptionName', // Assuming there's a field to identify subscription name
		placeholder: 'Select Subscription',
		label: 'Subscription',
		required: true,
		apiUrl: 'api/v1/equb-subscription',
		validation: Yup.string().required('Subscription is required'),
	},
	{
		id: 'date',
		name: 'date',
		type: 'date',
		placeholder: 'Select date',
		label: 'Date',
		required: true,
		validation: Yup.date().required('Date is required'),
	},
	{
		id: 'amount',
		name: 'amount',
		type: 'number',
		placeholder: 'Enter amount',
		label: 'Amount',
		required: true,
		validation: Yup.number()
			.required('Amount is required')
			.positive('Amount must be positive'),
	},
	{
		id: 'mode',
		name: 'mode',
		type: 'select',
		options: [
			{ label: 'Cash', value: 'Cash' },
			{ label: 'Transfer', value: 'Transfer' },
		],
		placeholder: 'Select mode',
		label: 'Mode',
		required: true,
		validation: Yup.string().required('Mode is required'),
	},
	{
		id: 'transactionNumber',
		name: 'transactionNumber',
		type: 'text',
		placeholder: 'Enter transaction number',
		label: 'Transaction Number',
		required: false,
		validation: Yup.string().nullable(),
	},
	{
		id: 'bankAccount',
		name: 'bankAccount',
		type: 'text',
		placeholder: 'Enter bank account',
		label: 'Bank Account',
		required: false,
		validation: Yup.string().nullable(),
	},
]

export const transactionColumnsConfig = [
	{
		title: 'Subscription',
		dataIndex: 'subscriptionName',
		key: 'subscriptionName',
		responsive: ['sm', 'md', 'lg'],
		width: 150,
	},
	{
		title: 'Date',
		dataIndex: 'date',
		key: 'date',
		responsive: ['sm', 'md', 'lg'],
		width: 150,
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		key: 'amount',
		responsive: ['sm', 'md', 'lg'],
		width: 100,
	},
	{
		title: 'Mode',
		dataIndex: 'mode',
		key: 'mode',
		responsive: ['sm', 'md', 'lg'],
		width: 100,
	},
	{
		title: 'Transaction Number',
		dataIndex: 'transactionNumber',
		key: 'transactionNumber',
		responsive: ['sm', 'md', 'lg'],
		width: 150,
	},
	{
		title: 'Bank Account',
		dataIndex: 'bankAccount',
		key: 'bankAccount',
		responsive: ['sm', 'md', 'lg'],
		width: 150,
	},
	{
		title: '',
		dataIndex: 'actions',
		key: 'actions',
		responsive: ['sm', 'md', 'lg'],
		width: 80,
	},
]