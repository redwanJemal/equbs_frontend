/* eslint-disable no-unused-vars */
import React from 'react'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const LineChartComponent = ({ data, xKey, lineKey }) => {
	const theme = useSelector((state) => state.global.theme)
	const primaryColor = theme === 'dark' ? '#001529' : '#0773bb'

	return (
		<ResponsiveContainer width='100%' height={300}>
			<LineChart
				data={data}
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey={xKey} />
				<YAxis />
				<Tooltip />
				<Line type='monotone' dataKey={lineKey} stroke={primaryColor} />
			</LineChart>
		</ResponsiveContainer>
	)
}

LineChartComponent.propTypes = {
	data: PropTypes.array.isRequired,
	xKey: PropTypes.string.isRequired,
	lineKey: PropTypes.string.isRequired,
}

export default LineChartComponent
