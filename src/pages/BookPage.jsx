import React from 'react'
import BooksList from '../components/product/BooksList'
import SideBar from '../components/product/SideBar'

const BookPage = () => {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor:'#191919' }}>
			<div style={{ width: '300px', flex: 'none' }}>
				<SideBar />
			</div>
			<BooksList />
		</div>
	)
}

export default BookPage
