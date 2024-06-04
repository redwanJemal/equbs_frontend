/* eslint-disable no-unused-vars */
import React, { Suspense, lazy, useEffect } from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import { Spin } from 'antd'
import ResponsiveLayout from './layouts/DashboardLayout'

// Lazy load components
const UsersPage = lazy(() => import('./pages/Users'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))
const LoginPage = lazy(() => import('./pages/Login'))
const FacilityListPage = lazy(() => import('./pages/facility/list'))
const FacilityTypePage = lazy(() => import('./pages/facility/type'))
const ReferalOutPage = lazy(() => import('./pages/referal/referalOut'))
const ReferalInPage = lazy(() => import('./pages/referal/referalIn'))

// Preload components
const preloadComponents = () => {
	import('./pages/Users')
	import('./pages/Dashboard')
	import('./pages/NotFound')
}

const AppRoutes = () => {
	useEffect(() => {
		preloadComponents()
	}, [])

	return (
		<Router>
			<Suspense
				fallback={
					<div className='loading-container'>
						<Spin size='large' />
					</div>
				}
			>
				<Routes>
					<Route path='' element={<ResponsiveLayout />}>
						<Route index element={<Navigate to='/dashboard' replace />} />
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='/users' element={<UsersPage />} />
						<Route path='/facility-list' element={<FacilityListPage />} />
						<Route path='/facility-type' element={<FacilityTypePage />} />
						<Route path='/referral-in' element={<ReferalInPage />} />
						<Route path='/referral-out' element={<ReferalOutPage />} />
						<Route path='*' element={<NotFound />} />
					</Route>
					<Route path='' element={<LoginPage />}></Route>
					<Route path='login' element={<LoginPage />}></Route>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Suspense>
		</Router>
	)
}

export default AppRoutes
