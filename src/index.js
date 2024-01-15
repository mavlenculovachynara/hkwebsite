import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import ProductContextProvider from './components/context/BookContextProvider'
import CartContextProvider from './components/context/CartContextProvider'
import AuthContextProvider from './components/context/AuthContextProvider'
import { FavoriteProvider } from './components/context/FavoriteContextProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<AuthContextProvider>
			<ProductContextProvider>
				<CartContextProvider>
					<FavoriteProvider>
						<App />
					</FavoriteProvider>
				</CartContextProvider>
			</ProductContextProvider>
		</AuthContextProvider>
	</BrowserRouter>
)
