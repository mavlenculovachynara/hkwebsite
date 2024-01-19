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
			<TableContainer sx={{ backgroundColor: "#212123", color: "#FFFFFF" }}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell sx={{ backgroundColor: "#212123", color: "white" }}>Фото</TableCell>
							<TableCell sx={{ backgroundColor: "#212123", color: "white" }}>Название</TableCell>
							<TableCell sx={{ backgroundColor: "#212123", color: "white" }}>Жанр</TableCell>
							<TableCell sx={{ backgroundColor: "#212123", color: "white" }}>Цена</TableCell>
							<TableCell sx={{ backgroundColor: "#212123", color: "white" }}>Удалить с заметок</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{favorite.books && favorite.books.length > 0 ? (
							favorite.books.map(elem => (
								<TableRow key={elem.item.id}>
									<TableCell sx={{ backgroundColor: "#212123", color: "white"}} component='th' scope='row'>
										{elem.item.id && (
											<img width={'70'} src={elem.item.image} alt='' />
										)}
									</TableCell>
									<TableCell sx={{ backgroundColor: "#212123", color: " #6c3eb8 " }}>{elem.item.title}</TableCell>
									<TableCell sx={{ backgroundColor: "#212123", color: "white"}}>{elem.item.genre}</TableCell>
									<TableCell sx={{ backgroundColor: "#212123", color: "white"}}>{elem.item.price}</TableCell>
									<TableCell>
										<Button
											variant='contained'
											onClick={() => deleteBookFromFavorite(elem.item.id)}
											sx={{
												backgroundColor: "rgb(108, 62, 184)",
												color: "#FFFFFF",
											  }}
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