import React, { useEffect } from 'react'

import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'

import { useFavorite } from '../context/FavoriteContextProvider'

const Favorite = () => {
	const { favorite, getFavorite, deleteBookFromFavorite } = useFavorite()

	const favCleaner = () => {
		localStorage.removeItem('favorite')
		getFavorite()
	}

	useEffect(() => {
		getFavorite()
	}, [])

	return (
		<div>
			<TableContainer>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Фото</TableCell>
							<TableCell>Название</TableCell>
							<TableCell>Жанр</TableCell>
							<TableCell>Цена</TableCell>
							<TableCell>Удалить с заметок</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{favorite.books && favorite.books.length > 0 ? (
							favorite.books.map(elem => (
								<TableRow key={elem.item.id}>
									<TableCell component='th' scope='row'>
										{elem.item.id && (
											<img width={'70'} src={elem.item.image} alt='' />
										)}
									</TableCell>
									<TableCell>{elem.item.title}</TableCell>
									<TableCell>{elem.item.genre}</TableCell>
									<TableCell>{elem.item.price}</TableCell>
									<TableCell>
										<Button
											variant='contained'
											onClick={() => deleteBookFromFavorite(elem.item.id)}
										>
											Удалить
										</Button>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5}>Нет избранных книг</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default Favorite
