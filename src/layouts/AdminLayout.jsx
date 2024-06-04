/* eslint-disable react/prop-types */
import Header from '@/components/Header'

const AdminLayout = ({ children }) => {
	return (
		<div className='min-h-screen flex flex-col'>
			<Header />
			<main className='flex-1 p-4'>{children}</main>
		</div>
	)
}

export default AdminLayout
