/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Input, Button } from '@/components'
import { SearchOutlined } from '@/icons'

const SearchInput = ({ onSearch, placeholder = 'Search ...' }) => {
	const [searchValue, setSearchValue] = useState('')

	const handleSearch = () => {
		onSearch(searchValue)
	}

	return (
		<Input
			placeholder={placeholder}
			value={searchValue}
			onChange={(e) => setSearchValue(e.target.value)}
			suffix={<SearchOutlined onClick={handleSearch} />}
		/>
	)
}

export default SearchInput
