import React, { useEffect, useState } from 'react'
import { useBooks } from '../context/BookContextProvider'
import { useNavigate, useParams } from 'react-router-dom'
import {
	Button,
	FormControl,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material'

const EditBook = () => {
	const { genre } = useBooks()
	const { id } = useParams()
	const navigate = useNavigate()
	const { editBook, getOneBook, oneBook } = useBooks()
	const [product, setProduct] = useState({
		title: '',
		genre: '',
		description: '',
		image: '',
		price: '',
	})

	useEffect(() => {
		if (oneBook) {
			setProduct(oneBook)
		}
	}, [oneBook])

	const handleInput = e => {
		const { name, value } = e.target
		setProduct(prevProduct => ({ ...prevProduct, [name]: value }))
	}

	useEffect(() => {
		getOneBook(id)
	}, [id])

	return (
		<FormControl
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
				Изменить книгу
			</Typography>
			<TextField
				onChange={handleInput}
				value={product.title}
				name='title'
				label='Название'
				variant='outlined'
			/>
			<Select
				labelId='genre-label'
				onChange={handleInput}
				value={product.genre}
				name='genre'
				label='Жанр'
				variant='outlined'
			>
				{genre.map(elem => (
					<MenuItem value={elem.name} key={elem.id}>
						{elem.name}
					</MenuItem>
				))}
			</Select>
			<TextField
				onChange={handleInput}
				name='description'
				value={product.description}
				label='Автор'
				variant='outlined'
			/>
			<TextField
				onChange={handleInput}
				value={product.price}
				name='price'
				label='Цена'
				variant='outlined'
			/>
			<TextField
				onChange={handleInput}
				value={product.image}
				name='image'
				label='Обложка книги'
				variant='outlined'
			/>
			<Button
				onClick={() => editBook(id, product)}
				fullWidth
				variant='contained'
			>
				Изменить
			</Button>
		</FormControl>
	)
}

export default EditBook
