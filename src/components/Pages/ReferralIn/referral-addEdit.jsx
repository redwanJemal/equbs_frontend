/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Avatar, Col, Divider, Drawer, List, Row, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { closeDrawer } from '@/stores/drawerSlice'
import { resetSelectedFacility as resetSelectedReferral } from '@/stores/facility'

const DescriptionItem = ({ title, content }) => (
	<div className='site-description-item-profile-wrapper'>
		<p className='site-description-item-profile-p-label'>{title}:</p>
		{content}
	</div>
)

const ReferralInDetail = () => {
	const dispatch = useDispatch()
	const [open, setOpen] = useState(false)
	const isDrawerOpen = useSelector((state) => state.drawer.isOpen)

	const selectedReferral = {
		ReferralId: 1,
		PatientId: 1,
		Patient: {
			FirstName: 'Alem',
			LastName: 'Kebede',
			Age: 35,
			Gender: 'Male',
			PhoneNumber: '+251911234567',
			Woreda: 'Bole',
			Kebele: '02',
			HouseNumber: '123',
			CardNumber: 'A123456',
		},
		ReferralTypeId: 1,
		ReferralType: {
			Name: 'Emergency',
		},
		ReferringFacilityId: 1,
		ReferringFacility: {
			Name: 'Addis Ababa Health Center',
		},
		ReceivingFacilityId: 2,
		ReceivingFacility: {
			Name: 'Black Lion Hospital',
		},
		DateSubmitted: '2024-06-01T00:00:00',
		StatusId: 1,
		ReferralStatus: {
			Status: 'Pending',
		},
		DateAccepted: null,
		DateRejected: null,
		ReasonForRejection: null,
		UserId: 1,
		User: {
			UserName: 'Dr. John Doe',
		},
		ClinicalFindings: 'Patient has severe headache and dizziness.',
		Diagnosis: 'Migraine',
		InvestigationResult: 'CT scan shows no abnormalities.',
		RxGiven: 'Paracetamol 500mg',
		ReasonForReferral: 'Needs further investigation.',
		NameOfPhysician: 'Dr. John Doe',
	}
	const showDrawer = () => {
		setOpen(true)
	}
	const onClose = () => {
		setOpen(false)
	}

	const handleCloseDrawer = () => {
		dispatch(closeDrawer())
		dispatch(resetSelectedReferral())
	}

	const handleAccept = () => {
		// Dispatch the accept action here
		console.log('Accepted')
	}

	const handleReject = () => {
		// Dispatch the reject action here
		console.log('Rejected')
	}

	return (
		<>
			<Drawer
				visible={isDrawerOpen}
				width={640}
				placement='right'
				closable={false}
				onClose={handleCloseDrawer}
				className='add-edit-drawer'
				footer={
					<div
						style={{
							textAlign: 'right',
						}}
					>
						<Button onClick={handleCloseDrawer} style={{ marginRight: 8 }}>
							Cancel
						</Button>
						<Button
							onClick={handleAccept}
							type='primary'
							style={{ marginRight: 8 }}
						>
							Accept
						</Button>
						<Button onClick={handleReject} danger>
							Reject
						</Button>
					</div>
				}
			>
				<p
					className='site-description-item-profile-p'
					style={{
						marginBottom: 24,
					}}
				>
					Referral Details
				</p>
				<p className='site-description-item-profile-p'>Patient Information</p>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title='Full Name'
							content={`${selectedReferral?.Patient?.FirstName} ${selectedReferral?.Patient?.LastName}`}
						/>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title='Gender'
							content={selectedReferral?.Patient?.Gender}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title='Age'
							content={selectedReferral?.Patient?.Age}
						/>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title='Phone Number'
							content={selectedReferral?.Patient?.PhoneNumber}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title='Woreda'
							content={selectedReferral?.Patient?.Woreda}
						/>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title='Kebele'
							content={selectedReferral?.Patient?.Kebele}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title='House Number'
							content={selectedReferral?.Patient?.HouseNumber}
						/>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title='Card Number'
							content={selectedReferral?.Patient?.CardNumber}
						/>
					</Col>
				</Row>
				<Divider />
				<p className='site-description-item-profile-p'>Referral Information</p>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title='Referral Type'
							content={selectedReferral?.ReferralType?.Name}
						/>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title='Referring Facility'
							content={selectedReferral?.ReferringFacility?.Name}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title='Receiving Facility'
							content={selectedReferral?.ReceivingFacility?.Name}
						/>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title='Date Submitted'
							content={selectedReferral?.DateSubmitted}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title='Status'
							content={selectedReferral?.ReferralStatus?.Status}
						/>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title='Name of Physician'
							content={selectedReferral?.NameOfPhysician}
						/>
					</Col>
				</Row>
				<Divider />
				<p className='site-description-item-profile-p'>Clinical Information</p>
				<Row>
					<Col span={24}>
						<DescriptionItem
							title='Clinical Findings'
							content={selectedReferral?.ClinicalFindings}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<DescriptionItem
							title='Diagnosis'
							content={selectedReferral?.Diagnosis}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<DescriptionItem
							title='Investigation Result'
							content={selectedReferral?.InvestigationResult}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<DescriptionItem
							title='Rx Given'
							content={selectedReferral?.RxGiven}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<DescriptionItem
							title='Reason for Referral'
							content={selectedReferral?.ReasonForReferral}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<DescriptionItem
							title='Reason for Rejection'
							content={selectedReferral?.ReasonForRejection || '-'}
						/>
					</Col>
				</Row>
			</Drawer>
		</>
	)
}

export default ReferralInDetail
