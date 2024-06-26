/* eslint-disable no-unused-vars */
import React from 'react'
import DashboardStatCard from '@/components/DashboardStatCard'
import BarChartComponent from '@/components/charts/BarChartComponent'
import LineChartComponent from '@/components/charts/LineChartComponent'
import PieChartComponent from '@/components/charts/PieChartComponent'
import {
	TransactionOutlined,
	MoneyCollectOutlined,
	UserOutlined,
} from '@ant-design/icons'

const sampleData = [
	{
		id: 1,
		title: 'Users',
		icon: UserOutlined,
		count: 14,
		class: '',
	},
	{
		id: 2,
		icon: TransactionOutlined,
		title: 'Completed Equbs',
		count: 20,
		class: '',
	},
	{
		id: 3,
		icon: MoneyCollectOutlined,
		title: 'Equbs Incomplete',
		count: 16,
		class: '',
	},
]

const chartData = [
	{ name: 'Jan', value: 400 },
	{ name: 'Feb', value: 300 },
	{ name: 'Mar', value: 200 },
	{ name: 'Apr', value: 278 },
	{ name: 'May', value: 189 },
]

const pieData = [
	{ name: 'Group A', value: 400 },
	{ name: 'Group B', value: 300 },
	{ name: 'Group C', value: 300 },
	{ name: 'Group D', value: 200 },
]

const Dashboard = () => {
	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold'>Dashboard</h1>
			<div className='mt-5 grid grid-cols-1 gap-8 sm:grid-cols-3'>
				{sampleData.map((data) => (
					<DashboardStatCard
						key={data.id}
						loading={'idle'}
						title={data.title}
						Icon={data.icon}
						totalCount={data.count}
					/>
				))}
			</div>
			<div className='mt-5 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
				<BarChartComponent data={chartData} xKey='name' barKey='value' />
				<LineChartComponent data={chartData} xKey='name' lineKey='value' />
				<PieChartComponent data={pieData} dataKey='value' />
			</div>
		</div>
	)
}

export default Dashboard
