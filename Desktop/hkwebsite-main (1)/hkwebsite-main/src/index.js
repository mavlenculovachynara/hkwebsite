import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'

import CartContextProvider from './components/context/CartContextProvider'
import AuthContextProvider from './components/context/AuthContextProvider'
import FavoriteContextProvider from './components/context/FavoriteContextProvider'
import CommentContextProvider from './components/context/CommentContextProvider'
import BookContextProvider from './components/context/BookContextProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<BrowserRouter>
		<AuthContextProvider>
			<BookContextProvider>
				<CartContextProvider>
					<FavoriteContextProvider>
						<CommentContextProvider>
							<App />
						</CommentContextProvider>
					</FavoriteContextProvider>
				</CartContextProvider>
			</BookContextProvider>
		</AuthContextProvider>
	</BrowserRouter>
)