import { Button } from '@/components'

const Dashboard = () => {
	return (
		<div className='bg-white'>
			<h1 className='text-3xl font-bold underline'>Hello Admin! Dashboard</h1>
			<Button type='primary' htmlType='submit'>
				Submit
			</Button>
		</div>
	)
}

export default Dashboard
