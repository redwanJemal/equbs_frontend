import { Outlet } from 'react-router-dom'

const PatientLayout = () => {
	return (
		<div className='min-h-screen flex flex-col'>
			<div>Patient Layout</div>
			<main className='flex-1 p-4'>
				<Outlet />
			</main>
		</div>
	)
}

export default PatientLayout
