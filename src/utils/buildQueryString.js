export const buildQueryString = ({
	page = 1,
	limit = 10,
	filters = {},
	sortBy = '',
	sortOrder = 'asc',
	include,
	term,
}) => {
	let queryString = `?page=${page}&limit=${limit}`

	Object.entries(filters).forEach(([key, value]) => {
		if (value) {
			queryString += `&${key}=${value}`
		}
	})

	if (sortBy) {
		console.log('soring =>', sortBy)
		queryString += `&sort_by=${sortBy}&sort_order=${sortOrder}`
	}
	if (term) {
		queryString += `&term=${encodeURIComponent(term)}`
	}
	if (include) {
		queryString += `&include=${encodeURIComponent(include)}`
	}

	return queryString
}
