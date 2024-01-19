import React, { useState } from 'react'

import { useBooks } from '../context/BookContextProvider'
import GenreSelect from './GenreSelect'

import { Box, Button, TextField, Typography } from '@mui/material'

const AddBook = () => {
	const { addBook } = useBooks()
	const [book, setBook] = useState({
		title: '',
		genre: '',
		description: '',
		price: '',
		image: '',
	})
	const handleInput = e => {
		if (e.target.name === 'price') {
			const obj = { ...book, [e.target.name]: Number(e.target.value) }
			setBook(obj)
		} else {
			const obj = { ...book, [e.target.name]: e.target.value }
			setBook(obj)
		}
	}

	return (
		<Box
			sx={{
				width: '50vw',
				height: 500,
				margin: '20px auto',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			<Typography variant='h4' align='center'>
				Администратор
			</Typography>
			<TextField
				onChange={handleInput}
				name='title'
				label='Название книги'
				variant='outlined'
			/>
			<GenreSelect handleInput={handleInput} />
			<TextField
				onChange={handleInput}
				name='description'
				label='Автор'
				variant='outlined'
			/>
			<TextField
				onChange={handleInput}
				name='price'
				label='Цена'
				variant='outlined'
			/>
			<TextField
				onChange={handleInput}
				name='image'
				label='Image URL'
				variant='outlined'
			/>
			<Button fullWidth variant='contained' onClick={() => addBook(book)}>
				Добавить книгу
			</Button>
		</Box>
	)
}

export default AddBook
