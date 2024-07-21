import * as Yup from 'yup'

export const EqubFieldConfigs = [
	{
		id: 'name',
		name: 'name',
		type: 'text',
		placeholder: 'Type Equb name',
		label: 'Equb Name',
		required: true,
		validation: Yup.string().required('Equb name is required'),
	},
	{
		id: 'description',
		name: 'description',
		type: 'text',
		placeholder: 'Type Equb description',
		label: 'Equb Description',
		required: true,
		validation: Yup.string().required('Equb description is required'),
	},
	{
		id: 'commissionRate',
		name: 'commissionRate',
		type: 'number',
		placeholder: 'Type commission rate',
		label: 'Commission Rate',
		required: true,
		validation: Yup.number()
			.required('Commission rate is required')
			.min(0)
			.max(1),
	},
]

export const equbColumnsConfig = [
	{
		title: 'Equb Name',
		dataIndex: 'name',
		key: 'name',
		responsive: ['xs', 'sm', 'md', 'lg'],
		width: 150,
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
		responsive: ['xs', 'sm', 'md', 'lg'],
		width: 200,
	},
	{
		title: 'Commission Rate',
		dataIndex: 'commissionRate',
		key: 'commissionRate',
		responsive: ['xs', 'sm', 'md', 'lg'],
		width: 80,
	},
	{
		title: '',
		dataIndex: 'actions',
		key: 'actions',
		responsive: ['xs', 'sm', 'md', 'lg'],
		width: 80,
	},
]
