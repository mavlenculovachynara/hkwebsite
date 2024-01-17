import React, { useEffect } from 'react'
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { useCart } from '../context/CartContextProvider'

const Cart = () => {
	const { cart, getCart, changeBookCount, deleteBookFromCart } = useCart()

	useEffect(() => {
		getCart()
	}, [])

	const cartCleaner = () => {
		localStorage.removeItem('cart')
		getCart()
	}

	return (
		<TableContainer>
			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Фото</TableCell>
						<TableCell>Название</TableCell>
						<TableCell>Жанр</TableCell>
						<TableCell>Цена</TableCell>
						<TableCell>Количество</TableCell>
						<TableCell>Общая сумма</TableCell>
						<TableCell>Убрать из корзины</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{cart.books && cart.books.length > 0 ? (
						cart.books.map(elem => (
							<TableRow key={elem.item.id}>
								<TableCell component='th' scope='row'>
									<img width={'70'} src={elem.item.image} alt='' />
								</TableCell>
								<TableCell>{elem.item.title}</TableCell>
								<TableCell>{elem.item.genre}</TableCell>
								<TableCell>{elem.item.price}</TableCell>
								<TableCell>
									<input
										onChange={e => {
											changeBookCount(elem.item.id, e.target.value)
										}}
										type='number'
										min={1}
										max={20}
										value={elem.count}
									/>
								</TableCell>
								<TableCell>{elem.subPrice}</TableCell>
								<TableCell>
									<Button
										variant='contained'
										onClick={() => deleteBookFromCart(elem.item.id)}
									>
										Удалить
									</Button>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={5}>Нет книг в корзине</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<Button variant='contained' onClick={cartCleaner}>
				Купить за {cart.totalPrice}KGS
			</Button>
		</TableContainer>
	)
}

export default Cart
