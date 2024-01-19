import React from 'react'
import SideBar from '../components/product/SideBar'
import BookList from '../components/product/BooksList'

const BookPage = () => {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor:'#191919' }}>
			<div style={{ width: '300px', flex: 'none' }}>
				<SideBar />
			</div>
			<BookList itemPerPage={6} />
</div>
	)
}

export default BookPage