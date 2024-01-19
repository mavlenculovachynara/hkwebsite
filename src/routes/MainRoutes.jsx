import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import Home from '../pages/Home'
import BookPage from '../pages/BookPage'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import Cart from '../pages/Cart'
import AuthPage from '../pages/AuthPage'
import Admin from '../pages/Admin'
import EditPage from '../pages/EditPage'
import FavoritePage from '../pages/FavoritePage'
import CommentPage from './../pages/CommentPage'

import { useAuth } from '../components/context/AuthContextProvider'
import { ADMIN } from '../helpers/const'

const MainRoutes = () => {
	const PUBLIC_ROUTES = [
		{ id: 1, link: '/', element: <Home /> },
		{ id: 2, link: '/books', element: <BookPage /> },
		{ id: 3, link: '/about', element: <About /> },
		{ id: 4, link: '*', element: <NotFound /> },
		{ id: 5, link: '/cart', element: <Cart /> },
		{ id: 6, link: '/favorite', element: <FavoritePage /> },
		{ id: 7, link: '/auth', element: <AuthPage /> },
		{ id: 8, link: '/comments', element: <CommentPage /> },
	]
	const PRIVATE_ROUTES = [
		{ id: 9, link: '/admin', element: <Admin /> },
		{ id: 10, link: '/edit/:id', element: <EditPage /> },
	]
	const { user } = useAuth()
	return (
		<div>
			<Routes>
				{PUBLIC_ROUTES.map(elem => (
					<Route path={elem.link} key={elem.id} element={elem.element} />
				))}
				{user
					? PRIVATE_ROUTES.map(elem => (
							<Route
								key={elem.id}
								path={elem.link}
								element={
									user.email === ADMIN ? elem.element : <Navigate to='*' />
								}
							/>
					  ))
					: null}
			</Routes>
		</div>
	)
}

export default MainRoutes
