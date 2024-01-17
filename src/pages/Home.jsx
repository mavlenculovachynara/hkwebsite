import React from 'react'
import BookList from '../components/product/BooksList'
import { Typography } from '@mui/material'
import Footer from '../components/homePage/Footer'

const Home = () => {
	return (
		<div>
			<Typography variant='h4' align='left'>
				НОВИНКИ 2024
			</Typography>
			<BookList />
           <Footer/>
		</div>
	)
}

export default Home
