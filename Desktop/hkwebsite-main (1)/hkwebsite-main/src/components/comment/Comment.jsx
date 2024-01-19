import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useComment } from '../context/CommentContextProvider'
import { API_COMMENTS, API } from '../../helpers/const'

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
} from '@mui/material'
import { Delete } from '@mui/icons-material'

const Comment = props => {
	const { comments, getComments, addComment, deleteComment } = useComment()
	const [commentText, setCommentText] = useState('')
	const [bookDetails, setBookDetails] = useState(null)
	const [id, setId] = useState(props.id)

	const handleComment = e => {
		e.preventDefault()
		if (!commentText.trim()) {
			return
		}
		const newComment = {
			id,
			text: commentText,
		}
		axios
			.post(API_COMMENTS.ADD_COMMENT, newComment)
			.then(data => {
				addComment(data)
				setCommentText('')
				getComments(id)
			})
			.catch(error => {
				console.error('Ошибка добавления комментария:', error)
			})
	}

	const handleDeleteComment = commentId => {
		deleteComment(commentId)
		getComments(id)
	}

	useEffect(() => {
		if (id) {
			axios
				.post(`${API}/${id}`)
				.then(response => {
					console.log('Получение детали книги:', response.data)
					setBookDetails(response.data)
				})
				.catch(error => {
					if (error.response && error.response.status === 404) {
						console.error('Книга не найдена:', error)
					} else {
						console.error('Ошибка при извлечении сведений о книге:', error)
					}
				})
		}
	}, [id])

	return (
		<>
			{bookDetails && (
				<TableContainer sx={{ minWidth: 650 }} aria-label='simple table'>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Фото</TableCell>
								<TableCell>Название</TableCell>
								<TableCell>Жанр</TableCell>
								<TableCell>Цена</TableCell>
								<TableCell>Рецензия</TableCell>
								<TableCell>Действия</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{comments && comments.length > 0 ? (
								comments.map(elem => (
									<TableRow key={elem.item.id}>
										<TableCell component='th' scope='row'>
											{elem.item.id && (
												<img width={'70'} src={elem.item.image} alt='' />
											)}
										</TableCell>
										<TableCell>{elem.item.title}</TableCell>
										<TableCell>{elem.item.genre}</TableCell>
										<TableCell>{elem.item.price}</TableCell>
										<TableCell>{elem.item.text}</TableCell>
										<TableCell>
											<IconButton
												onClick={() => handleDeleteComment(elem.id)}
												color='error'
											>
												<Delete />
											</IconButton>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={6}>Нет рецензий</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	)
}

export default Comment