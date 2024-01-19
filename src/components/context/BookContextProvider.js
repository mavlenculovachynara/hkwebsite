import React, { createContext, useContext, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

import { ACTIONS, API, API_GENRE } from '../../helpers/const'

export const bookContext = createContext()
export const useBooks = () => useContext(bookContext)

const INIT_STATE = {
	books: [],
	oneBook: null,
	genre: [],
}
const reducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case ACTIONS.GET_BOOKS:
			return { ...state, books: action.payload }
		case ACTIONS.GET_ONE_BOOK:
			return { ...state, oneBook: action.payload }
		case ACTIONS.GET_GENRE:
			return { ...state, genre: action.payload }
		default:
			return state
	}
}
const BookContextProvider = ({ children }) => {
	const navigate = useNavigate()
	const [state, dispatch] = useReducer(reducer, INIT_STATE)

	//! CREATE
	const addBook = async newBook => {
		await axios.post(API, newBook)
		navigate('/books')
	}
	//! READ
	const getBooks = async () => {
		const { data } = await axios(`${API}${window.location.search}`)
		dispatch({
			type: ACTIONS.GET_BOOKS,
			payload: data,
		})
	}
	//! DELETE
	const deleteBook = async id => {
		await axios.delete(`${API}/${id}`)
		getBooks()
	}
	//! EDIT
	const editBook = async (id, editedBook) => {
		await axios.patch(`${API}/${id}`, editedBook)
		getBooks()
		navigate('/books')
	}
	//! GET_ONE_BOOK
	const getOneBook = async id => {
		const { data } = await axios(`${API}/${id}`)
		dispatch({ type: ACTIONS.GET_ONE_BOOK, payload: data })
	}

	//! GET_GENRES
	const getGenres = async () => {
		const { data } = await axios(API_GENRE)
		dispatch({ type: ACTIONS.GET_GENRE, payload: data })
	}
	//! CREATE_GENRES
	const createGenres = async newGenre => {
		await axios.post(API_GENRE, newGenre)
	}
	//! Filter && Sort
	const fetchByParams = (query, value) => {
		const search = new URLSearchParams(window.location.search)
		if (value === 'all') {
			search.delete(query)
		} else {
			search.set(query, value)
		}
		const url = `${window.location.pathname}?${search.toString()}`
		navigate(url)
	}

	return (
		<bookContext.Provider
			value={{
				addBook,
				getBooks,
				books: state.books,
				deleteBook,
				getOneBook,
				editBook,
				oneBook: state.oneBook,
				getGenres,
				createGenres,
				genre: state.genre,
				fetchByParams,
			}}
		>
			{children}
		</bookContext.Provider>
	)
}

export default BookContextProvider
