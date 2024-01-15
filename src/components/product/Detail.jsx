import { Box, Button, Checkbox, Modal } from '@mui/material'
import React, { useState } from 'react'
import { useCart } from '../context/CartContextProvider'
import { useFavorite } from '../context/FavoriteContextProvider'
import { Bookmark, BookmarkBorder } from '@mui/icons-material'

const Detail = props => {
	const { addBookToFavorite, checkBookInFavorite } = useFavorite()
	const { addBookToCart, checkBookInCart } = useCart()
	const [isBookInFavorite, setIsBookInFavorite] = useState(
		checkBookInFavorite(props.elem)
	)
	const style = {
		position: 'absolute',
		top: '30%',
		left: '30%',
		width: 700,
		display: 'flex',
		border: '2px solid black',
		boxShadow: 24,
		backgroundColor: 'white',
		padding: '16px',
		borderRadius: '4px',
	}
	const { elem, open, handleClose } = props

	const handleAddToFavorite = () => {
		addBookToFavorite(elem)
		setIsBookInFavorite(!isBookInFavorite)
	}

	return (
		<Modal
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
			open={open}
			onClose={handleClose}
		>
			<Box sx={style}>
				<div>
					<img width={250} src={elem.image} alt={elem.title} />
				</div>
				<div style={{ marginLeft: '16px' }}>
					<h1>{elem.title}</h1>
					<p>{elem.description}</p>
					<p>{elem.genre}</p>
				</div>
				<div style={{ marginTop: 'auto', marginLeft: 'auto' }}>
					<Button onChange={handleAddToFavorite}>
						<Checkbox
							icon={<BookmarkBorder />}
							checkedIcon={
								<Bookmark color={isBookInFavorite ? 'black' : 'white'} />
							}
						/>
					</Button>
					{checkBookInCart(elem.id) ? (
						<Button variant='contained' disabled>
							Добавлено в корзину
						</Button>
					) : (
						<Button variant='contained' onClick={() => addBookToCart(elem)}>
							Купить сейчас {elem.price}KGS
						</Button>
					)}
				</div>
			</Box>
		</Modal>
	)
}

export default Detail
