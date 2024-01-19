import React from 'react'

import { useLike } from '../context/LikeContextProvider'

const Like = ({ bookId }) => {
	const { likeBook, likes } = useLike()

	const handleLikeClick = () => {
		likeBook(bookId)
	}

	const isLiked = likes.some(like => like.bookId === bookId)

	return (
		<div>
			<button onClick={handleLikeClick}>
				{isLiked ? 'Убрать лайк' : 'Поставить лайк'}
			</button>
			<span>{likes.filter(like => like.bookId === bookId).length}</span>
		</div>
	)
}

export default Like
