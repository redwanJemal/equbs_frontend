import { Outlet } from 'react-router-dom'
import SideMenu from '@/components/SideMenu'

const GuestLayout = () => {
	return (
		<div className='flex h-screen overflow-hidden'>
			<SideMenu />
			<div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
				<div>Header</div>
				<main className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default GuestLayout
