import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Checkbox,
	IconButton,
	Rating,
	Stack,
	Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import React, { useState } from 'react'
import { useBooks } from '../context/BookContextProvider'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContextProvider'
import {
	AddShoppingCart,
	Bookmark,
	BookmarkBorder,
	DeleteOutline,
} from '@mui/icons-material'
import Detail from './Detail'
import { useFavorite } from '../context/FavoriteContextProvider'
import { useAuth } from '../context/AuthContextProvider'

const BookCard = ({ elem }) => {
	const navigate = useNavigate()
	const { deleteBook } = useBooks()
	const { addBookToCart } = useCart()
	const { user } = useAuth()
	const { addBookToFavorite } = useFavorite()
	const [open, setOpen] = useState(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const handleDeleteBook = () => {
		const confirmDelete = window.confirm(
			'Вы уверены, что хотите удалить эту книгу?'
		)
		if (confirmDelete) {
			deleteBook(elem.id)
		}
	}

	return (
		<Card
			sx={{
				width: { md: '25vw', lg: '19vw' },
				height: 680,
				boxShadow: 'none',
				margin: '2%',
				borderRadius: 4,
				border: '1px solid #ddd',
			}}
		>
			<CardActionArea onClick={handleOpen}>
				<CardMedia
					sx={{ height: 450, borderRadius: 4 }}
					image={elem.image}
					alt={elem.image}
				/>
			</CardActionArea>
			<CardContent sx={{ padding: '20px 5px 0px 5px' }}>
				<Typography fontSize='18' fontWeight={700} variant='h5' component='div'>
					{elem.title}
				</Typography>
				<Typography color='black' fontSize='16px' fontWeight={700}>
					{elem.description}
				</Typography>
				<Typography color='black' fontSize='24px' fontWeight={700}>
					{elem.price}KGS
				</Typography>
				<Stack spacing={1} margin='8px 0' sx={{ width: '120px' }}>
					<Rating name='haf-rating' defaultValue={0} precision={1} />
				</Stack>
				<IconButton
					color='primary'
					onClick={() => addBookToCart(elem)}
					sx={{ marginLeft: '8px' }}
				>
					<AddShoppingCart />
				</IconButton>
				<Checkbox
					icon={<BookmarkBorder />}
					checkedIcon={<Bookmark color='primary' />}
					onClick={() => addBookToFavorite(elem)}
				/>
				{user && (
					<>
						<IconButton
							className='delete-btn'
							onClick={handleDeleteBook}
							variant='contained'
							color='secondary'
							sx={{ marginLeft: '8px' }}
						>
							<DeleteOutline />
						</IconButton>
						<IconButton
							className='edit-btn'
							onClick={() => navigate(`/edit/${elem.id}`)}
							variant='contained'
							color='secondary'
							sx={{ marginLeft: '8px' }}
						>
							<EditIcon />
						</IconButton>
					</>
				)}
			</CardContent>
			<Detail elem={elem} open={open} handleClose={handleClose} />
		</Card>
	)
}

export default BookCard
