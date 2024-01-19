import React, { createContext, useContext, useReducer, useEffect } from 'react'

import { ACTIONS } from '../../helpers/const'

import {
	calcTotalPrice,
	getLocalStorageFav,
	getBooksInFavorite,
} from '../../helpers/functions'

const FavoriteContext = createContext()
export const useFavorite = () => useContext(FavoriteContext)

const INIT_STATE = {
	favorite: { books: getLocalStorageFav() || [] },
	favoriteLength: getBooksInFavorite(),
}

const reducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case ACTIONS.GET_FAVORITE:
			return { ...state, favorite: { books: action.payload } }
		default:
			return state
	}
}

export const FavoriteContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INIT_STATE)

	const getFavorite = () => {
		let favorite = getLocalStorageFav() || { books: [] }
		if (!favorite) {
			favorite = { books: [] }
		}
		dispatch({ type: ACTIONS.GET_FAVORITE, payload: favorite.books })
	}

	const addBookToFavorite = book => {
		let favorite = getLocalStorageFav() || { books: [] }
		const newBook = {
			item: book,
			count: 1,
		}
		const bookToFind = favorite.books.filter(elem => elem.item.id === book.id)
		if (bookToFind.length === 0) {
			favorite.books.push(newBook)
		} else {
			favorite.books = favorite.books.filter(
				() => elem => elem.item.id !== book.id
			)
		}
		favorite.totalPrice = calcTotalPrice(favorite.books)
		localStorage.setItem('favorite', JSON.stringify(favorite))
		dispatch({ type: ACTIONS.GET_FAVORITE, payload: favorite.books })
		getFavorite()
	}

	const checkBookInFavorite = id => {
		let favorite = getLocalStorageFav()
		if (favorite) {
			let newFavorite = favorite.books.filter(
				elem => elem.item && elem.item.id === id
			)
			return newFavorite.length > 0
		}
		return false
	}

	const deleteBookFromFavorite = id => {
		let favorite = getLocalStorageFav()
		favorite.books = favorite.books.filter(elem => elem.item.id !== id)
		localStorage.setItem('favorite', JSON.stringify(favorite))
		dispatch({
			type: ACTIONS.GET_FAVORITE,
			payload: favorite.books,
		})
	}

	useEffect(() => {
		getFavorite()
	}, [])

	return (
		<FavoriteContext.Provider
			value={{
				getFavorite,
				favorite: state.favorite,
				addBookToFavorite,
				checkBookInFavorite,
				deleteBookFromFavorite,
				getBooksInFavorite,
			}}
		>
			{children}
		</FavoriteContext.Provider>
	)
}
export default FavoriteContextProvider
