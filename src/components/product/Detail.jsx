import React, { useEffect, useState } from 'react'
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	IconButton,
	Modal,
	TextField,
	Typography,
} from '@mui/material'
import CommentBankOutlinedIcon from '@mui/icons-material/CommentBankOutlined'
import { Bookmark, BookmarkBorder, Delete } from '@mui/icons-material'

import { useCart } from '../context/CartContextProvider'
import { useFavorite } from '../context/FavoriteContextProvider'
import { useComment } from '../context/CommentContextProvider'
import { useAuth } from '../context/AuthContextProvider'

const Detail = props => {
	const { elem, open, handleClose } = props
	const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
	const [commentText, setCommentText] = useState('')
	const { user, admin } = useAuth()
	const { addBookToCart, checkBookInCart } = useCart()
	const { addBookToFavorite, checkBookInFavorite } = useFavorite()
	const { addComment, comments, getComments, deleteComment } = useComment()

	const [isBookInFavorite, setIsBookInFavorite] = useState(
		checkBookInFavorite(props.elem)
	)
	const style = {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '37vw',
		height: '80vh',
		zIndex: '1000',
		border: '2px solid black',
		boxShadow: 24,
		backgroundColor: 'white',
		padding: '16px',
		borderRadius: '4px',
		flexDirection: 'column',
		overflowY: 'auto',
		display: 'grid',
		gridTemplateColumns: 'auto 1fr',
	}
	const commentStyle = {
		border: '1px solid #ccc',
		padding: '10px',
		borderRadius: '4px',
		marginTop: '16px',
		display: 'flex',
		alignItems: 'center',
	}

	const handleAddToFavorite = async () => {
		await addBookToFavorite(elem)
		setIsBookInFavorite(prevState => !prevState)
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
	const handleDeleteComment = commentId => {
		if (!admin) {
			console.log('У вас нет прав для удаления комментариев')
			return
		}
		deleteComment(commentId)
		getComments(elem.id)
	}
	const handleOpenCommentModal = () => {
		setIsCommentModalOpen(true)
	}
	const handleCloseCommentModal = () => {
		setIsCommentModalOpen(false)
	}
	useEffect(() => {
		const fetchData = async () => {
			const result = await checkBookInFavorite(props.elem)
			setIsBookInFavorite(result)
		}
		fetchData()
	}, [props.elem])

	useEffect(() => {
		if (open) {
			getComments(elem.id)
		}
	}, [elem.id, getComments, open])

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
					{checkBookInCart(elem.id) ? (
						<Button variant='contained' disabled>
							Добавлено в корзину
						</Button>
					) : (
						<Button variant='contained' onClick={() => addBookToCart(elem)}>
							Купить сейчас {elem.price}KGS
						</Button>
					)}
					<IconButton onClick={handleAddToFavorite}>
						<Checkbox
							icon={<BookmarkBorder />}
							checkedIcon={
								<Bookmark
									style={{
										color: isBookInFavorite,
									}}
								/>
							}
						/>
					</IconButton>
					{user ? (
						<IconButton onClick={handleOpenCommentModal}>
							<CommentBankOutlinedIcon />
						</IconButton>
					) : (
						<div style={{ color: 'red' }}>
							Только зарегистрированные пользователи могут оставлять отзывы!
						</div>
					)}
					<Dialog
						open={isCommentModalOpen}
						onClose={handleCloseCommentModal}
						aria-labelledby='form-dialog-title'
					>
						<DialogTitle id='form-dialog-title'>Отзыв:</DialogTitle>
						<DialogContent>
							<FormControl fullWidth>
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
								/>
							</FormControl>
						</DialogContent>
						<DialogActions>
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
				</div>
				<div style={{ gridColumn: 'span 2', marginTop: '16px' }}>
					<Typography variant='h6'>Отзывы:</Typography>
					{comments
						.filter(comment => comment.objectId === elem.id)
						.map((comment, index) => (
							<div key={index} style={commentStyle}>
								<Avatar>{user && user.name ? user.name.charAt(0) : ''}</Avatar>
								<div>
									<Typography>{user.email}</Typography>
									<Typography>{comment.text}</Typography>
								</div>
								{admin && (
									<IconButton onClick={() => handleDeleteComment(comment.id)}>
										<Delete color='secondary' />
									</IconButton>
								)}
							</div>
						))}
				</div>
			</Box>
		</Modal>
	)
}

export default Detail
