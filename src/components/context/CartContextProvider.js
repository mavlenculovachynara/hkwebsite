import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS } from "../../helpers/const";
import {
  calcSubPrice,
  calcTotalPrice,
  getLocalStorage,
  getBooksCountInCart,
} from "../../helpers/functions";
export const cartContext = createContext();
export const useCart = () => useContext(cartContext);
const INIT_STATE = {
  cart: JSON.parse(localStorage.getItem("cart")),
  cartLength: getBooksCountInCart(),
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};
const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  //! Функция для получения продуктов добавленных из хранилища
  const getCart = () => {
    let cart = getLocalStorage();
    //! Проверка на наличие данных под ключом cart в localStorage
    if (!cart) {
      localStorage.setItem(
        "cart",
        JSON.stringify({ books: [], totalPrice: 0 })
      );
      //! Перезаписываем переменную cart с null на объект
      cart = {
        books: [],
        totalPrice: 0,
      };
    }
    dispatch({ type: ACTIONS.GET_CART, payload: cart });
  };
  //! Функция добавления товара в корзину
  const addBookToCart = (book) => {
    //! Получаем содержимое из хранилища под ключом cart
    let cart = getLocalStorage();
    //! Проверка на существование данных в хранилище под ключом cart
    if (!cart) {
      cart = {
        books: [],
        totalPrice: 0,
      };
    }
    const newBook = {
      item: book,
      count: 1,
      subPrice: +book.price,
    };
    //! Проверяем есть ли уже продукт, который хотим добавить в корзину
    const bookToFind = cart.books.filter((elem) => elem.item.id === book.id);
    //! Если товар уже добавлен в корзину, то удаляем его из массива cart.products через фильтр, в противном случае добавляем его в cart.products
    if (bookToFind.length === 0) {
      cart.books.push(newBook);
    } else {
      cart.books = cart.books.filter(() => (elem) => elem.item.id !== book.id);
    }
    //! Пересчитываем totalPrice, так как количество поменялось
    cart.totalPrice = calcTotalPrice(cart.books);
    //! Обновляем данные в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    //! Обновляем состояние
    dispatch({ type: ACTIONS.GET_CART, payload: cart });
  };
  //! Функция для проверки на наличии товара в корзине
  const checkBookInCart = (id) => {
    let cart = getLocalStorage();
    if (cart && cart.books) {
      let newCart = cart.books.filter((elem) => elem.item.id === id);
      return newCart.length > 0 ? true : false;
    }
    return false; // return false if cart or cart.books is undefined
  };
  //! Функция для изменения количества товаров в корзине
  const changeBookCount = (id, count) => {
    //! Получаем данные корзины из localStorage
    let cart = getLocalStorage();
    //! Перебираем массив с продуктами из корзины, и у продукта, у которого id совпадает с тем id, что передали при вызове, перезаписываем количество и subPrice
    cart.books = cart.books.map((book) => {
      if (book.item.id === id) {
        book.count = count;
        book.subPrice = calcSubPrice(book);
      }
      return book;
    });
    cart.totalPrice = calcTotalPrice(cart.books);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({ type: ACTIONS.GET_CART, payload: cart });
  };

  //! DELETE PRODUCT из корзины
  const deleteBookFromCart = (id) => {
    let cart = getLocalStorage();
    //! Фильтруем массив products и оставляем только те продукты, у которых id не совпадает с id переданным при вызове функции
    cart.books = cart.books.filter((elem) => {
      return elem.item.id !== id;
    });
    cart.totalPrice = calcTotalPrice(cart.books);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: ACTIONS.GET_CART,
      payload: cart,
    });
  };

  return (
    <cartContext.Provider
      value={{
        addBookToCart,
        cart: state.cart,
        getCart,
        checkBookInCart,
        changeBookCount,
        deleteBookFromCart,
        getBooksCountInCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
