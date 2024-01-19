//! Функция для получения данных из хранилища под ключом cart
export const getLocalStorage = () => {
	const cart = JSON.parse(localStorage.getItem('cart'))
	return cart
}
//! Функция для подсчёта всех товаров
export const calcTotalPrice = books => {
	const totalPrice = books.reduce((acc, curr) => (acc += curr.subPrice), 0)
	return totalPrice
}
//! Функция для подсчёта стоимости за одну позицию
export const calcSubPrice = book => {
	return +book.item.price * book.count
}
//! Функция, которая возвращает длину массива в localStorage
export const getBooksCountInCart = () => {
	let cart = getLocalStorage()
	return cart && cart.books ? cart.books.length : 0
}

export const getBooksInFavorite = () => {
	let favorite = getLocalStorage()
	return favorite && favorite.books ? favorite.books.length : 0
}
export const getLocalStorageFav = () => {
	const favorite = JSON.parse(localStorage.getItem('favorite'))
	return favorite
}
