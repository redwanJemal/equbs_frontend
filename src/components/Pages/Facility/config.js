import * as Yup from 'yup'

export const FacilityFieldConfigs = [
	{
		id: 'name',
		name: 'name',
		type: 'text',
		placeholder: 'Type facility name',
		label: 'Facility Name',
		required: false,
		validation: Yup.string().required('Facility name is required'),
	},
	{
		id: 'facilityTypeId',
		name: 'facilityTypeId',
		type: 'select_api',
		optionLabelKey: 'name',
		placeholder: 'Select Facility Type',
		label: 'Facility Type',
		required: true,
		apiUrl: 'api/v1/facilityTypes',
		validation: Yup.string().required('Facility Type is required'),
	},
	{
		id: 'contactNumber',
		name: 'contactNumber',
		type: 'text',
		placeholder: 'Type contact number',
		label: 'Contact Number',
		required: false,
		validation: Yup.string().required('Contact Number is required'),
	},
]

export const facilityColumnsConfig = [
	{
		title: 'Facility Name',
		dataIndex: 'facilityName',
		key: 'facilityName',
		responsive: ['sm', 'md', 'lg'],
		width: 150,
	},
	{
		title: 'Facility Type',
		dataIndex: 'facilityType',
		key: 'facilityType',
		responsive: ['sm', 'md', 'lg'],
		width: 200,
	},
	{
		title: 'Status',
		dataIndex: 'isActive',
		key: 'isActive',
		responsive: ['sm', 'md', 'lg'],
		width: 80,
	},
	{
		title: 'Contact Number',
		dataIndex: 'contactNumber',
		key: 'contactNumber',
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
