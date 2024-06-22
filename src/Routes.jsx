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
const EqubPage = lazy(() => import('./pages/EqubPage'))
const SubscriptionPage = lazy(() => import('./pages/SubscriptionPage'))
const TransactionPage = lazy(() => import('./pages/TransactionPage'))
const ChatPage = lazy(() => import('./pages/ChatPage')) // Add this line

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
							path='/equbs'
							element={
								<PrivateRoute>
									<EqubPage />
								</PrivateRoute>
							}
						/>
						<Route
							path='/transactions'
							element={
								<PrivateRoute>
									<TransactionPage />
								</PrivateRoute>
							}
						/>
						<Route
							path='/subscription'
							element={
								<PrivateRoute>
									<SubscriptionPage />
								</PrivateRoute>
							}
						/>
						<Route
							path='/chat'
							element={
								<PrivateRoute>
									<ChatPage />
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
