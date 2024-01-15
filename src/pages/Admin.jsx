import React, { useState } from 'react'
import AddBook from '../components/product/AddBook'
import AddGenreModal from '../components/product/AddGenreModal'
import { Button } from '@mui/material'

const AdminPage = () => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	return (
		<div>
			<Button onClick={handleOpen} variant='contained'>
				Добавить жанр
			</Button>
			<AddBook />
			<AddGenreModal open={open} handleClose={handleClose} />
		</div>
	)
}
export default AdminPage
