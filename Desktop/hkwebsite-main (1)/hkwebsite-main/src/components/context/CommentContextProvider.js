import React, { createContext, useContext, useEffect, useReducer } from 'react'

import axios from 'axios'

import fire from '../../fire'

import { ACTIONS, API_COMMENTS } from '../../helpers/const'

const CommentContext = createContext()

const reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.GET_COMMENTS:
			return { ...state, comments: action.payload }
		case ACTIONS.ADD_COMMENT:
			return { ...state, comments: [...state.comments, action.payload] }
		case ACTIONS.CHECK_COMMENT:
			return { ...state, comments: [...state.comments, action.payload] }
		case ACTIONS.DELETE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(
					comment => comment.id !== action.payload
				),
			}
		default:
			return state
	}
}

export const useComment = () => useContext(CommentContext)

const CommentContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, { comments: [] })

	const getComments = async commentId => {
		try {
			const response = await axios(`${API_COMMENTS}?objectId=${commentId}`)
			dispatch({ type: ACTIONS.GET_COMMENTS, payload: response.data })
		} catch (error) {
			console.error('Ошибка:', error)
		}
	}

	const addComment = async newComment => {
		try {
			const user = fire.auth().currentUser
			if (!user) {
				console.log('Пользователь не зарегистрирован')
				return
			}
			const data = await axios.post(API_COMMENTS, newComment, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${await user.getIdToken()}`,
				},
			})
			dispatch({ type: ACTIONS.ADD_COMMENT, payload: data.data })
			getComments(newComment.commentId)
		} catch (error) {
			console.error('Ошибка добавления:', error.response || error)
		}
	}

	const checkComment = async newComment => {
		try {
			if (!newComment.commentId) {
				return
			}
			const data = await axios.post(API_COMMENTS, newComment)
			dispatch({ type: ACTIONS.CHECK_COMMENT, payload: data })
		} catch (error) {
			console.error('Ошибка проверки комментария:', error.data || error)
		}
	}

	const deleteComment = async commentId => {
		try {
			const user = fire.auth().currentUser
			if (!user) {
				console.log('Пользователь не зарегистрирован')
				return
			}
			await axios.delete(`${API_COMMENTS}/${commentId}`, {
				headers: {
					Authorization: `Bearer ${await user.getIdToken()}`,
				},
			})
			dispatch({ type: ACTIONS.DELETE_COMMENT, payload: commentId })
		} catch (error) {
			console.error('Ошибка удаления:', error.response || error)
		}
	}

	useEffect(() => {
		getComments()
	}, [])

	return (
		<CommentContext.Provider
			value={{
				getComments,
				comments: state.comments,
				addComment,
				checkComment,
				deleteComment,
			}}
		>
			{children}
		</CommentContext.Provider>
	)
}

export default CommentContextProvider