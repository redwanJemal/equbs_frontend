/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Route, Navigate } from 'react-router-dom'

// Example user roles (this should come from your authentication context or a similar source)
const getUserRole = () => {
	// Replace this with actual user role fetching logic
	// return localStorage.getItem('userRole')
	console.log('get users role')
	return true
}

const ProtectedRoute = ({ element: Component, requiredRole, ...rest }) => {
	const userRole = getUserRole()

	return (
		<Route
			{...rest}
			element={
				userRole === requiredRole ? (
					<Component />
				) : (
					<Navigate to='/guest/auth/login' />
				)
			}
		/>
	)
}

export default ProtectedRoute
