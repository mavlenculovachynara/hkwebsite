import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	FormControl,
	IconButton,
	TextField,
	Typography,
} from '@mui/material'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined'
import EditIcon from '@mui/icons-material/Edit'
import AddShoppingCart from '@mui/icons-material/AddShoppingCart'
import Bookmark from '@mui/icons-material/Bookmark'
import BookmarkBorder from '@mui/icons-material/BookmarkBorder'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import CommentBankOutlinedIcon from '@mui/icons-material/CommentBankOutlined'

import { useBooks } from '../context/BookContextProvider'
import { useCart } from '../context/CartContextProvider'
import { useFavorite } from '../context/FavoriteContextProvider'
import { useAuth } from '../context/AuthContextProvider'
import { useComment } from '../context/CommentContextProvider'
import Detail from './Detail'

const BookCard = ({ elem }) => {
	const [isLiked, setLiked] = useState(false)
	const [likeCount, setLikeCount] = useState(0)
	const [commentText, setCommentText] = useState('')
	const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
	const [open, setOpen] = useState(false)

	const likeRef = useRef(localStorage.getItem(`like-${elem.id}`) === 'true')
	const likeCountRef = useRef(
		Number(localStorage.getItem(`likeCount-${elem.id}`)) || 0
	)

	const { user, admin } = useAuth()
	const { addBookToCart } = useCart()
	const { deleteBook } = useBooks()
	const { addComment } = useComment()
	const { addBookToFavorite } = useFavorite()

	const navigate = useNavigate()

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const handleLike = () => {
		if (user) {
			const updatedLike = !isLiked
			setLiked(updatedLike)
			setLikeCount(prevCount => (updatedLike ? prevCount + 1 : prevCount - 1))
			likeRef.current = updatedLike
			likeCountRef.current = likeCountRef.current + (updatedLike ? 1 : -1)

			localStorage.setItem(`like-${elem.id}`, updatedLike)
			localStorage.setItem(
				`likeCount-${elem.id}`,
				likeCountRef.current.toString()
			)
		} else {
			alert('Только зарегистрированные пользователи могут ставить лайки!')
		}
	}

	const handleDeleteBook = () => {
		const confirmDelete = window.confirm(
			'Вы уверены, что хотите удалить эту книгу?'
		)
		if (confirmDelete) {
			deleteBook(elem.id)
		}
	}

	const handleAddToComment = () => {
		if (commentText.trim() !== '') {
			addComment({ objectId: elem.id, text: commentText })
			setIsCommentModalOpen(false)
			setCommentText('')
		} else {
			console.log('Текст отзыва пуст.')
		}
	}

	const handleOpenCommentModal = () => {
		if (user) {
			setIsCommentModalOpen(true)
		} else {
			alert('Только зарегистрированные пользователи могут оставлять отзывы!')
		}
	}

	const handleCloseCommentModal = () => {
		setIsCommentModalOpen(false)
	}

	useEffect(() => {
		setLiked(user ? likeRef.current : false)
		setLikeCount(likeCountRef.current)
	}, [user])

	return (
		<Card
			sx={{
				width: { md: '25vw', lg: '19vw' },
				height: 580,
				boxShadow: 'none',
				margin: '2%',
				borderRadius: 4,
				border: '1px solid #94089E',
				backgroundColor: '#212123'
			}}
		>
			<CardActionArea onClick={handleOpen}>
				<CardMedia
					sx={{ height: 350 }}
					image={elem.image}
					alt={elem.image}
				/>
			</CardActionArea>
			<CardContent sx={{ padding: '20px 5px 0px 5px' }}>
				<Typography fontSize='18' fontWeight={700} variant='h5' color={'white'} component='div'>
					{elem.title}
				</Typography>
				<Typography color='white' fontSize='16px' fontWeight={700}>
					{elem.description}
				</Typography>
				<Typography color='white' fontSize='24px' fontWeight={700}>
					{elem.price}KGS
				</Typography>
				<br />
				<Divider />
				<IconButton onClick={() => addBookToCart(elem)}>
					<AddShoppingCart style={{color: 'white'}} />
				</IconButton>
				<IconButton
					onClick={() => {
						addBookToFavorite(elem)
					}}
				>
					<Checkbox style={{color:'white'}} icon={<BookmarkBorder  />} checkedIcon={<Bookmark />} />
				</IconButton>
				<IconButton onClick={handleOpenCommentModal}>
					<CommentBankOutlinedIcon style={{color:'white'}}/>
				</IconButton>
				<IconButton
					onClick={() => {
						handleLike()
					}}
				>
					<ThumbUpOffAltOutlinedIcon
						sx={{ color: isLiked ? 'red' : 'white' }}
					/>
					<Typography style={{color:'white'}} variant='subtitle2'>{likeCount}</Typography>
				</IconButton>
				<Dialog
					open={isCommentModalOpen}
					onClose={handleCloseCommentModal}
					aria-labelledby='form-dialog-title'
				>
					<DialogTitle id='form-dialog-title' style={{backgroundColor:'#212123', color:'white'}}>Отзыв:</DialogTitle>
					<DialogContent style={{backgroundColor:'#212123'}}>
						<FormControl fullWidth style={{backgroundColor:'#212123'}}>
						<TextField
                           autoFocus
						   margin='dense'
						   id='commentText'
						   label='Отзыв'
						   type='text'
						   multiline
						   rows={5}
						   value={commentText}
						   onChange={e => setCommentText(e.target.value)}
						   fullWidth
						   InputProps={{ style: { color: 'white' } }}
						   style={{ backgroundColor: '#212123' }} 
						    />
						</FormControl>
					</DialogContent>
					<DialogActions style={{backgroundColor:'#212123'}}>
						<Button
							onClick={handleCloseCommentModal}
							color='primary'
							variant='contained'
						>
							Отмена
						</Button>
						<Button
							onClick={handleAddToComment}
							color='primary'
							variant='contained'
						>
							Добавить
						</Button>
					</DialogActions>
				</Dialog>
				{admin && (
					<>
						<IconButton onClick={handleDeleteBook}>
							<DeleteOutline
								className='delete-btn'
								variant='contained'
								color='secondary'
							/>
						</IconButton>
						<IconButton onClick={() => navigate(`/edit/${elem.id}`)}>
							<EditIcon
								className='edit-btn'
								variant='contained'
								color='secondary'
							/>
						</IconButton>
					</>
				)}
			</CardContent>
			<Detail elem={elem} open={open} handleClose={handleClose} />
		</Card>
	)
}

export default BookCard