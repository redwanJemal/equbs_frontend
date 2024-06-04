/* eslint-disable no-unused-vars */
import React from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const PieChartComponent = ({ data, dataKey }) => {
	const theme = useSelector((state) => state.global.theme)
	const primaryColor = theme === 'dark' ? '#001529' : '#0773bb'
	const secondaryColor = theme === 'dark' ? '#393939' : '#ffffff'

	return (
		<ResponsiveContainer width='100%' height={300}>
			<PieChart>
				<Tooltip />
				<Pie data={data} dataKey={dataKey} fill={primaryColor}>
					{data.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={index % 2 === 0 ? primaryColor : secondaryColor}
						/>
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	)
}

PieChartComponent.propTypes = {
	data: PropTypes.array.isRequired,
	dataKey: PropTypes.string.isRequired,
}

export default PieChartComponent
