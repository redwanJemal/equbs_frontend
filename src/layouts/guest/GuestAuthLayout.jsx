import { Outlet } from 'react-router-dom'

const GuestAuthLayout = () => {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center p-4'>
			<Outlet />
		</div>
	)
}

export default GuestAuthLayout
