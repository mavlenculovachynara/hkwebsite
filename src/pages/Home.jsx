import React from 'react'
import BookList from '../components/product/BooksList'
import { Typography } from '@mui/material'

const Home = () => {
	return (
		<div>
			<Typography variant='h4' align='left'>
				НОВИНКИ 2024
			</Typography>

			<BookList />
		</div>
	)
}

export default Home
