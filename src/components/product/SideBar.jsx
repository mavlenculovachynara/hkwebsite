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
		<Paper
		sx={{
		  p: 2,
		  backgroundColor: '#212123',
		  borderRadius: '8px',
		  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
		  color: 'white',
		}}
		elevation={5}
	  >
		<TextField
		  onChange={(e) => setSearch(e.target.value)}
		  variant='outlined'
		  label='Поиск...'
		  fullWidth
		  sx={{
			marginBottom: '16px',
          '& label.Mui-focused': { color: '#64FFDA' },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '& input': { color: 'white' },
          '& .MuiInputLabel-root': { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#94089E',
		  }}}}
		  InputProps={{ style: { color: 'white' } }}
		/>
		<FormControl sx={{ color: 'white' }}>
		  <FormLabel
			id='demo-radio-buttons-group-label'
			sx={{ color: 'white' }}
		  >
			Жанр
		  </FormLabel>
		  <RadioGroup
			defaultValue={'female'}
			name='radio-buttons-group'
			aria-labelledby='demo-radio-buttons-group-label'
			onChange={(e) => fetchByParams('genre', e.target.value)}
		  >
			<FormControlLabel
			  control={<Radio sx={{ color: '#94089E' }} />}
			  value={'all'}
			  label={'Все жанры'}
			/>
			{genre &&
			  genre.map((elem) => (
				<FormControlLabel
				  label={elem.name}
				  control={<Radio sx={{ color: '#94089E' }} />}
				  value={elem.name}
				  key={elem.id}
				/>
			  ))}
		  </RadioGroup>
		</FormControl>
	  </Paper>
	);
  };


export default SideBar
