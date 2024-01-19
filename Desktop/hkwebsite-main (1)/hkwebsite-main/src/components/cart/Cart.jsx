import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useCart } from "../context/CartContextProvider";
import PaymentModal from "./PaymentModal";

const Cart = () => {
  const { cart, getCart, changeBookCount, deleteBookFromCart } = useCart();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true); // открытие модального окна
  };

  const handleClose = () => {
    setOpen(false); // закрытие модального окна
  };
  useEffect(() => {
    getCart();
  }, []);
  const cartCleaner = () => {
    localStorage.removeItem("cart");
    getCart();
  };

  // Стили для компонента Cart
  const cartContainerStyle = {
    backgroundColor: "#191919",
    padding: "20px",
  };

  const tableCellStyle = {
    color: "white",
  };

  const buttonStyle = {
    backgroundColor: "#6c3eb8",
    color: "white",
  };

  return (
    <TableContainer style={cartContainerStyle}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={tableCellStyle}>Фото</TableCell>
            <TableCell style={tableCellStyle}>Название</TableCell>
            <TableCell style={tableCellStyle}>Жанр</TableCell>
            <TableCell style={tableCellStyle}>Цена</TableCell>
            <TableCell style={tableCellStyle}>Количество</TableCell>
            <TableCell style={tableCellStyle}>Общая сумма</TableCell>
            <TableCell style={tableCellStyle}>Убрать из корзины</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.books.length > 0 ? (
            cart.books.map((elem) => (
              <TableRow key={elem.item.id}>
                <TableCell style={tableCellStyle} component="th" scope="row">
                  <img width={"70"} src={elem.item.image} alt="" />
                </TableCell>
                <TableCell style={tableCellStyle}>{elem.item.title}</TableCell>
                <TableCell style={tableCellStyle}>{elem.item.genre}</TableCell>
                <TableCell style={tableCellStyle}>{elem.item.price}</TableCell>
                <TableCell style={tableCellStyle}>
                  <input
                    onChange={(e) => {
                      changeBookCount(elem.item.id, e.target.value);
                    }}
                    type="number"
                    min={1}
                    max={20}
                    value={elem.count}
                  />
                </TableCell>
                <TableCell style={tableCellStyle}>{elem.subPrice}</TableCell>
                <TableCell style={tableCellStyle}>
                  <Button
                    variant="contained"
                    onClick={() => deleteBookFromCart(elem.item.id)}
                    style={buttonStyle}
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} style={tableCellStyle}>
                Нет книг в корзине
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Button variant="contained" onClick={handleOpen} style={buttonStyle}>
        Купить за {cart.totalPrice}KGS
      </Button>
      <PaymentModal
        open={open}
        cartCleaner={cartCleaner}
        handleClose={handleClose}
      />
    </TableContainer>
  );
};

export default Cart;