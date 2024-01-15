import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect } from 'react'
import { useBooks } from '../context/BookContextProvider'

const GenreSelect = props => {
	const { handleInput } = props
	const { genre, getGenres } = useBooks()
	useEffect(() => {
		getGenres()
	}, [])
	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-label'>Жанр</InputLabel>
				<Select
					label='Genre'
					defaultValue={''}
					name='Жанр'
					id='demo-simple-select-label'
					labelId='demo-simple-select-label'
					onChange={handleInput}
				>
					{genre.map(elem => (
						<MenuItem value={elem.name} key={elem.id}>
							{elem.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	)
}

export default GenreSelect
