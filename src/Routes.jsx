/* eslint-disable react/prop-types */
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
import { getToken } from './auth'

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

const PrivateRoute = ({ children }) => {
	const token = getToken()
	return token ? children : <Navigate to='/login' replace />
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
						<Route
							path='/dashboard'
							element={
								<PrivateRoute>
									<Dashboard />
								</PrivateRoute>
							}
						/>
						<Route
							path='/users'
							element={
								<PrivateRoute>
									<UsersPage />
								</PrivateRoute>
							}
						/>
						<Route
							path='/facility-list'
							element={
								<PrivateRoute>
									<FacilityListPage />
								</PrivateRoute>
							}
						/>
						<Route
							path='/facility-type'
							element={
								<PrivateRoute>
									<FacilityTypePage />
								</PrivateRoute>
							}
						/>
						<Route
							path='/referral-in'
							element={
								<PrivateRoute>
									<ReferalInPage />
								</PrivateRoute>
							}
						/>
						<Route
							path='/referral-out'
							element={
								<PrivateRoute>
									<ReferalOutPage />
								</PrivateRoute>
							}
						/>
						<Route path='*' element={<NotFound />} />
					</Route>
					<Route path='login' element={<LoginPage />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Suspense>
		</Router>
	)
}

export default AppRoutes
