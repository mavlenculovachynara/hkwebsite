import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Объект стилей для модального окна
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  backgroundColor: "white",
  padding: 20,
  borderRadius: 8,
};

// Объект стилей для текстовых полей
const textFieldStyle = {
  marginBottom: 10,
  width: "100%",
};

const PaymentModal = ({ open, handleClose, cartCleaner }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = () => {
    // Здесь вы можете добавить логику обработки платежа
    console.log("Оплата произведена");
    handleClose();
    cartCleaner(); // очистка корзины
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div style={modalStyle}>
        <h2>Оплата картой</h2>
        <TextField
          label="Номер карты"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          style={textFieldStyle}
        />
        <TextField
          label="Срок действия"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          style={textFieldStyle}
        />
        <TextField
          label="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          style={textFieldStyle}
        />
        <Button variant="contained" onClick={handlePayment}>
          Оплатить
        </Button>
      </div>
    </Modal>
  );
};

export default PaymentModal;