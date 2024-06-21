import * as Yup from 'yup'

export const SubscriptionFieldConfigs = [
	{
		id: 'userId',
		name: 'userId',
		type: 'select_api',
		optionLabelKey: 'fullName',
		placeholder: 'Select User',
		label: 'User',
		required: true,
		apiUrl: 'api/v1/users',
		validation: Yup.string().required('User is required'),
	},
	{
		id: 'equbId',
		name: 'equbId',
		type: 'select_api',
		optionLabelKey: 'name',
		placeholder: 'Select Equb',
		label: 'Equb',
		required: true,
		apiUrl: 'api/v1/equbs',
		validation: Yup.string().required('Equb is required'),
	},
	{
		id: 'startDate',
		name: 'startDate',
		type: 'date_picker',
		placeholder: 'Select Start Date',
		label: 'Start Date',
		required: true,
		validation: Yup.date().required('Start Date is required'),
	},
	{
		id: 'rotation',
		name: 'rotation',
		type: 'select',
		options: [
			{ value: 1, label: 'Daily' },
			{ value: 2, label: 'Weekly' },
			{ value: 3, label: 'Monthly' },
		],
		placeholder: 'Select Rotation Type',
		label: 'Rotation Type',
		required: true,
		validation: Yup.string().required('Rotation Type is required'),
	},
	{
		id: 'timeline',
		name: 'timeline',
		type: 'number',
		placeholder: 'Enter Timeline',
		label: 'Timeline',
		required: true,
		validation: Yup.number()
			.required('Timeline is required')
			.positive()
			.integer(),
	},
	{
		id: 'amount',
		name: 'amount',
		type: 'number',
		placeholder: 'Enter Amount',
		label: 'Amount',
		required: true,
		validation: Yup.number()
			.required('Amount is required')
			.positive()
			.integer(),
	},
]

export const subscriptionColumnsConfig = [
	{
		title: 'User Name',
		dataIndex: 'userName',
		key: 'userName',
		responsive: ['sm', 'md', 'lg'],
		width: 150,
	},
	{
		title: 'Equb Name',
		dataIndex: 'equbName',
		key: 'equbName',
		responsive: ['sm', 'md', 'lg'],
		width: 200,
	},
	{
		title: 'Start Date',
		dataIndex: 'startDate',
		key: 'startDate',
		responsive: ['sm', 'md', 'lg'],
		width: 150,
	},
	{
		title: 'Rotation Type',
		dataIndex: 'rotation',
		key: 'rotation',
		responsive: ['sm', 'md', 'lg'],
		width: 150,
	},
	{
		title: 'Timeline',
		dataIndex: 'timeline',
		key: 'timeline',
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
