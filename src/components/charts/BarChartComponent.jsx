/* eslint-disable no-unused-vars */
import React from 'react'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const BarChartComponent = ({ data, xKey, barKey }) => {
	const theme = useSelector((state) => state.global.theme)
	const primaryColor = theme === 'dark' ? '#001529' : '#0773bb'

	return (
		<ResponsiveContainer width='100%' height={300}>
			<BarChart
				data={data}
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey={xKey} />
				<YAxis />
				<Tooltip />
				<Bar dataKey={barKey} fill={primaryColor} />
			</BarChart>
		</ResponsiveContainer>
	)
}

BarChartComponent.propTypes = {
	data: PropTypes.array.isRequired,
	xKey: PropTypes.string.isRequired,
	barKey: PropTypes.string.isRequired,
}

export default BarChartComponent
