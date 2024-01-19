import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useBooks } from '../context/BookContextProvider'

const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	boxShadow: 24,
	border: '2px solid #3f51b5', //? Добавлен цвет границы
	borderRadius: '8px', //? Добавлен скругленный угол
	backgroundColor: 'white',
	padding: '20px',
}
const headerStyle = {
	marginBottom: '15px',
	color: '#3f51b5', //? Добавлен цвет заголовка
}
const inputStyle = {
	marginBottom: '15px',
}
const buttonContainerStyle = {
	display: 'flex',
	justifyContent: 'flex-end',
}
const addButtonStyle = {
	backgroundColor: '#3f51b5', //? Добавлен цвет кнопки
	color: 'white',
	marginRight: '10px',
}
const closeButtonStyle = {
	backgroundColor: '#f50057', //? Добавлен цвет кнопки
	color: 'white',
}
const AddGenreModal = props => {
	const { createGenres } = useBooks()
	const [genre, setGenre] = useState('')
	const { open, handleClose } = props
	const handleAdd = () => {
		const newGenre = { name: genre }
		createGenres(newGenre)
		handleClose() //? Закрываем модальное окно после добавления категории
	}

	return (
		<Modal sx={modalStyle} open={open} onClose={handleClose}>
			<Box>
				<Typography component='h2' variant='h6' sx={headerStyle}>
					Добавить новый жанр
				</Typography>
				<TextField
					onChange={e => setGenre(e.target.value)}
					fullWidth
					variant='outlined'
					required
					sx={inputStyle}
				/>
				<Box sx={buttonContainerStyle}>
					<Button onClick={handleAdd} variant='contained' sx={addButtonStyle}>
						Добавить
					</Button>
					<Button
						variant='contained'
						onClick={handleClose}
						sx={closeButtonStyle}
					>
						Закрыть
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}

export default AddGenreModal
