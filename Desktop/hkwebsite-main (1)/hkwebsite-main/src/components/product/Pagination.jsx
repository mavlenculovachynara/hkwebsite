import { Search } from '@mui/icons-material'
import { Pagination } from '@mui/material'
import React from 'react'

export default function PaginationControlled(props) {
	const { page, count, handleChange } = props
	return (
		<Pagination
			count={count}
			page={page}
			onChange={handleChange}
			value={Search}
			style={{color: 'white'}}
		></Pagination>
	)
}
