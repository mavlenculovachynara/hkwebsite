import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Paper,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useBooks } from '../context/BookContextProvider'
import { useSearchParams } from 'react-router-dom'

const SideBar = () => {
	const { genre, getGenres, fetchByParams } = useBooks()
	const [searchParams, setSearchParams] = useSearchParams()
	const [search, setSearch] = useState(searchParams.get('q') || '')
	useEffect(() => {
		getGenres()
	}, [])
	useEffect(() => {
		setSearchParams({
			q: search,
		})
	}, [search])
	return (
		<Paper sx={{ p: 2 }} elevation={5}>
			<TextField
				onChange={e => setSearch(e.target.value)}
				variant='standard'
				label='Поиск...'
				fullWidth
			/>
			<FormControl>
				<FormLabel id='demo-radio-buttons-group-label'>Жанр</FormLabel>
				<RadioGroup
					defaultValue={'female'}
					name='radio-buttons-group'
					aria-labelledby='demo-radio-buttons-group-label'
					onChange={e => fetchByParams('genre', e.target.value)}
				>
					<FormControlLabel
						control={<Radio />}
						value={'all'}
						label={'Все жанры'}
					></FormControlLabel>
					{genre &&
						genre.map(elem => (
							<FormControlLabel
								label={elem.name}
								control={<Radio />}
								value={elem.name}
								key={elem.id}
							/>
						))}
				</RadioGroup>
			</FormControl>
		</Paper>
	)
}

export default SideBar
