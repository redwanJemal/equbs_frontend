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
		id: 'phoneNumber',
		name: 'phoneNumber',
		type: 'text',
		placeholder: 'Type phone number',
		label: 'Phone Number',
		required: true,
		validation: Yup.string().required('Phone Number is required'),
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
	// {
	// 	id: 'email',
	// 	name: 'email',
	// 	type: 'text',
	// 	placeholder: 'Type email',
	// 	label: 'Email',
	// 	required: true,
	// 	validation: Yup.string()
	// 		.email('Invalid email format')
	// 		.required('Email is required'),
	// },
	// {
	// 	id: 'userName',
	// 	name: 'userName',
	// 	type: 'text',
	// 	placeholder: 'Type User Name',
	// 	label: 'User Name',
	// 	required: true,
	// 	validation: Yup.string().required('User Name is required'),
	// },
	{
		id: 'roles',
		name: 'roles',
		type: 'multi_select_api',
		apiUrl: '/api/v1/roles', // The API endpoint to fetch roles
		placeholder: 'Select roles',
		label: 'Roles',
		required: true,
		validation: Yup.array().min(1, 'At least one role is required'),
		optionLabelKey: 'name', // The key to use as the label in the options
	},
]

export const userColumnsConfig = [
	{
		title: 'Full Name',
		dataIndex: 'fullName',
		key: 'fullName',
		responsive: ['xs', 'sm', 'md', 'lg'],
		width: 150,
	},
	// {
	// 	title: 'Email',
	// 	dataIndex: 'email',
	// 	key: 'email',
	// 	responsive: ['sm', 'md', 'lg'],
	// 	width: 200,
	// },
	{
		title: 'Phone Number',
		dataIndex: 'phoneNumber',
		key: 'phoneNumber',
		responsive: ['xs', 'sm', 'md', 'lg'],
		width: 150,
	},
	{
		title: 'Roles',
		dataIndex: 'roles',
		key: 'roles',
		responsive: ['xs', 'sm', 'md', 'lg'],
		width: 150,
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		responsive: ['xs', 'sm', 'md', 'lg'],
		width: 150,
	},
	{
		title: '',
		dataIndex: 'actions',
		key: 'actions',
		responsive: ['xs', 'sm', 'md', 'lg'],
		width: 80,
	},
]
