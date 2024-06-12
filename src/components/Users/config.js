import * as Yup from 'yup'

export const UserFieldConfigs = [
	{
		id: 'firstName',
		name: 'firstName',
		type: 'text',
		placeholder: 'Type user First name',
		label: 'First Name',
		required: true,
		validation: Yup.string().required('First Name is required'),
	},
	{
		id: 'lastName',
		name: 'lastName',
		type: 'text',
		placeholder: 'Type Last Name',
		label: 'Last Name',
		required: true,
		validation: Yup.string().required('Last Name is required'),
	},
	{
		id: 'password',
		name: 'password',
		type: 'password',
		placeholder: 'Type password',
		label: 'Password',
		required: true,
		validation: Yup.string().required('Password is required'),
	},
	{
		id: 'email',
		name: 'email',
		type: 'text',
		placeholder: 'Type email',
		label: 'Email',
		required: true,
		validation: Yup.string()
			.email('Invalid email format')
			.required('Email is required'),
	},
	{
		id: 'facilityId',
		name: 'facilityId',
		type: 'select_api',
		optionLabelKey: 'name',
		placeholder: 'Select Facility',
		label: 'Facility',
		required: true,
		apiUrl: 'api/v1/facilities',
		validation: Yup.string().required('Facility is required'),
	},
	{
		id: 'phoneNumber',
		name: 'phoneNumber',
		type: 'text',
		placeholder: 'Type phone number',
		label: 'Phone Number',
		required: true,
		validation: Yup.string().required('Phone Number is required'),
	},
]

export const userColumnsConfig = [
	{
		title: 'Full Name',
		dataIndex: 'fullName',
		key: 'fullName',
		responsive: ['sm', 'md', 'lg'],
		width: 150,
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
		responsive: ['sm', 'md', 'lg'],
		width: 200,
	},
	// {
	// 	title: 'Status',
	// 	dataIndex: 'isActive',
	// 	key: 'isActive',
	// 	responsive: ['sm', 'md', 'lg'],
	// 	width: 80,
	// },
	{
		title: 'Facility',
		dataIndex: 'facilityId',
		key: 'facilityId',
		responsive: ['sm', 'md', 'lg'],
		width: 300,
	},
	{
		title: 'Phone Number',
		dataIndex: 'phoneNumber',
		key: 'phoneNumber',
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
