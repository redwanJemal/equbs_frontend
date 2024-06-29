import * as Yup from 'yup'

export const TransactionFieldConfigs = [
	{
		id: 'subscriptionId',
		name: 'subscriptionId',
		type: 'select_api',
		optionLabelKey: 'equbName', // Adjusted to show Equb name
		placeholder: 'Select Subscription',
		label: 'Subscription',
		required: true,
		apiUrl: 'api/v1/equb-subscription?isApproved=true',
		validation: Yup.string().required('Subscription is required'),
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
		disabled: true,
	},
	{
		id: 'mode',
		name: 'mode',
		type: 'select',
		options: [
			{ label: 'Cash', value: 1 },
			{ label: 'Transfer', value: 2 },
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
	{
		id: 'date',
		name: 'date',
		type: 'date_picker',
		placeholder: 'Select date',
		label: 'Date',
		required: true,
		validation: Yup.date().required('Date is required'),
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
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		responsive: ['sm', 'md', 'lg'],
		width: 100,
	},
	{
		title: '',
		dataIndex: 'actions',
		key: 'actions',
		responsive: ['sm', 'md', 'lg'],
		width: 80,
	},
]
