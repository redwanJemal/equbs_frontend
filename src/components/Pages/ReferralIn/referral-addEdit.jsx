/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Avatar, Col, Divider, Drawer, List, Row } from 'antd'
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
	const showDrawer = () => {
		setOpen(true)
	}
	const onClose = () => {
		setOpen(false)
	}

	const handleCloseDrawer = () => {
		dispatch(closeDrawer())
		dispatch(resetSelectedReferral())
		// formik.resetForm()
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
				// open={open}
			>
				<p
					className='site-description-item-profile-p'
					style={{
						marginBottom: 24,
					}}
				>
					User Profile
				</p>
				<p className='site-description-item-profile-p'>Personal</p>
				<Row>
					<Col span={12}>
						<DescriptionItem title='Full Name' content='Lily' />
					</Col>
					<Col span={12}>
						<DescriptionItem title='Account' content='AntDesign@example.com' />
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem title='City' content='HangZhou' />
					</Col>
					<Col span={12}>
						<DescriptionItem title='Country' content='China🇨🇳' />
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem title='Birthday' content='February 2,1900' />
					</Col>
					<Col span={12}>
						<DescriptionItem title='Website' content='-' />
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<DescriptionItem
							title='Message'
							content='Make things as simple as possible but no simpler.'
						/>
					</Col>
				</Row>
				<Divider />
				<p className='site-description-item-profile-p'>Company</p>
				<Row>
					<Col span={12}>
						<DescriptionItem title='Position' content='Programmer' />
					</Col>
					<Col span={12}>
						<DescriptionItem title='Responsibilities' content='Coding' />
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem title='Department' content='XTech' />
					</Col>
					<Col span={12}>
						<DescriptionItem title='Supervisor' content={<a>Lin</a>} />
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<DescriptionItem
							title='Skills'
							content='C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc.'
						/>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<DescriptionItem
							title='drawing'
							content='C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc.'
						/>
					</Col>
				</Row>
				<Divider />
				<p className='site-description-item-profile-p'>Contacts</p>
				<Row>
					<Col span={12}>
						<DescriptionItem title='Email' content='AntDesign@example.com' />
					</Col>
					<Col span={12}>
						<DescriptionItem title='Phone Number' content='+86 181 0000 0000' />
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<DescriptionItem
							title='Github'
							content={
								<a href='http://github.com/ant-design/ant-design/'>
									github.com/ant-design/ant-design/
								</a>
							}
						/>
					</Col>
				</Row>
			</Drawer>
		</>
	)
}
export default ReferralInDetail
