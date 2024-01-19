import React from 'react'
import { Pagination } from '@mui/material'
import './PaginationControlled.css'

export default function PaginationControlled({ page, count, handleChange }) {
	return (
		<Pagination
			count={count}
			page={page}
			onChange={handleChange}
			shape='rounded'
		/>
	)
}
