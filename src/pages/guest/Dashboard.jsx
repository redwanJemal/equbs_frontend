import { Button } from '@/components'

const GuestDashboard = () => {
	return (
		<div>
			<h1 className='text-3xl font-bold underline'>Hello Guest! Dashboard</h1>
			<Button type='primary' htmlType='submit'>
				Submit
			</Button>
		</div>
	)
}

export default GuestDashboard
